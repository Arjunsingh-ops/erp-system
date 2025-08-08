import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const prisma = req.prisma;
  const { date } = req.query;
  const where = date ? { date: new Date(date) } : {};
  const records = await prisma.attendance.findMany({ where, include: { student: true }, orderBy: { date: 'desc' } });
  res.json(records);
});

router.post('/', async (req, res) => {
  const prisma = req.prisma;
  const { studentId, date, status } = req.body;
  if (!studentId || !date || !status) return res.status(400).json({ error: 'studentId, date, status are required' });
  try {
    const created = await prisma.attendance.create({ data: { studentId, date: new Date(date), status } });
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ error: 'Failed to create attendance' });
  }
});

export default router;