import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Put, 
  Delete, 
  UseGuards, 
  HttpCode, 
  HttpStatus,
  Query,
  ParseIntPipe
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam,
  ApiBearerAuth,
  ApiBody
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UsersService } from './users.service';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/roles.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { PaginatedUsersDto } from './dto/paginated-users-response.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Usuários')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiOperation({ 
    summary: 'Criar um novo usuário',
    description: 'Endpoint público para registro de novos usuários na loja de cartas Pokémon'
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuário criado com sucesso',
    type: UserResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Nome de usuário já está em uso' 
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Listar todos os usuários com filtros e paginação',
    description: 'Apenas administradores podem listar usuários. Suporta filtros por username, role e nível.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de usuários retornada com sucesso',
    type: PaginatedUsersDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Não autorizado' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acesso negado - apenas administradores' 
  })
  findAll(@Query() filterDto: FilterUserDto): Promise<PaginatedUsersDto> {
    return this.usersService.findAll(filterDto);
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Buscar usuário por ID',
    description: 'Apenas administradores podem buscar detalhes de usuários específicos'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do usuário', 
    type: 'number',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário encontrado',
    type: UserResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Não autorizado' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acesso negado - apenas administradores' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Atualizar dados de um usuário',
    description: 'Apenas administradores podem atualizar dados de usuários'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do usuário', 
    type: 'number',
    example: 1
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário atualizado com sucesso',
    type: UserResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Não autorizado' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acesso negado - apenas administradores' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Nome de usuário já está em uso' 
  })
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Excluir um usuário',
    description: 'Apenas administradores podem excluir usuários do sistema'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do usuário', 
    type: 'number',
    example: 1
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Usuário excluído com sucesso' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Não autorizado' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acesso negado - apenas administradores' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}