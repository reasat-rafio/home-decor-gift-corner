import React from "react";
import { LayoutProps } from "../../../../libs/types/commonTypes";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../nav/Navbar";
import { CartSideMenu } from "../SideMenus/CartSideMenu";
import { NavSideBars } from "../SideMenus/SidebarNav";
import { SmSearchPage } from "../SideMenus/SmSearchPage";

export const Layout: React.FC<LayoutProps> = ({
  footer,
  logo,
  menu,
  children,
  copyright,
  sideMenuInfo,
}) => {
  return (
    <div>
      <Navbar logo={logo} menu={menu} />
      <NavSideBars sideMenuInfo={sideMenuInfo} menu={menu} />
      <CartSideMenu />
      <SmSearchPage />
      {children}
      <Footer {...footer} logo={logo} copyright={copyright} />
    </div>
  );
};
