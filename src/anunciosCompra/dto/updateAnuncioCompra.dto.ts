import { PartialType } from '@nestjs/mapped-types';
import { CreateAnuncioCompraDto } from './createAnuncioCompra.dto';

export class UpdateAnuncioCompraDto extends PartialType(CreateAnuncioCompraDto) {}