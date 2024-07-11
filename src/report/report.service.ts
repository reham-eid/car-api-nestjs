import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createReportDto } from './dtos/reports.create,dto';
import { User } from '../user/user.entity';
import { getEstimateDto } from './dtos/reports.getEstimate.dto';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async createReport(reportDto: createReportDto, user: User) {
    // const { price, company, model, year, lng, lat, mileage } = reportDto;
    const report = await this.repo.create(reportDto);
    report.user = user;
    return await this.repo.save(report);
  }

  async changeApproval(reportId: string, approved: boolean) {
    const report = await this.repo.findOne({
      where: { id: parseInt(reportId) },
    });
    if (!report) {
      throw new NotFoundException('report not found ');
    }
    report.approved = approved;
    const result = await this.repo.save(report);
    return result
  }

  createEstimate({ company, model, mileage, lat, lng, year }: getEstimateDto) {
    return (
      this.repo
        .createQueryBuilder()
        .select('AVG(price)','price')
        // .where( "dbColumn = :value" , { dbColumn :queryValue})
        .where('company = :company', { company })
        .andWhere('model = :model', { model })
        .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
        .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
        .andWhere('year - :year BETWEEN -3 AND 3', { year })
        .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)' , 'DESC')
        .setParameters({ mileage })
        .limit(3)
        .getRawMany()
    );
  }
}
