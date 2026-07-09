<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: sans-serif; color: #1C1C1C;">
    <h2 style="margin-bottom: 4px;">New contact form submission</h2>
    <p style="color: #556260; margin-top: 0;">Plantsource Wholesale website</p>

    <table cellpadding="6" style="border-collapse: collapse; margin: 16px 0;">
        <tr>
            <td style="font-weight: bold;">Name</td>
            <td>{{ $senderName }}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Email</td>
            <td>{{ $senderEmail }}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Subject</td>
            <td>{{ $subjectLabel }}</td>
        </tr>
    </table>

    <p style="font-weight: bold; margin-bottom: 4px;">Message</p>
    <p style="white-space: pre-line; border-left: 3px solid #edc14d; padding-left: 12px;">{{ $body }}</p>
</body>
</html>
