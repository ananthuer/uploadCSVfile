import { PartialType } from '@nestjs/swagger';
import { CreateMiscelleanousDto } from './create-miscelleanous.dto';

export class UpdateMiscelleanousDto extends PartialType(CreateMiscelleanousDto) {}
