import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ExportService } from './export.service';

//TODO-implementd this
@Controller('export')
@ApiTags('Export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}
  @Get('export')
  async exportCsv(@Res() res: Response) {
    const filePath = await this.exportService.generateCsv();

    res
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', 'attachment; filename="data.csv"')
      .sendFile(filePath);
  }
}
