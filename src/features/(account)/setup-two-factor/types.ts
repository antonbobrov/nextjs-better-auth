export interface IProps {
  onCancel: () => void;
}

export type TTwoFactorSetup = {
  backupCodes: string[];
  totpURI: string;
};
