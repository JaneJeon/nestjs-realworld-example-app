import { IsNotEmpty } from 'class-validator';

export class CreateCoinDto {
  @IsNotEmpty()
  readonly id!: string;
}
