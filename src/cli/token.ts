/* CLI: npx ts-node src/cli/token.ts  OR  npm run token */
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { TokenService } from '../token/token.service';

async function run() {
  const svc = new TokenService();
  try {
    const { token, expiresAt } = await svc.getAccessToken();
    console.log('✅ Access token generated successfully!');
    console.log('─'.repeat(80));
    console.log(`Token: ${token}`);
    console.log(`Expires At: ${expiresAt}`);
    console.log('─'.repeat(80));
    console.log('Use in Authorization header as: Bearer <token>');
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Error generating token:', err?.message || err);
    process.exit(1);
  }
}

run();
