/**
 * @package
 */
export type SiteType = {
  id: number | string;
  url: string;
  title: string;
  order: number;
};

/**
 * @package
 */
export type SitesType = SiteType[];
