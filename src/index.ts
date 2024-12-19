import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import moment from 'moment';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const files = fs.readdirSync("C:/Timelapse").sort((a, b) => {
    // Sort by filename descending
    return b.localeCompare(a);
  });
  const latest = files[0];
  res.send({
    path: `file/${latest}`,
    date: moment(latest.split(".")[0], "YYYY-MM-DD_HH-mm-ss").toISOString()
  });
});

app.get('/file/:filename', (req: Request, res: Response) => {
  const filename = req.params.filename;
  const file = fs.readFileSync(`C:/Timelapse/${filename}`);
  res.send(file);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});