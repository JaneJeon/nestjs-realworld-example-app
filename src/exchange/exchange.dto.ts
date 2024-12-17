import { IsNotEmpty } from 'class-validator';

export class CreateExchangeDto {
  @IsNotEmpty()
  readonly id!: string;
}
