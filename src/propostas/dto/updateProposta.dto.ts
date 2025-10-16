import { PartialType } from '@nestjs/mapped-types';
import { CreatePropostaDto } from './createProposta.dto';

export class UpdatePropostaDto extends PartialType(CreatePropostaDto) {}