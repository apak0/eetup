import { appName } from '@/constants'
import { colors } from '@/styles/colors/colors'

export const registerUserEmailTemplate = ({ firstName, registrationToken }: { firstName: string; registrationToken: string }) => `
    <html>
    <body style="font-family: Arial, sans-serif; background-color: ${colors.gray[1]}; margin: 0; padding: 40px;">
      <div style="max-width: 600px; background-color: ${colors.white}; padding: 20px 40px; margin: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <h1 style="color: ${colors.gray[5]};">Welcome to ${appName}, ${firstName}!</h1>
        <p style="color: ${colors.gray[5]};">Thank you for using our app.</p>
        <p style="color: ${colors.gray[5]};">Click the below to verify your account at ${appName}: </p>
        <a href="${process.env.FRONTEND_LINK}/api/auth/activate-user?token=${registrationToken}" style="display: inline-block; padding: 12px 24px; margin-top: 10px; margin-bottom: 10px; background-color: ${colors.orange[3]}; color: ${colors.white}; text-decoration: none; border-radius: 5px;">Verify your e-mail</a>
        <p style="color: ${colors.gray[5]};">If you didn't  request this registration, you can safely ignore this email.</p>
        <div style="text-align: center; font-size: 12px; color: ${colors.gray[6]}; margin-top: 50px;">
          © ${new Date().getFullYear()} ${appName}. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `
