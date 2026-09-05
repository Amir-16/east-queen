<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Mail\ContactAutoReplyMail;
use App\Mail\ContactInquiryMail;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Contact');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'    => ['required', 'string', 'max:100'],
            'company' => ['nullable', 'string', 'max:100'],
            'email'   => ['required', 'email', 'max:150'],
            'phone'   => ['nullable', 'string', 'max:30'],
            'subject' => ['required', 'string', 'max:100'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        // Build message — prepend company if provided
        $body = $validated['company']
            ? "Company: {$validated['company']}\n\n{$validated['message']}"
            : $validated['message'];

        $contact = Contact::create([
            'name'       => $validated['name'],
            'email'      => $validated['email'],
            'phone'      => $validated['phone'] ?? null,
            'service'    => $validated['subject'],
            'message'    => $body,
            'ip_address' => $request->ip(),
            'status'     => 'new',
        ]);

        // Bust the unread badge cache
        cache()->forget('contacts.unread');

        // Notify admin
        Mail::to(config('mail.admin_to'))
            ->send(new ContactInquiryMail($contact));

        // Auto-reply to sender
        Mail::to($contact->email, $contact->name)
            ->send(new ContactAutoReplyMail($contact));

        return back()->with('success', 'Your message has been sent. We will get back to you within one business day.');
    }
}
