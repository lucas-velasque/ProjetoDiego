import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
<<<<<<< HEAD
import { LoginDto } from './dto/login.dto';
=======
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036

@ApiTags('autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Adicionei informações sobre o endpoint para o swagger
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
<<<<<<< HEAD
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.username, loginDto.password);
=======
  @ApiOperation({
    summary: 'Fazer login',
    description: 'Autentica um usuário e retorna um token JWT para acesso aos endpoints protegidos'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'usuario123' },
        password: { type: 'string', example: 'senha123' }
      },
      required: ['username', 'password']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
>>>>>>> da4c679c4f39eca5d9247b8d3d2f5dfee3b94036
  }

  // Adicionei informações sobre o endpoint para o swagger
  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Registrar novo usuário',
    description: 'Cria uma nova conta de usuário no sistema'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'novoUsuario' },
        password: { type: 'string', example: 'senhaSegura123' }
      },
      required: ['username', 'password']
    }
  })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou usuário já existe' })
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(signUpDto.username, signUpDto.password);
  }

  // Adicionei informações sobre o endpoint para o swagger
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obter perfil do usuário',
    description: 'Retorna as informações do perfil do usuário autenticado a partir do token JWT'
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil retornado com sucesso',
    schema: {
      type: 'object',
      properties: {
        sub: { type: 'number', example: 1 },
        username: { type: 'string', example: 'usuario123' },
        role: { type: 'string', example: 'user' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Não autorizado - token inválido ou ausente' })
  getProfile(@Request() req) {
    return req.user;
  }
}
