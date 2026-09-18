export const SESSION = {
  expiresIn: 60 * 60 * 24 * 7,
  updateAge: 60 * 15,
};

export const RATE_LIMIT = {
  max: 100,
  window: 10,
};

export const SIGN_UP = {
  autoSignIn: true,
  enabled: true,
  requireVerification: true,
  resendVerification: true,
};

export const EMAIL_VERIFICATION = {
  autoSignIn: false,
  expiresIn: 60 * 60,
};

export const RESET_PASSWORD = {
  expiresIn: 60 * 60,
};

export const TWO_FACTOR = {
  digits: 6 as 6 | 8,
  enabled: true,
};

export const SELF_SUSPEND = {
  confirmIdentifierPrefix: 'self-unsuspend-confirm:',
  expiresIn: 60 * 60,
  identifierPrefix: 'self-unsuspend:',
};
