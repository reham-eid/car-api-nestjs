import { IsBoolean } from 'class-validator';

export class approvedReportDto {
  @IsBoolean()
  approved: boolean;
}
