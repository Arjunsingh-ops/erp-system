import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@minerva.local';
  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash, role: 'ADMIN' },
  });

  const students = [
    { firstName: 'Aarav', lastName: 'Sharma', classSection: 'Grade 5 - A', rollNumber: '5A-01' },
    { firstName: 'Diya', lastName: 'Patel', classSection: 'Grade 6 - B', rollNumber: '6B-12' },
    { firstName: 'Kabir', lastName: 'Singh', classSection: 'Grade 7 - C', rollNumber: '7C-07' },
  ];

  for (const s of students) {
    await prisma.student.upsert({
      where: { rollNumber: s.rollNumber },
      update: {},
      create: s,
    });
  }

  const allStudents = await prisma.student.findMany();
  for (const s of allStudents) {
    await prisma.fee.create({
      data: {
        studentId: s.id,
        amount: '1500.00',
        dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 10),
        status: 'UNPAID',
      },
    });
  }

  console.log('Seed completed. Admin: admin@minerva.local / admin123');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});