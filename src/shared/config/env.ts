import { requireEnvDomain } from '@/env/requireEnvDomain';
import { requireEnvProtocol } from '@/env/requireEnvProtocol';

const DOMAIN = requireEnvDomain();

const PROTOCOL = requireEnvProtocol();

export const SITE_ORIGIN = `${PROTOCOL}://${DOMAIN}`;
