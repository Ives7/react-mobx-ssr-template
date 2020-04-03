import { matchRoutes, RouteConfig } from 'react-router-config';
import { Request } from 'express';

export async function loadDataRunner<
  Params extends { [K in keyof Params]?: string }
>(routes: RouteConfig[], request: Request): Promise<void> {
  // 寻找命中路由的loadData
  const matchedRoutes = matchRoutes(routes, request.path);
  for (let i = 0; i < matchedRoutes.length; i++) {
    const { match, route } = matchedRoutes[i];
    if (typeof route.loadData === 'function') {
      await route.loadData(request, match);
    }
  }
}
