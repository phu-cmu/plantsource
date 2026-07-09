<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $senderName,
        public string $senderEmail,
        public string $subjectLabel,
        public string $body,
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "[Contact Form] {$this->subjectLabel} — {$this->senderName}",
            replyTo: [$this->senderEmail],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-form',
            with: [
                'senderName'   => $this->senderName,
                'senderEmail'  => $this->senderEmail,
                'subjectLabel' => $this->subjectLabel,
                'body'         => $this->body,
            ],
        );
    }
}
