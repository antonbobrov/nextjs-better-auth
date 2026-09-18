function withEmail(path: string, email?: string) {
  if (!email) {
    return path;
  }

  return `${path}?email=${encodeURIComponent(email)}`;
}

export const ROUTES = {
  account: {
    danger: '/app/account/danger',
    details: '/app/account/details',
    edit: '/app/account/edit',
    password: '/app/account/password',
    root: '/app/account',
    sessions: '/app/account/sessions',
    twoFactor: '/app/account/two-factor',
  },
  admin: {
    user: (id: string) => `/app/admin/users/list/${id}`,
    users: {
      list: '/app/admin/users/list',
      new: '/app/admin/users/new',
      root: '/app/admin/users',
      stats: '/app/admin/users/stats',
    },
  },
  api: {
    sendEmail: '/api/email',
  },
  app: '/app',
  auth: {
    forgot: (email?: string) => withEmail('/auth/forgot-password', email),
    index: '/auth',
    reset: '/auth/reset-password',
    selfUnsuspend: (email?: string) => withEmail('/auth/self-unsuspend', email),
    sendVerifyEmail: (email?: string) =>
      withEmail('/auth/send-verify-email', email),
    signIn: (email?: string) => withEmail('/auth/sign-in', email),
    signUp: (email?: string) => withEmail('/auth/sign-up', email),
    twoFactor: '/auth/two-factor',
    verifyEmail: '/auth/verify-email',
  },
  dashboard: '/app/dashboard',
  home: '/',
};
