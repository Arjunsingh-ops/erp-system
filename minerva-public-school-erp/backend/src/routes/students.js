import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
  const prisma = req.prisma;
  const students = await prisma.student.findMany({ orderBy: { lastName: 'asc' } });
  res.json(students);
});

router.post('/', async (req, res) => {
  const prisma = req.prisma;
  const { firstName, lastName, classSection, rollNumber, dateOfBirth, guardianName } = req.body;
  if (!firstName || !lastName || !classSection) {
    return res.status(400).json({ error: 'firstName, lastName, and classSection are required' });
  }
  try {
    const student = await prisma.student.create({
      data: { firstName, lastName, classSection, rollNumber: rollNumber || null, dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null, guardianName: guardianName || null },
    });
    res.status(201).json(student);
  } catch (e) {
    res.status(500).json({ error: 'Failed to create student' });
  }
});

export default router;