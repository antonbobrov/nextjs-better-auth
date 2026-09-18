export interface IProps {
  email?: string;
  onEmailChange?: (email: string) => void;
  onRequireTwoFactor: () => void;
  onSelfUnsuspend: (email: string) => void;
  onSuccess: () => void;
  onVerifyEmail: () => void;
}
