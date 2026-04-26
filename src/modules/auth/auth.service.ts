import {
    Injectable,
    UnauthorizedException,
    ForbiddenException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../users/entities/user.entities';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    // ---------------------------
    // REGISTER
    // ---------------------------
    async register(dto: RegisterDto) {
        const existing = await this.usersService.findByEmail(dto.email);
        if (existing) throw new ConflictException('Email already exists');

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.usersService.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            role: UserRole.EMPLOYEE,
        });

        const tokens = await this.getTokens(user.id, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return {
            user: { id: user.id, email: user.email, role: user.role },
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    // ---------------------------
    // LOGIN
    // ---------------------------

    async login(dto: any) {
        const user = await this.usersService.findByEmail(dto.email);


        if (!user) throw new UnauthorizedException('Invalid credentials');

        const passwordMatches = await bcrypt.compare(dto.password, user.password);


        if (!passwordMatches) throw new UnauthorizedException('Invalid credentials');

        const tokens = await this.getTokens(user.id, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return {
            user: { id: user.id, email: user.email, role: user.role },
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    // ---------------------------
    // LOGOUT
    // ---------------------------
    async logout(userId: number) {
        await this.usersService.update(userId, { refreshToken: null });
        return { message: 'Logged out successfully' };
    }

    // ---------------------------
    // REFRESH TOKENS
    // ---------------------------
    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.usersService.findOne(userId);
        if (!user || !user.refreshToken)
            throw new ForbiddenException('Access denied');

        const matches = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!matches) throw new ForbiddenException('Access denied');

        const tokens = await this.getTokens(user.id, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    // ---------------------------
    // GENERATE TOKENS
    // ---------------------------
    async getTokens(userId: number, role: string) {
        const payload = {
            sub: userId,
            role,
        } as any;

        const accessToken = await this.jwt.signAsync(payload, {
            secret: this.config.getOrThrow('JWT_ACCESS_SECRET'),
            expiresIn: this.config.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
        });

        const refreshToken = await this.jwt.signAsync(payload, {
            secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
            expiresIn: this.config.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
        });

        return { accessToken, refreshToken };
    }
    // ---------------------------
    // HASH + SAVE REFRESH TOKEN
    // ---------------------------
    async updateRefreshToken(userId: number, refreshToken: string) {
        const hashed = await bcrypt.hash(refreshToken, 10);
        await this.usersService.update(userId, { refreshToken: hashed });
    }
}
