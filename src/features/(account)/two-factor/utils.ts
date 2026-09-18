export function getTotpSecret(totpURI: string) {
  const query = totpURI.split('?')[1];

  if (!query) {
    return '';
  }

  return new URLSearchParams(query).get('secret') ?? '';
}
