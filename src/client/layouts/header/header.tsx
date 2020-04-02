import { MenuRouteConfig } from 'common/routes/routes';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getOnePath } from 'common/helpers/get-one-path';

export interface HeaderProps {
  routes: MenuRouteConfig[];
}


export const Header: React.FC<HeaderProps> = function Header(props) {
  return (
    <header>
      <nav>
        {props.routes
          .filter(route => route.menu)
          .map(route => {
            const to = getOnePath(route.path);
            return (
              <NavLink to={to} key={to}>
                {route.menu}
              </NavLink>
            );
          })}
      </nav>
    </header>
  );
};
