import { PartialType } from '@nestjs/swagger';
import { CreateAnuncioCompraDto } from './createAnuncioCompra.dto';

export class UpdateAnuncioCompraDto extends PartialType(CreateAnuncioCompraDto) {}