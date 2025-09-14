import * as fs from 'fs';

export function resolveCredentialsJson(): string {
  // Try SERVICE_ACCOUNT_JSON (raw JSON string, may be multiline)
  if (process.env.SERVICE_ACCOUNT_JSON) {
    return process.env.SERVICE_ACCOUNT_JSON;
  }
  // Try SERVICE_ACCOUNT_BASE64
  if (process.env.SERVICE_ACCOUNT_BASE64) {
    const buff = Buffer.from(process.env.SERVICE_ACCOUNT_BASE64, 'base64');
    return buff.toString('utf8');
  }
  // Try SERVICE_ACCOUNT_PATH
  if (process.env.SERVICE_ACCOUNT_PATH) {
    const p = process.env.SERVICE_ACCOUNT_PATH;
    if (!fs.existsSync(p)) {
      throw new Error(`Service account file not found at path: ${p}`);
    }
    return fs.readFileSync(p, 'utf8');
  }
  // Try GOOGLE_APPLICATION_CREDENTIALS (standard variable)
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const p = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!fs.existsSync(p)) {
      throw new Error(`Service account file not found at GOOGLE_APPLICATION_CREDENTIALS: ${p}`);
    }
    return fs.readFileSync(p, 'utf8');
  }
  throw new Error('No credentials provided. Set one of SERVICE_ACCOUNT_JSON, SERVICE_ACCOUNT_BASE64, SERVICE_ACCOUNT_PATH, or GOOGLE_APPLICATION_CREDENTIALS.');
}
