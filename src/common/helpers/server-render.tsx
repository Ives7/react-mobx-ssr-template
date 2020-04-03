import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerApp } from 'server/server-app';
import { Request, Response } from 'express';
import { routes } from '../routes/routes';
import { loadDataRunner } from './load-data-runner';
import { ChunkExtractor } from '@loadable/server';
import { SSRConfig } from './request';
import { useRootStore } from 'client/hooks/useStore';
import { toJS } from 'mobx';
import { StaticContext } from 'react-router';
import Helmet from 'react-helmet';

export async function serverRender(
  response: Response,
  request: Request,
): Promise<void> {
  // 初始化请求库
  SSRConfig.request = request;
  // 触发命中route的loadData 初始化数据
  await loadDataRunner(routes, request);
  // 异步加载stats.json
  const statsFile = path.resolve('dist/loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });
  const rootStore = useRootStore();
  const initRootStore = toJS(rootStore, { recurseEverything: true });
  const context: StaticContext = { statusCode: null };
  const jsx = extractor.collectChunks(
    <ServerApp
      location={request.path}
      basename={process.env.BASENAME}
      context={context}
    />,
  );
  const html = renderToString(jsx);
  const helmet = Helmet.renderStatic();
  // 渲染页面
  if (context.statusCode) {
    response.status(context.statusCode);
  }
  response.render('index', {
    // 脱水的数据
    rootStore: JSON.stringify(initRootStore),
    html,
    title: helmet.title.toString(),
    description: helmet.meta.toString(),
  });
}
