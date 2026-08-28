<?php

namespace App\Mail;

use App\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly Contact $contact,
        public readonly string $replySubject,
        public readonly string $replyBody,
    ) {}

    public function envelope(): Envelope
    {
        $from = new Address(
            config('mail.from.address'),
            config('mail.from.name'),
        );

        return new Envelope(
            from:    $from,
            replyTo: [$from],
            to:      [new Address($this->contact->email, $this->contact->name)],
            subject: $this->replySubject,
        );
    }

    public function content(): Content
    {
        return new Content(view: 'mail.contact-reply');
    }
}
