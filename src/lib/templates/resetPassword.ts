export function resetPasswordEmailTemplate(link: string) {
  // Brand colors from styles/colors/colors.js
  const orange = '#fd4000' // orange.4
  const blue = '#1f75bb' // blue.1
  const gray = '#6c757d' // gray.4
  return `
    <div style="font-family: Arial, sans-serif; background: #fbfbfb; padding: 24px; color: ${gray};">
      <h2 style="color: ${orange};">Password Reset Request</h2>
      <p>We received a request to reset your password. Click the button below to set a new password:</p>
      <a href="${link}"
         style="display:inline-block;padding:12px 28px;background:${blue};color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;font-size:16px;margin:20px 0;">
        Reset Password
      </a>
      <p style="margin-top:32px; color:${gray}; font-size:13px;">If you did not request this, you can ignore this email.</p>
    </div>
  `
}
