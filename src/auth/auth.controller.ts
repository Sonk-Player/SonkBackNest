import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginDto, RegisterDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Post('/google-login')
  // loginWithGoogle(@Body() loginDto: LoginDto) {
  //   return this.authService.loginWithGoogle(loginDto);
  // }

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }


  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request) {
    return this.authService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() req: Request): LoginResponse{
    const user = req['user'] as User;
    

    return  {
      user,
      token: this.authService.getJwtToken({id: user._id})
    }
  }



  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
