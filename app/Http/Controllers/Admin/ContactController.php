<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\ContactReplyMail;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ContactController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $status  = $request->query('status',  'all');
        $service = $request->query('service', 'all');
        $search  = trim($request->query('search', ''));
        $perPage = in_array((int) $request->query('per_page', 15), [10, 25, 50])
            ? (int) $request->query('per_page', 15)
            : 15;

        $query = Contact::orderByDesc('created_at');

        if ($status !== 'all') {
            $query->where('status', $status);
        }

        if ($service !== 'all') {
            $query->where('service', $service);
        }

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name',  'like', "%{$search}%")
                  ->orWhere('email',   'like', "%{$search}%")
                  ->orWhere('service', 'like', "%{$search}%");
            });
        }

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $query
                ->paginate($perPage, ['id', 'name', 'email', 'phone', 'service', 'status', 'created_at'])
                ->withQueryString(),
            'counts'   => [
                'all'     => Contact::count(),
                'new'     => Contact::where('status', 'new')->count(),
                'read'    => Contact::where('status', 'read')->count(),
                'replied' => Contact::where('status', 'replied')->count(),
            ],
            'services' => Contact::whereNotNull('service')
                ->distinct()
                ->orderBy('service')
                ->pluck('service'),
            'filters' => [
                'status'   => $status,
                'service'  => $service,
                'search'   => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function show($contact): InertiaResponse
    {
        $model = Contact::findOrFail($contact);

        // Auto-mark new → read on open
        if ($model->status === 'new') {
            $model->markRead();
            $this->clearUnreadCache();
        }

        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $model,
        ]);
    }

    public function updateStatus(Request $request, $contact): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:new,read,replied',
        ]);

        $model = Contact::findOrFail($contact);
        $model->update(['status' => $request->status]);

        $this->clearUnreadCache();

        return back()->with('flash.success', 'Status updated.');
    }

    public function updateNotes(Request $request, $contact): RedirectResponse
    {
        $request->validate([
            'admin_notes' => 'nullable|string|max:2000',
        ]);

        Contact::findOrFail($contact)->update([
            'admin_notes' => $request->admin_notes,
        ]);

        return back()->with('flash.success', 'Notes saved.');
    }

    public function sendReply(Request $request, $contact): RedirectResponse
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'body'    => 'required|string|max:5000',
        ]);

        $model = Contact::findOrFail($contact);

        Mail::to($model->email, $model->name)
            ->send(new ContactReplyMail($model, $request->subject, $request->body));

        $model->update(['status' => 'replied']);
        $this->clearUnreadCache();

        return back()->with('flash.success', "Reply sent to {$model->name} ({$model->email}).");
    }

    public function bulkUpdateStatus(Request $request): RedirectResponse
    {
        $request->validate([
            'ids'    => 'required|array',
            'ids.*'  => 'integer',
            'status' => 'required|in:read,replied',
        ]);

        Contact::whereIn('id', $request->ids)->update(['status' => $request->status]);

        $this->clearUnreadCache();

        $label = $request->status === 'replied' ? 'Marked as replied' : 'Marked as read';

        $count = $request->ids ? count($request->ids) : 0;
        return back()->with('flash.success', "{$label} ({$count} contacts).");
    }

    public function export(Request $request): StreamedResponse
    {
        $status  = $request->query('status',  'all');
        $service = $request->query('service', 'all');

        $query = Contact::orderByDesc('created_at');
        if ($status !== 'all')  { $query->where('status',  $status); }
        if ($service !== 'all') { $query->where('service', $service); }

        $contacts = $query->get();
        $filename = 'contacts-' . now()->format('Y-m-d') . '.csv';

        return response()->streamDownload(function () use ($contacts) {
            $handle = fopen('php://output', 'w');

            fputcsv($handle, ['ID', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Submitted At']);

            foreach ($contacts as $c) {
                fputcsv($handle, [
                    $c->id,
                    $c->name,
                    $c->email,
                    $c->phone ?? '',
                    $c->service ?? '',
                    $c->message,
                    $c->status,
                    $c->created_at->format('Y-m-d H:i'),
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
        ]);
    }

    private function clearUnreadCache(): void
    {
        cache()->forget('contacts.unread');
    }
}
