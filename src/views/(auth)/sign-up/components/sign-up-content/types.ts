export interface IProps {
  email?: string;
  onEmailChange?: (email: string) => void;
  onSuccess: (email: string) => void;
}
