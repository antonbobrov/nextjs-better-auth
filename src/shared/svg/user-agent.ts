import {
  Display,
  Globe,
  LogoAndroid,
  LogoApple,
  LogoDebian,
  LogoLinux,
  LogoMacos,
  LogoUbuntu,
  LogoWindows,
  LogoYandex,
} from '@gravity-ui/icons';

import type { TSvgIcon } from '@/types/Icon';

import { Chrome } from './chrome';
import { Edge } from './edge';
import { Firefox } from './firefox';
import { Opera } from './opera';
import { Safari } from './safari';

export const BROWSER_ICONS: Record<string, TSvgIcon> = {
  brave: Chrome,
  chrome: Chrome,
  chromium: Chrome,
  edge: Edge,
  firefox: Firefox,
  'mobile chrome': Chrome,
  'mobile firefox': Firefox,
  'mobile safari': Safari,
  opera: Opera,
  safari: Safari,
  samsung: Chrome,
  unknown: Globe,
  vivaldi: Chrome,
  yandex: LogoYandex,
};

export const OS_ICONS: Record<string, TSvgIcon> = {
  android: LogoAndroid,
  'chrome os': Chrome,
  debian: LogoDebian,
  ios: LogoApple,
  ipados: LogoApple,
  linux: LogoLinux,
  'mac os': LogoMacos,
  macos: LogoMacos,
  ubuntu: LogoUbuntu,
  unknown: Display,
  windows: LogoWindows,
};
