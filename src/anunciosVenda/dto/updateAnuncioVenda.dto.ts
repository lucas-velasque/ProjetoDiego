//usando um helper para tornar os campos opcionais.

import { PartialType } from '@nestjs/mapped-types';
import { CreateAnuncioVendaDto } from './createAnuncioVenda.dto';

export class UpdateAnuncioVendaDto extends PartialType(CreateAnuncioVendaDto) {}