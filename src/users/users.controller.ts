import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  @Public() // 👈 Rota pública
  @Get()
  findAll() {
    return ['user1', 'user2'];
  }
}
