import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { serverRender } from '../../common/helpers/server-render';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  async catch(
    exception: NotFoundException,
    host: ArgumentsHost,
  ): Promise<void> {
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (request.path.startsWith('/api')) {
      response.send({
        success: false,
        code: 404,
        message: '未查询到该接口',
      });
      return;
    }

    await serverRender(response, request);
  }
}
