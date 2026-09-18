import { redirect } from '@/i18n/redirect';
import { ROUTES } from '@/shared/config/routes';

const Page = async () => {
  await redirect(ROUTES.dashboard);
};

export default Page;
