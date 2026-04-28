import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response, Request } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // ---------------------------
    // REGISTER
    // ---------------------------
    @Post('register')
    async register(
        @Body() dto: RegisterDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.authService.register(dto);

        this.setRefreshCookie(res, result.refreshToken);

        return {
            user: result.user,
            accessToken: result.accessToken,
        };
    }

    // ---------------------------
    // LOGIN
    // ---------------------------
    @Post('login')
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.authService.login(dto);

        this.setRefreshCookie(res, result.refreshToken);

        return {
            user: result.user,
            accessToken: result.accessToken,
        };
    }

    // ---------------------------
    // REFRESH TOKENS
    // ---------------------------
    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    async refresh(
        @Req() req: any,
        @Res({ passthrough: true }) res: Response,
    ) {
        console.log("HITTING REFRESH with:", req.user);
        const userId = req.user.id; // FIXED
        const refreshToken = req.user.refreshToken;

        const result = await this.authService.refreshTokens(
            userId,
            refreshToken,
        );

        this.setRefreshCookie(res, result.refreshToken);

        return {
            accessToken: result.accessToken,
        };
    }

    // ---------------------------
    // LOGOUT
    // ---------------------------
    @Post('logout')
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const userId = (req as any).user?.id;

        if (userId) {
            await this.authService.logout(userId);
        }

        res.clearCookie('refresh_token');

        return { message: 'Logged out' };
    }

    // ---------------------------
    // COOKIE SETTER
    // ---------------------------
    private setRefreshCookie(res: Response, token: string) {
        res.cookie('refresh_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/auth/refresh',
        });
    }
}
