import { format } from '@fast-csv/format';
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

//TODO-implementd this
@Injectable()
export class ExportService {
  async generateCsv(): Promise<string> {
    // const data = [];
    const data = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
    ];
    const filePath = join(__dirname, '..', 'data.csv');
    const ws = createWriteStream(filePath);

    const csvStream = format({ headers: true });
    csvStream.pipe(ws);

    data.forEach((row) => csvStream.write(row));
    csvStream.end();

    return new Promise((resolve, reject) => {
      ws.on('finish', () => resolve(filePath));
      ws.on('error', reject);
    });
  }
}
