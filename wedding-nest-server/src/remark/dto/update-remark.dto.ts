import { PartialType } from '@nestjs/mapped-types';
import { CreateRemarkDto } from './create-remark.dto';

export class UpdateRemarkDto extends PartialType(CreateRemarkDto) {}
