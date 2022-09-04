import { useContext } from 'react';
import { SiteType } from '../../../@types';
import { SiteListContext } from '../../../Top';

export const useSite: (siteId?: string | number) => SiteType | undefined = (
  siteId
) => {
  const sites = useContext(SiteListContext)[0];
  return siteId !== undefined
    ? sites.find((site) => site.id === siteId)
    : undefined;
};
