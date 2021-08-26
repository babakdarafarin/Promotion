import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

//Change, break to different scenarios TODO
@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {

    //depricated, change TODO
    return throwError(exception.getError());
  }
}