import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { UsersService } from './users.service';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/roles.enum';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
@UseGuards(RolesGuard) 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  // Listar todos os usuários - Apenas Administradores
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  // Buscar usuário por ID - Apenas Administradores (ou o próprio usuário)
  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  // Atualizar usuário - Apenas Administradores (ou o próprio usuário)
  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(+id, updateUserDto);
  }

  // Excluir usuário - Apenas Administradores
  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
