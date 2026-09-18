export interface IProps {
  autoFocus?: boolean;
  fullWidth?: boolean;
  label: string;
  name: string;
  onComplete?: (value: string) => void;
}
