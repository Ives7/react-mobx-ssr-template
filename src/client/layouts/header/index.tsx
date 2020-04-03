import React from 'react';
import { NavLink } from 'react-router-dom';
import { getOnePath } from 'common/helpers/get-one-path';
import { RouteConfigComponentProps } from 'react-router-config';


const Header: React.FC<RouteConfigComponentProps> = function Header(
  props: RouteConfigComponentProps,
) {
  return (
    <header>
      <nav>
        {props.route.routes
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

export default Header;
