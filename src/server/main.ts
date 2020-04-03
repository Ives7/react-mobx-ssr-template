import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';

process.env.SSR = 'true';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.setViewEngine('hbs');
  app.setBaseViewsDir(resolve('views'));
  app.useStaticAssets(resolve('public'));
  app.setGlobalPrefix('/api');
  /*
   * 为什么使用404异常捕获渲染客户端界面，而不是使用通配符*的routeHandle。
   * 1. 因为后端接口通常要加前缀，例如/api，每个controller单独加的话，
   *    就会很麻烦也会有误操作的可能性。所以使用了setGlobalPrefix方法统一加前缀。
   *    可统一加前缀后，*的handle就等同于/api/*，无法匹配根路径的前端路由。
   * 2. 404页面交给前端处理也无不可。
   * 3. 接口的404在异常过滤器中也有处理
   */
  app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(process.env.HTTP_SERVER_PORT);
}

bootstrap();

//todo: ssr cookie问题
