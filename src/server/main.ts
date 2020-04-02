import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';
import { resolve } from 'path';
import { favicon } from './middlewares/favicon';
import { removeXPowered } from './middlewares/remove-x-powered';

process.env.SSR = 'true';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');
  app.setViewEngine('hbs');
  app.setBaseViewsDir(resolve('views'));
  app.useStaticAssets(resolve('public'), {
    etag: false,
    lastModified: true,
    maxAge: 36000,
  });
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.use(removeXPowered);
  
  app.use(favicon);
  await app.listen(process.env.HTTP_SERVER_PORT);
}

bootstrap();

//todo: 打包
//todo: 直传CDN
//todo: 数据脱水注水
//todo: mobx
//todo: 双端请求
//todo: 部署
