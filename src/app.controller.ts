import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('aplicação')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint raiz é público para permitir acesso sem autenticação
  // Adicionei informações sobre o endpoint para o swagger
  @Public()
  @Get()
  @ApiOperation({
    summary: 'Mensagem de boas-vindas',
    description: 'Retorna uma mensagem de boas-vindas da API'
  })
  @ApiResponse({
    status: 200,
    description: 'Mensagem retornada com sucesso',
    schema: {
      type: 'string',
      example: 'Hello World!'
    }
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
