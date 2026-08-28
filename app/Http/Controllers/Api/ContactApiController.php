<?php
namespace App\Http\Controllers\Api;

use App\Http\Requests\ContactFormRequest;
use App\Mail\ContactAutoReplyMail;
use App\Mail\ContactInquiryMail;
use App\Models\Contact;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;

class ContactApiController extends BaseApiController {
    public function store(ContactFormRequest $request): JsonResponse {
        $contact = Contact::create($request->validated());

        Cache::forget('contacts.unread');

        $toEmail = Setting::group('company')['email'] ?? config('mail.from.address');

        try {
            Mail::to($toEmail)->send(new ContactInquiryMail($contact));
            Mail::to($contact->email)->send(new ContactAutoReplyMail($contact));
        } catch (\Throwable) {}

        return response()->json(['message' => 'Inquiry received. We will get back to you shortly.'], 201);
    }
}
