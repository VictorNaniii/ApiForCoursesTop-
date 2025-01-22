import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthModel } from './auth.model';
import { Model } from 'mongoose';

import { registerDto } from './dto/registerDto';

import { compare, genSalt, genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name)
    private readonly authModel: Model<AuthModel>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: registerDto) {
    const salt = genSaltSync(10);
    const user = await this.findUser(dto.email);
    if (user) throw new BadRequestException('This user alredy exist');

    const newUser = new this.authModel({
      email: dto.email,
      passwordHash: hashSync(dto.password.toString(), salt),
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return await this.authModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUser(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isCorectPassword = await compare(password, user.passwordHash);

    if (!isCorectPassword) throw new UnauthorizedException('Incorect password');

    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };

    return {
      accse_token: await this.jwtService.signAsync(payload),
    };
    
  }
}
