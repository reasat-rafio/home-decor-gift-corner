export interface LayoutProps {
  footer: FooterProps;
  menu: Menu[];
  logo: Image;
  copyright: string;
  sideMenuInfo: SideMenuInfo;
}

export interface FooterProps {
  _type: string;
  description: any;
  nav: Nav[];
  socials: Social[];
  logo?: Image;
  copyright?: string;
}

interface Menu {
  _key: string;
  _type: string;
  href: string;
  title: string;
}
