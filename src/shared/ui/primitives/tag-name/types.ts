import type { AllHTMLAttributes, Ref } from 'react';

export interface IProps extends AllHTMLAttributes<any> {
  ref?: Ref<HTMLElement>;
  tagName: keyof HTMLElementTagNameMap;
}
