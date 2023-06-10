import {
    NestInterceptor,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class EntityNotFoundError extends Error { }

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        stream$: Observable<any>,
    ): Observable<any> {
        // stream$ is an Observable of the controller's result value
        return stream$.pipe(
            catchError(error => {
                if (error instanceof EntityNotFoundError) {
                    throw new NotFoundException(error.message);
                } else {
                    throw error;
                }
            }),
        );
    }
}
