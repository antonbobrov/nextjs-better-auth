import type { TTwoFactorSetup } from '../setup-two-factor/types';

export interface IProps {
  onEnabled: (setup: TTwoFactorSetup) => void;
}
