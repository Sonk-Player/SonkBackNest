import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bycryptjs from 'bcryptjs';

import { CreateUserDto, LoginDto, RegisterDto, UpdateAuthDto } from './dto';

import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,

    private jwtService: JwtService,
  ) {}

async create(createUserDto: CreateUserDto): Promise<User> {
  const { username, email } = createUserDto;

  // Check if username already exists
  const existingUsername = await this.userModel.findOne({ username });
  if (existingUsername) {
    throw new UnauthorizedException('username');
  }

  // Check if email already exists
  const existingEmail = await this.userModel.findOne({ email });
  if (existingEmail) {
    throw new UnauthorizedException('email');
  }

  try {
    const newUser = new this.userModel(createUserDto);

    await newUser.save();

    const { password: _, ...user } = newUser.toJSON();

    return user;
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException('Something terrible happened!');
  }
}

  async register(registerDto: RegisterDto): Promise<LoginResponse> {
    const user = await this.create(registerDto);

    return {
      user: user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    // Verificar que el email coincide con el de la BD
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Email o contraseña icorrectos');
    }

    // Comparo la contraseña del usuario con la contraseña de la BD
    if (!bycryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Email o contraseña icorrectos');
    }

    const { password: _, ...rest } = user.toJSON();

    console.log('rest', rest);
    return {
      user: rest,
      token: this.getJwtToken({ id: user.id }),
    };
  }

// async loginWithGoogle(loginDto: LoginDto): Promise<LoginResponse> {
//   const { email, password } = loginDto;

//   // Verificar que el email coincide con el de la BD
//   const user = await this.userModel.findOne({ email });
//   if (!user) {
//     throw new UnauthorizedException('El email proporcionado no está asociado a ninguna cuenta de Google');
//   }

//   // Verificar que el usuario se autenticó con Google
//   if (!user.isGoogle) {
//     throw new UnauthorizedException('El usuario no se autenticó con Google');
//   }

//   const { password: _, ...rest } = user.toJSON();

//   return {
//     user: rest,
//     token: this.getJwtToken({ id: user.id }),
//   };
// }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    const { password, ...rest } = user.toJSON();

    return rest;
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }
}
