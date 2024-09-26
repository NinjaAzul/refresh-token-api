/* eslint-disable no-console */
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Request } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const { response, ...restException } = exception;
    const isDevelopment = process.env.NODE_ENV === 'development';
    const [, module] = request.url.split('/');

    if (isDevelopment) {
      console.warn('---------------------------------------------------------------------');
      console.warn(
        `AllExceptionsFilter: ${module?.toLocaleUpperCase()} MODULE [${new Date().toLocaleString()}]`,
      );
      console.warn('---------------------------------------------------------------------');

      console.warn('Exception:', restException);
      console.warn('---------------------------------------------------------------------');

      console.warn('Response:', JSON.stringify(response, null, 2));
      console.warn('---------------------------------------------------------------------');

      console.warn({
        request: {
          method: request.method,
          url: request.url,
          headers: request.headers,
          body: request.body,
          query: request.query,
          params: request.params,
          user: request.user,
        },
      });
      console.warn('---------------------------------------------------------------------');
      console.warn('Stack:', exception.stack);
      console.warn('---------------------------------------------------------------------');
    }

    super.catch(exception, host);
  }
}
