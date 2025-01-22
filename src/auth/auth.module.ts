import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './auth.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/configs/jwt-config';
import { PassportModule } from '@nestjs/passport';
import { JwtStratagy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthModel.name,
        schema: AuthSchema,
      },
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratagy],
})
export class AuthModule {}
