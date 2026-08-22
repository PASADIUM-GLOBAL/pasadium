import { createHash } from 'crypto';

export function verifyPKCE(verifier: string, challenge: string, method: string = 'S256'): boolean {
  if (method === 'plain') {
    return verifier === challenge;
  }

  if (method === 'S256') {
    const hash = createHash('sha256').update(verifier).digest();
    const base64Url = hash.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    return base64Url === challenge;
  }

  return false;
}
