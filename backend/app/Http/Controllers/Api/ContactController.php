<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactFormMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    private const SUBJECT_LABELS = [
        'business'   => 'Business Partnership',
        'individual' => 'Individual Purchase',
        'general'    => 'General Inquiry',
    ];

    public function send(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:50'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $subjectLabel = self::SUBJECT_LABELS[$validated['subject']] ?? $validated['subject'];

        $recipient = config('mail.contact_to');

        if (! $recipient) {
            return response()->json(['message' => 'Contact recipient is not configured.'], 500);
        }

        Mail::to($recipient)->send(new ContactFormMail(
            $validated['name'],
            $validated['email'],
            $subjectLabel,
            $validated['message'],
        ));

        return response()->json(['message' => 'Message sent successfully.']);
    }
}
