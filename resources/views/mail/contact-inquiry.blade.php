<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Inquiry — {{ $contact->name }}</title>
</head>
<body style="margin:0;padding:0;background-color:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F4F6;padding:32px 16px;">
    <tr>
        <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

                {{-- Header --}}
                <tr>
                    <td style="background-color:#1B5E20;border-radius:12px 12px 0 0;padding:24px 36px;text-align:center;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 10px;">
                            <tr>
                                <td style="background-color:#E21F2F;border-radius:8px;padding:6px 14px;text-align:center;vertical-align:middle;">
                                    <span style="color:#ffffff;font-size:16px;font-weight:900;font-family:'Arial Black',Arial,sans-serif;line-height:1;display:block;">Q</span>
                                </td>
                                <td style="padding-left:10px;text-align:left;vertical-align:middle;">
                                    <span style="color:#A5D6A7;font-size:13px;font-weight:700;font-family:Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;">EAST QUEEN GROUP</span>
                                </td>
                            </tr>
                        </table>
                        <div style="color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:1px;text-transform:uppercase;">Admin Notification</div>
                    </td>
                </tr>

                {{-- Alert Banner --}}
                <tr>
                    <td style="background-color:#E21F2F;padding:14px 36px;text-align:center;">
                        <span style="color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
                            &#128276; New Website Inquiry
                        </span>
                    </td>
                </tr>

                {{-- Body --}}
                <tr>
                    <td style="background-color:#ffffff;padding:36px 36px 24px;border-left:1px solid #E5E7EB;border-right:1px solid #E5E7EB;">

                        <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
                            A new inquiry has been submitted through the website. Details are below.
                        </p>

                        {{-- Details Table --}}
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;margin-bottom:28px;">
                            <tr style="background-color:#F9FAFB;">
                                <td style="padding:10px 16px;color:#6B7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;width:130px;border-bottom:1px solid #E5E7EB;">Name</td>
                                <td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #E5E7EB;">{{ $contact->name }}</td>
                            </tr>
                            <tr>
                                <td style="padding:10px 16px;color:#6B7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #E5E7EB;background-color:#F9FAFB;">Email</td>
                                <td style="padding:10px 16px;border-bottom:1px solid #E5E7EB;">
                                    <a href="mailto:{{ $contact->email }}" style="color:#1B5E20;font-size:14px;text-decoration:none;">{{ $contact->email }}</a>
                                </td>
                            </tr>
                            @if($contact->phone)
                            <tr style="background-color:#F9FAFB;">
                                <td style="padding:10px 16px;color:#6B7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #E5E7EB;">Phone</td>
                                <td style="padding:10px 16px;border-bottom:1px solid #E5E7EB;">
                                    <a href="tel:{{ $contact->phone }}" style="color:#1B5E20;font-size:14px;text-decoration:none;">{{ $contact->phone }}</a>
                                </td>
                            </tr>
                            @endif
                            @if($contact->service)
                            <tr>
                                <td style="padding:10px 16px;color:#6B7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #E5E7EB;background-color:#F9FAFB;">Subject</td>
                                <td style="padding:10px 16px;border-bottom:1px solid #E5E7EB;">
                                    <span style="display:inline-block;background-color:#FEF2F2;color:#991B1B;font-size:12px;font-weight:600;padding:3px 10px;border-radius:999px;border:1px solid #FECACA;">{{ $contact->service }}</span>
                                </td>
                            </tr>
                            @endif
                            <tr style="background-color:#F9FAFB;">
                                <td style="padding:10px 16px;color:#6B7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;">Received</td>
                                <td style="padding:10px 16px;color:#6B7280;font-size:13px;">{{ $contact->created_at->format('d M Y, g:i A') }} (UTC)</td>
                            </tr>
                        </table>

                        {{-- Message --}}
                        <div style="margin-bottom:28px;">
                            <div style="color:#6B7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:10px;">Message</div>
                            <div style="background-color:#F9FAFB;border-left:3px solid #E21F2F;border-radius:0 6px 6px 0;padding:16px 20px;color:#374151;font-size:14px;line-height:1.75;white-space:pre-wrap;border:1px solid #E5E7EB;border-left-color:#E21F2F;">{{ $contact->message }}</div>
                        </div>

                        {{-- CTA --}}
                        <div style="text-align:center;margin-bottom:8px;">
                            <a href="{{ url('/admin/contacts/' . $contact->id) }}"
                               style="display:inline-block;background-color:#1B5E20;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.5px;text-decoration:none;padding:12px 32px;border-radius:8px;">
                                View in Admin Inbox &rarr;
                            </a>
                        </div>

                    </td>
                </tr>

                {{-- Footer --}}
                <tr>
                    <td style="background-color:#F9FAFB;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;text-align:center;">
                        <p style="margin:0 0 4px;color:#6B7280;font-size:12px;font-weight:600;">East Queen Group</p>
                        <p style="margin:0;color:#9CA3AF;font-size:11px;">admin@eastqueengroup.com</p>
                        <p style="margin:8px 0 0;color:#D1D5DB;font-size:10px;">This is an automated admin notification. Do not reply directly to this email.</p>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>

</body>
</html>
