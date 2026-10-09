import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'JurisFlow API' }));

app.get('/api/clients', async (_req, res) => {
  const data = await prisma.contact.findMany({ orderBy: { name: 'asc' } });
  res.json(data);
});

app.get('/api/matters', async (_req, res) => {
  const data = await prisma.matter.findMany({
    include: { client: true, owner: true, tasks: true },
    orderBy: { openedAt: 'desc' }
  });
  res.json(data);
});

app.get('/api/matters/:id', async (req, res) => {
  const data = await prisma.matter.findUnique({
    where: { id: req.params.id },
    include: {
      client: true,
      owner: true,
      members: { include: { user: true } },
      parties: { include: { contact: true } },
      activities: { orderBy: { createdAt: 'desc' }, include: { author: true } },
      tasks: { orderBy: { dueAt: 'asc' }, include: { assignee: true } },
      documents: { orderBy: { createdAt: 'desc' } },
      charges: { include: { payments: true } }
    }
  });
  if (!data) return res.status(404).json({ error: 'Expediente no encontrado' });
  res.json(data);
});

app.get('/api/tasks', async (_req, res) => {
  const data = await prisma.task.findMany({
    include: { matter: true, assignee: true },
    orderBy: { dueAt: 'asc' }
  });
  res.json(data);
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log('JurisFlow API en http://localhost:' + port));
