import { Expose } from 'class-transformer';

/**
 * serialze take Report entity instace &&
 * converte it into new constructor object
 * and here can control which props is expose or exclude
 * also can generate a new property with @Transform()
 * { obj } is a ref to original Report entity
 * so can access any props on it
 *  */
export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  company: string;

  @Expose()
  model: string;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  // @Transform(({ obj }) => obj.user.id)
  // @Expose()
  // userId: number;

  @Expose()
  approved: boolean;

}
