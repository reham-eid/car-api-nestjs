import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { createReportDto } from './dtos/reports.create,dto';
import { ReportService } from './report.service';
import { CurrentUser } from '../user/decorators/current.user.decorator';
import { User } from '../user/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/reports.dto';
import { approvedReportDto } from './dtos/reports.approveddto';
// import { AdminGuard } from 'src/guards/admin.guard';
import { getEstimateDto } from './dtos/reports.getEstimate.dto';
// import { AuthGuard } from '../guards/auth.guard';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post()
  // @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: createReportDto, @CurrentUser() user: User) {
    return this.reportService.createReport(body, user);
  }

  @Patch('/:id')
  // @UseGuards(AdminGuard)
  approvedReport(@Param('id') id: string, @Body() body: approvedReportDto) {
    return this.reportService.changeApproval(id, body.approved);
  }

  @Get()
  getEstimate(@Query() query: getEstimateDto) {
    console.log('Query', query); 
    return this.reportService.createEstimate(query)
  }
}
