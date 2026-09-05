<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>We Received Your Enquiry — East Queen Group</title>
</head>
<body style="margin:0;padding:0;background-color:#F3F4F6;font-family:'Segoe UI',Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F3F4F6;padding:40px 16px;">
    <tr>
        <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

                {{-- ══ LOGO BAR ══ --}}
                <tr>
                    <td align="center" style="background-color:#ffffff;border-radius:16px 16px 0 0;padding:24px 36px 16px;border-bottom:1px solid #E5E7EB;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                            <tr>
                                <td style="background-color:#1B5E20;border-radius:10px;padding:9px 16px;vertical-align:middle;text-align:center;">
                                    <span style="color:#E21F2F;font-size:18px;font-weight:900;font-family:'Arial Black',Arial,sans-serif;letter-spacing:0.5px;line-height:1;display:block;">Q</span>
                                </td>
                                <td style="padding-left:12px;vertical-align:middle;">
                                    <div style="color:#1B5E20;font-size:16px;font-weight:900;font-family:'Arial Black',Arial,sans-serif;letter-spacing:0.5px;text-transform:uppercase;line-height:1.1;margin-bottom:3px;">EAST QUEEN</div>
                                    <div style="color:#6B7280;font-size:9px;font-weight:700;font-family:Arial,sans-serif;letter-spacing:2.5px;text-transform:uppercase;">GROUP</div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                {{-- ══ HERO HEADER ══ --}}
                <tr>
                    <td style="background:linear-gradient(135deg,#1B5E20 0%,#2E7D32 100%);padding:36px 40px 32px;text-align:center;">
                        <div style="display:inline-block;background-color:rgba(226,31,47,0.15);border:1px solid rgba(226,31,47,0.40);border-radius:999px;padding:5px 18px;margin-bottom:18px;">
                            <span style="color:#FFCDD2;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">&#10003;&nbsp; Enquiry Received</span>
                        </div>
                        <h1 style="margin:0 0 10px;color:#ffffff;font-size:26px;font-weight:300;letter-spacing:0.5px;line-height:1.3;">
                            Thank you, <strong style="font-weight:700;">{{ $contact->name }}!</strong>
                        </h1>
                        <p style="margin:0;color:rgba(255,255,255,0.65);font-size:13px;letter-spacing:0.3px;">
                            We've received your enquiry and will be in touch shortly.
                        </p>
                        <div style="width:48px;height:3px;background-color:#E21F2F;margin:22px auto 0;border-radius:2px;"></div>
                    </td>
                </tr>

                {{-- ══ BODY ══ --}}
                <tr>
                    <td style="background-color:#ffffff;padding:40px 40px 36px;border-left:1px solid #E5E7EB;border-right:1px solid #E5E7EB;">

                        <p style="margin:0 0 18px;color:#1F2937;font-size:15px;line-height:1.85;">
                            We have received your enquiry and our team will review it shortly. You can expect a response <strong>within one business day</strong>.
                        </p>
                        <p style="margin:0 0 32px;color:#4B5563;font-size:14px;line-height:1.8;">
                            For reference, here is a summary of what you submitted:
                        </p>

                        {{-- Summary card --}}
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E5E7EB;border-radius:10px;overflow:hidden;margin-bottom:36px;">
                            <tr>
                                <td colspan="2" style="background-color:#1B5E20;padding:12px 18px;">
                                    <span style="color:#A5D6A7;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Your Submission Summary</span>
                                </td>
                            </tr>
                            @if($contact->service)
                            <tr>
                                <td style="padding:11px 18px;color:#6B7280;font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;background-color:#FAFAFA;border-bottom:1px solid #E5E7EB;width:130px;vertical-align:top;">Subject</td>
                                <td style="padding:11px 18px;border-bottom:1px solid #E5E7EB;">
                                    <span style="display:inline-block;background-color:#FEF2F2;color:#991B1B;font-size:12px;font-weight:600;padding:3px 12px;border-radius:999px;border:1px solid #FECACA;">{{ $contact->service }}</span>
                                </td>
                            </tr>
                            @endif
                            <tr>
                                <td style="padding:11px 18px;color:#6B7280;font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;background-color:#FAFAFA;border-bottom:1px solid #E5E7EB;">Email</td>
                                <td style="padding:11px 18px;color:#374151;font-size:13px;border-bottom:1px solid #E5E7EB;">{{ $contact->email }}</td>
                            </tr>
                            @if($contact->phone)
                            <tr>
                                <td style="padding:11px 18px;color:#6B7280;font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;background-color:#FAFAFA;border-bottom:1px solid #E5E7EB;">Phone</td>
                                <td style="padding:11px 18px;color:#374151;font-size:13px;border-bottom:1px solid #E5E7EB;">{{ $contact->phone }}</td>
                            </tr>
                            @endif
                            <tr>
                                <td style="padding:13px 18px;color:#6B7280;font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;background-color:#FAFAFA;vertical-align:top;">Message</td>
                                <td style="padding:13px 18px;color:#374151;font-size:13px;line-height:1.7;white-space:pre-line;">{{ $contact->message }}</td>
                            </tr>
                        </table>

                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                            <tr><td style="border-top:1px solid #E5E7EB;font-size:0;line-height:0;">&nbsp;</td></tr>
                        </table>

                        <p style="margin:0 0 14px;color:#6B7280;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Need Immediate Assistance?</p>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="background-color:#F9FAFB;border-radius:8px;padding:10px 16px;border:1px solid #E5E7EB;">
                                    <a href="mailto:admin@eastqueengroup.com" style="color:#1B5E20;font-size:13px;text-decoration:none;font-weight:600;white-space:nowrap;">
                                        <span style="color:#E21F2F;margin-right:8px;">&#9993;</span> admin@eastqueengroup.com
                                    </a>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>

                {{-- ══ FOOTER ══ --}}
                <tr>
                    <td style="background-color:#1B5E20;border-radius:0 0 16px 16px;padding:28px 36px;text-align:center;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 14px;">
                            <tr>
                                <td style="background-color:#E21F2F;border-radius:8px;padding:6px 14px;text-align:center;">
                                    <span style="color:#ffffff;font-size:15px;font-weight:900;font-family:'Arial Black',Arial,sans-serif;line-height:1;display:block;">Q</span>
                                </td>
                                <td style="padding-left:10px;text-align:left;vertical-align:middle;">
                                    <span style="color:#A5D6A7;font-size:12px;font-weight:700;font-family:Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;">EAST QUEEN GROUP</span>
                                </td>
                            </tr>
                        </table>
                        <p style="margin:0 0 14px;color:#81C784;font-size:11px;">admin@eastqueengroup.com</p>
                        <p style="margin:0;color:#4CAF50;font-size:10px;line-height:1.7;opacity:0.7;">
                            This is an automated confirmation. Please do not reply to this email.<br>
                            To contact us directly, email us at admin@eastqueengroup.com.
                        </p>
                    </td>
                </tr>

                <tr>
                    <td style="padding-top:20px;text-align:center;">
                        <p style="margin:0;color:#9CA3AF;font-size:10px;">
                            &copy; {{ date('Y') }} East Queen Group. All rights reserved.
                        </p>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>

</body>
</html>
