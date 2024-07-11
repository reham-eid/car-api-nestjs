import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class createReportDto {
  @IsNumber()
  @Max(1000000)
  @Min(0)
  price: number;

  @IsString()
  company: string;

  @IsString()
  model: string;

  @IsNumber()
  @Max(2050)
  @Min(1930)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Max(1000000)
  @Min(0)
  mileage: number;

  @IsOptional()
  @IsBoolean()
  approved?: boolean;
}
