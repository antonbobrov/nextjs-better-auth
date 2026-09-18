import 'csstype';

declare module '*.css';
declare module '*.scss';

declare module 'csstype' {
  interface Properties {
    [index: `--${string}`]: any;
  }
}
