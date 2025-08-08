import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const prisma = req.prisma;
  const fees = await prisma.fee.findMany({ include: { student: true }, orderBy: { dueDate: 'asc' } });
  res.json(fees);
});

router.post('/pay', async (req, res) => {
  const prisma = req.prisma;
  const { feeId } = req.body;
  if (!feeId) return res.status(400).json({ error: 'feeId is required' });
  try {
    const updated = await prisma.fee.update({ where: { id: feeId }, data: { status: 'PAID', paidAt: new Date() } });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: 'Failed to mark as paid' });
  }
});

export default router;