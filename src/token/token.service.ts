import { Injectable } from '@nestjs/common';
import { GoogleAuth, OAuth2Client } from 'google-auth-library';
import { resolveCredentialsJson } from './credentials.util';

@Injectable()
export class TokenService {
  private scopes: string[];

  constructor() {
    const scopesEnv = process.env.GOOGLE_SCOPES || 'https://www.googleapis.com/auth/firebase.messaging';
    this.scopes = scopesEnv.split(',').map(s => s.trim()).filter(Boolean);
  }

  private parseCredentials() {
    const json = resolveCredentialsJson();
    try {
      return JSON.parse(json);
    } catch (e) {
      throw new Error('SERVICE_ACCOUNT_JSON is not valid JSON. If you used Base64, decode first or use SERVICE_ACCOUNT_BASE64.');
    }
  }

  private async getClient(): Promise<OAuth2Client> {
    const creds = this.parseCredentials();
    const auth = new GoogleAuth({
      credentials: creds,
      scopes: this.scopes,
    });
    return auth.getClient() as Promise<OAuth2Client>;
  }

  async getAccessToken(): Promise<{ token: string; expiresAt?: string }> {
    const client = await this.getClient();
    const accessToken = await client.getAccessToken();

    // google-auth-library doesn't always expose expires_in; we infer ~1 hour if missing.
    const DEFAULT_TTL_SECONDS = 3600;
    let expiresAt: string | undefined;

    // @ts-ignore - non-typed but present on some responses
    const res = (accessToken as any)?.res;
    // @ts-ignore
    const ttl = res?.data?.expires_in ?? DEFAULT_TTL_SECONDS;
    expiresAt = new Date(Date.now() + Number(ttl) * 1000).toISOString();

    if (!accessToken || !accessToken.token) {
      throw new Error('Failed to generate access token.');
    }

    return { token: accessToken.token as string, expiresAt };
  }
}
