<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Inquiry — {{ $contact->name }}</title>
</head>
<body style="margin:0;padding:0;background-color:#EEF2EE;font-family:'Segoe UI',Arial,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EEF2EE;padding:32px 16px;">
    <tr>
        <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

                {{-- Header --}}
                <tr>
                    <td style="background-color:#1A3D1A;border-radius:12px 12px 0 0;padding:24px 36px;text-align:center;">
                        <div style="color:#8CCC5C;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:3px;">SFF Agro</div>
                        <div style="color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:1px;text-transform:uppercase;">Admin Notification</div>
                    </td>
                </tr>

                {{-- Alert Banner --}}
                <tr>
                    <td style="background-color:#4A8C2A;padding:14px 36px;text-align:center;">
                        <span style="color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
                            &#128276; New Website Inquiry
                        </span>
                    </td>
                </tr>

                {{-- Body --}}
                <tr>
                    <td style="background-color:#ffffff;padding:36px 36px 24px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">

                        <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
                            A new inquiry has been submitted through the website. Details are below.
                        </p>

                        {{-- Details Table --}}
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:28px;">
                            <tr style="background-color:#f9fafb;">
                                <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;width:130px;border-bottom:1px solid #e5e7eb;">Name</td>
                                <td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">{{ $contact->name }}</td>
                            </tr>
                            <tr>
                                <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #e5e7eb;background-color:#f9fafb;">Email</td>
                                <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;">
                                    <a href="mailto:{{ $contact->email }}" style="color:#1A3D1A;font-size:14px;text-decoration:none;">{{ $contact->email }}</a>
                                </td>
                            </tr>
                            @if($contact->phone)
                            <tr style="background-color:#f9fafb;">
                                <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #e5e7eb;">Phone</td>
                                <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;">
                                    <a href="tel:{{ $contact->phone }}" style="color:#1A3D1A;font-size:14px;text-decoration:none;">{{ $contact->phone }}</a>
                                </td>
                            </tr>
                            @endif
                            @if($contact->service)
                            <tr>
                                <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #e5e7eb;background-color:#f9fafb;">Service</td>
                                <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;">
                                    <span style="display:inline-block;background-color:#1A3D1A;color:#8CCC5C;font-size:12px;font-weight:600;padding:3px 10px;border-radius:999px;">{{ $contact->service }}</span>
                                </td>
                            </tr>
                            @endif
                            <tr style="background-color:#f9fafb;">
                                <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;">Received</td>
                                <td style="padding:10px 16px;color:#6b7280;font-size:13px;">{{ $contact->created_at->format('d M Y, g:i A') }} (UTC)</td>
                            </tr>
                        </table>

                        {{-- Message --}}
                        <div style="margin-bottom:28px;">
                            <div style="color:#6b7280;font-size:12px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:10px;">Message</div>
                            <div style="background-color:#F4F8F2;border-left:3px solid #4A8C2A;border-radius:0 6px 6px 0;padding:16px 20px;color:#374151;font-size:14px;line-height:1.75;white-space:pre-wrap;">{{ $contact->message }}</div>
                        </div>

                        {{-- CTA --}}
                        <div style="text-align:center;margin-bottom:8px;">
                            <a href="{{ url('/admin/contacts/' . $contact->id) }}"
                               style="display:inline-block;background-color:#1A3D1A;color:#8CCC5C;font-size:13px;font-weight:700;letter-spacing:0.5px;text-decoration:none;padding:12px 32px;border-radius:8px;">
                                View in Admin Inbox &rarr;
                            </a>
                        </div>

                    </td>
                </tr>

                {{-- Footer --}}
                <tr>
                    <td style="background-color:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;text-align:center;">
                        <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;font-weight:600;">SFF Agro</p>
                        <p style="margin:0;color:#9ca3af;font-size:11px;">info@sffagro.com</p>
                        <p style="margin:8px 0 0;color:#d1d5db;font-size:10px;">This is an automated admin notification. Do not reply directly to this email.</p>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>

</body>
</html>
