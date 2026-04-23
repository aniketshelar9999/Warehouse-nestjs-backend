import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        console.log("REFRSH GUARD-COOKIES:", req.cookies);
        return super.canActivate(context);
    }
}
