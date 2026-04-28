import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BrandsModule } from './modules/brands/brands.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { BrandSuppliersModule } from './modules/brand-suppliers/brand-suppliers.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule, BrandsModule, SuppliersModule, BrandSuppliersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
