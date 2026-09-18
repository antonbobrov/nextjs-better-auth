import type { FC } from 'react';

import { getLocale } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { AdminUser } from '@/views/(admin)/users/user';

interface IProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: IProps) {
  const locale = await getLocale();
  const { id } = await params;

  return {
    alternates: getAlternates(locale, ROUTES.admin.user(id)),
  };
}

const Page: FC<IProps> = async ({ params }) => {
  const { id } = await params;

  return <AdminUser id={id} />;
};

export default Page;
