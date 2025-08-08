import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import authRouter from './routes/auth.js';
import studentsRouter from './routes/students.js';
import attendanceRouter from './routes/attendance.js';
import feesRouter from './routes/fees.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'minerva-backend' });
});

app.use('/api/auth', (req, res, next) => { req.prisma = prisma; next(); }, authRouter);
app.use('/api/students', (req, res, next) => { req.prisma = prisma; next(); }, studentsRouter);
app.use('/api/attendance', (req, res, next) => { req.prisma = prisma; next(); }, attendanceRouter);
app.use('/api/fees', (req, res, next) => { req.prisma = prisma; next(); }, feesRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});