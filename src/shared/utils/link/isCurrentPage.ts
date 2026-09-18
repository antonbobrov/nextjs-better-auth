export function isCurrentPage(href: string, pathname: string) {
  if (pathname === href) {
    return true;
  }

  const hrefSlugs = href.split('/').filter(Boolean);
  const pathnameSlugs = pathname.split('/').filter(Boolean);

  return hrefSlugs.every((s, i) => pathnameSlugs[i] === s);
}
