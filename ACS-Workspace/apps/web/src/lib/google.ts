import { google } from 'googleapis';

export function getGoogleAuth() {
  const jwt = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL!,
    key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    subject: process.env.GOOGLE_IMPERSONATE_SUBJECT || undefined,
  });
  return jwt;
}

export function sheetsClient() {
  const auth = getGoogleAuth();
  return google.sheets({ version: 'v4', auth });
}
