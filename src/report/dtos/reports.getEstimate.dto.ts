import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class getEstimateDto { // get estimate price for a vechal

  @IsString()
  company: string;

  @IsString()
  model: string;

  @Transform(({ value })=> parseInt(value))
  @IsNumber()
  @Max(2050)
  @Min(1930)
  year: number;

  @Transform(({ value })=> parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value })=> parseFloat(value))
  @IsLatitude()
  lat: number;

  @Transform(({ value })=> parseInt(value))
  @IsNumber()
  @Max(1000000)
  @Min(0)
  mileage: number;
}
