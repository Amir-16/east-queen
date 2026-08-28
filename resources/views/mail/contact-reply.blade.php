<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ $replySubject }}</title>
    <!--[if mso]>
    <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscope></noscript>
    <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#EEF2EE;font-family:'Segoe UI',Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#EEF2EE;padding:40px 16px;">
    <tr>
        <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

                {{-- ══ LOGO BAR ══ --}}
                <tr>
                    <td align="center" style="background-color:#ffffff;border-radius:16px 16px 0 0;padding:24px 36px 16px;border-bottom:1px solid #E5E7EB;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                            <tr>
                                <td style="background-color:#1A3D1A;border-radius:10px;padding:9px 14px;vertical-align:middle;">
                                    <span style="color:#ffffff;font-size:14px;font-weight:900;font-family:Arial,sans-serif;letter-spacing:0.5px;line-height:1;display:block;">SFF</span>
                                </td>
                                <td style="padding-left:12px;vertical-align:middle;">
                                    <div style="color:#1A3D1A;font-size:15px;font-weight:900;font-family:Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;line-height:1.1;margin-bottom:3px;">SFF Agro</div>
                                    <div style="color:#4A8C2A;font-size:9px;font-weight:700;font-family:Arial,sans-serif;letter-spacing:2.5px;text-transform:uppercase;">Agricultural Excellence</div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                {{-- ══ HERO HEADER ══ --}}
                <tr>
                    <td style="background:linear-gradient(135deg,#1A3D1A 0%,#2C6B2C 100%);padding:36px 40px 32px;text-align:center;">
                        <div style="display:inline-block;background-color:rgba(74,140,42,0.20);border:1px solid rgba(74,140,42,0.50);border-radius:999px;padding:5px 18px;margin-bottom:18px;">
                            <span style="color:#8CCC5C;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Personal Reply</span>
                        </div>
                        <h1 style="margin:0 0 10px;color:#ffffff;font-size:26px;font-weight:300;letter-spacing:0.5px;line-height:1.3;">
                            Hello, <strong style="font-weight:700;">{{ $contact->name }}</strong>
                        </h1>
                        <p style="margin:0;color:rgba(255,255,255,0.65);font-size:13px;letter-spacing:0.3px;">
                            A member of our team has replied to your enquiry
                        </p>
                        <div style="width:48px;height:3px;background-color:#4A8C2A;margin:22px auto 0;border-radius:2px;"></div>
                    </td>
                </tr>

                {{-- ══ BODY ══ --}}
                <tr>
                    <td style="background-color:#ffffff;padding:40px 40px 36px;border-left:1px solid #E5E7EB;border-right:1px solid #E5E7EB;">

                        {{-- Reply body --}}
                        <div style="color:#1F2937;font-size:15px;line-height:1.9;white-space:pre-line;margin-bottom:36px;">{{ $replyBody }}</div>

                        {{-- Signature block --}}
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
                            <tr>
                                <td style="padding:18px 22px;background-color:#F4F8F2;border-left:4px solid #4A8C2A;border-radius:0 8px 8px 0;">
                                    <p style="margin:0 0 3px;color:#1A3D1A;font-size:14px;font-weight:700;">SFF Agro</p>
                                    <p style="margin:0 0 3px;color:#4B6B4B;font-size:12px;">info@sffagro.com</p>
                                    <p style="margin:0;color:#4B6B4B;font-size:12px;"><a href="{{ config('app.url') }}" style="color:#4A8C2A;text-decoration:none;">{{ config('app.url') }}</a></p>
                                </td>
                            </tr>
                        </table>

                        {{-- Divider --}}
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                            <tr>
                                <td style="border-top:1px solid #E5E7EB;font-size:0;line-height:0;">&nbsp;</td>
                            </tr>
                        </table>

                        {{-- Original inquiry reference --}}
                        <p style="margin:0 0 14px;color:#6B7280;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Your Original Enquiry</p>

                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E5E7EB;border-radius:10px;overflow:hidden;margin-bottom:32px;">
                            <tr>
                                <td colspan="2" style="background-color:#1A3D1A;padding:12px 18px;">
                                    <span style="color:#8CCC5C;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Reference Details</span>
                                </td>
                            </tr>
                            @if($contact->service)
                            <tr>
                                <td style="padding:11px 18px;color:#6B7280;font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;background-color:#FAFAFA;border-bottom:1px solid #E5E7EB;width:130px;vertical-align:top;">Service</td>
                                <td style="padding:11px 18px;border-bottom:1px solid #E5E7EB;">
                                    <span style="display:inline-block;background-color:#F0FBF0;color:#1A6B1A;font-size:12px;font-weight:600;padding:3px 12px;border-radius:999px;border:1px solid #B8DEBF;">{{ $contact->service }}</span>
                                </td>
                            </tr>
                            @endif
                            <tr>
                                <td style="padding:11px 18px;color:#6B7280;font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;background-color:#FAFAFA;border-bottom:1px solid #E5E7EB;vertical-align:top;">Submitted</td>
                                <td style="padding:11px 18px;color:#374151;font-size:13px;border-bottom:1px solid #E5E7EB;">{{ $contact->created_at?->format('d M Y \a\t H:i') ?? '-' }}</td>
                            </tr>
                            <tr>
                                <td style="padding:13px 18px;color:#6B7280;font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;background-color:#FAFAFA;vertical-align:top;">Message</td>
                                <td style="padding:13px 18px;color:#374151;font-size:13px;line-height:1.7;">{{ $contact->message }}</td>
                            </tr>
                        </table>

                        {{-- Further help --}}
                        <p style="margin:0 0 14px;color:#6B7280;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Need Further Help?</p>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td>
                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="background-color:#F4F8F2;border-radius:8px;padding:10px 16px;">
                                                <a href="mailto:info@sffagro.com" style="color:#1A3D1A;font-size:13px;text-decoration:none;font-weight:600;white-space:nowrap;">
                                                    <span style="color:#4A8C2A;margin-right:8px;">&#9993;</span> info@sffagro.com
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>

                {{-- ══ FOOTER ══ --}}
                <tr>
                    <td style="background-color:#1A3D1A;border-radius:0 0 16px 16px;padding:28px 36px;text-align:center;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 14px;">
                            <tr>
                                <td style="border:1px solid #4A8C2A;border-radius:10px;padding:7px 12px;text-align:center;">
                                    <span style="color:#8CCC5C;font-size:14px;font-weight:900;font-family:Arial,sans-serif;letter-spacing:0.5px;line-height:1;display:block;">SFF</span>
                                </td>
                            </tr>
                        </table>
                        <p style="margin:0 0 4px;color:#8CCC5C;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">SFF Agro</p>
                        <p style="margin:0 0 14px;color:#6B8F6B;font-size:11px;">info@sffagro.com</p>
                        <p style="margin:0;color:#3D5C3D;font-size:10px;line-height:1.7;">
                            This email was sent in response to your enquiry.<br>
                            You may reply directly to this email and we will get back to you.
                        </p>
                    </td>
                </tr>

                {{-- Bottom spacer --}}
                <tr>
                    <td style="padding-top:20px;text-align:center;">
                        <p style="margin:0;color:#9CA3AF;font-size:10px;">
                            &copy; {{ date('Y') }} SFF Agro. All rights reserved.
                        </p>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>

</body>
</html>
