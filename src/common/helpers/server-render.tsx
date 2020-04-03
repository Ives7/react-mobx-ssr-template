import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerApp } from '../../server/server-app';
import { Request, Response } from 'express';
import { matchRoutes } from 'react-router-config';
import { routes } from '../routes/routes';
import { genInitStore } from './gen-init-store';
import { loadDataRunner } from './load-data-runner';
import { ChunkExtractor } from '@loadable/server';

export async function serverRender(
  response: Response,
  request: Request,
): Promise<void> {
  // 首先匹配命中的路由
  const matchedRoutes = matchRoutes(routes, request.path);
  // 获取初始store模型 空对象
  const initRootStore = genInitStore();
  // 触发命中route的loadData
  await loadDataRunner(matchedRoutes, initRootStore);

  const statsFile = path.resolve('dist/loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });
  const jsx = extractor.collectChunks(
    <ServerApp
      location={request.path}
      basename={process.env.BASENAME}
      context={{}}
    />,
  );
  // 渲染页面
  response.render('index', {
    rootStore: JSON.stringify(initRootStore),
    html: renderToString(jsx),
  });
}
