import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.payment.deleteMany();
  await prisma.feeCharge.deleteMany();
  await prisma.document.deleteMany();
  await prisma.task.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.matterParty.deleteMany();
  await prisma.matterMember.deleteMany();
  await prisma.matter.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  const org = await prisma.organization.create({ data: { name: 'Estudio Cordillera · Demo' } });

  const catalina = await prisma.user.create({ data: { orgId: org.id, name: 'Catalina Herrera', email: 'catalina@demo.local', role: 'ADMIN' } });
  const tomas = await prisma.user.create({ data: { orgId: org.id, name: 'Tomás Fuentes', email: 'tomas@demo.local', role: 'LAWYER' } });
  const fernanda = await prisma.user.create({ data: { orgId: org.id, name: 'Fernanda Silva', email: 'fernanda@demo.local', role: 'ASSISTANT' } });

  const client = await prisma.contact.create({ data: { orgId: org.id, name: 'Sebastián Rivas Soto', type: 'PERSON', rut: '15.842.761-4', email: 'sebastian.rivas@example.cl', status: 'CLIENT' } });
  const querellante = await prisma.contact.create({ data: { orgId: org.id, name: 'Desarrollos Urbanos del Centro SpA', type: 'COMPANY', rut: '77.000.111-2', status: 'COUNTERPARTY' } });
  const testigo = await prisma.contact.create({ data: { orgId: org.id, name: 'Marcela Paredes Núñez', type: 'PERSON', status: 'WITNESS' } });

  const matter = await prisma.matter.create({
    data: {
      orgId: org.id,
      code: 'PEN-2026-0041',
      title: 'Defensa penal · Caso Proyecto Los Maitenes',
      area: 'Penal',
      summary: 'Expediente penal completamente ficticio para demostración del sistema.',
      status: 'ACTIVE',
      stage: 'Investigación formalizada',
      priority: 'HIGH',
      court: 'Juzgado de Garantía de Santiago (demo)',
      rit: 'RIT 1842-2026',
      ruc: 'RUC 2600987654-3',
      clientId: client.id,
      ownerId: catalina.id,
      members: { create: [{ userId: catalina.id }, { userId: tomas.id }, { userId: fernanda.id }] },
      parties: { create: [{ contactId: client.id, role: 'CLIENT' }, { contactId: querellante.id, role: 'COMPLAINANT' }, { contactId: testigo.id, role: 'WITNESS' }] }
    }
  });

  const activities = [
    ['Ingreso','Primer contacto con cliente','Se registra consulta y solicitud de antecedentes.','2026-08-18T12:15:00Z'],
    ['Conflictos','Revisión inicial de conflictos','Sin coincidencias detectadas en revisión manual.','2026-08-18T15:40:00Z'],
    ['Reunión','Entrevista inicial','Levantamiento de cronología y documentos disponibles.','2026-08-19T13:00:00Z'],
    ['Documento','Recepción de antecedentes contractuales','Se incorporan contratos y comunicaciones.','2026-08-20T19:25:00Z'],
    ['Análisis','Matriz preliminar de hechos y evidencia','Clasificación inicial de hechos y fuentes.','2026-08-24T14:50:00Z'],
    ['Tribunal','Notificación de audiencia de formalización','Se registra audiencia y preparación.','2026-08-27T18:10:00Z'],
    ['Audiencia','Audiencia de formalización','Se registran hechos formalizados y cautelares debatidas.','2026-09-02T11:45:00Z'],
    ['Estado','Investigación formalizada','Se actualiza etapa procesal.','2026-09-02T16:30:00Z'],
    ['Documento','Carpeta investigativa parcial','Recepción y revisión inicial.','2026-09-04T20:05:00Z'],
    ['Diligencia','Solicitud de diligencias','Se dejan diligencias defensivas propuestas.','2026-09-09T13:20:00Z'],
    ['Reunión','Preparación entrevista testigo','Definición de temas a contrastar.','2026-09-15T15:00:00Z'],
    ['Entrevista','Entrevista a testigo','Registro de antecedentes útiles.','2026-09-18T18:40:00Z'],
    ['Peritaje','Encargo de peritaje documental','Revisión técnica de documentación financiera.','2026-09-24T12:30:00Z'],
    ['Análisis','Actualización estrategia de defensa','Se incorporan hallazgos y próximos pasos.','2026-10-01T21:10:00Z'],
    ['Cliente','Reunión de actualización','Se informa estado y agenda del mes.','2026-10-05T13:45:00Z'],
    ['Documento','Informe pericial preliminar','Se incorpora borrador para revisión.','2026-10-07T19:20:00Z'],
    ['Equipo','Revisión semanal del caso','Se priorizan audiencia y diligencias.','2026-10-09T12:00:00Z']
  ];

  for (const [type,title,detail,createdAt] of activities) {
    await prisma.activity.create({ data: { matterId: matter.id, authorId: catalina.id, type, title, detail, createdAt: new Date(createdAt) } });
  }

  const tasks = [
    ['DEADLINE','Revisar respuesta a oficio bancario',fernanda.id,'2026-10-06T15:00:00Z','HIGH'],
    ['TASK','Revisión conjunta de informe pericial',catalina.id,'2026-10-09T18:30:00Z','HIGH'],
    ['TASK','Preparar minuta para cliente',tomas.id,'2026-10-12T13:00:00Z','MEDIUM'],
    ['DEADLINE','Presentar solicitud de diligencias complementarias',tomas.id,'2026-10-13T12:00:00Z','HIGH'],
    ['HEARING','Audiencia de revisión de cautelares',catalina.id,'2026-10-14T14:30:00Z','HIGH'],
    ['TASK','Entrevista complementaria a testigo',tomas.id,'2026-10-16T19:00:00Z','MEDIUM'],
    ['TASK','Contrastar cartolas con informe pericial',fernanda.id,'2026-10-19T15:30:00Z','MEDIUM'],
    ['DEADLINE','Control interno de plazo de investigación',catalina.id,'2026-10-21T12:30:00Z','HIGH'],
    ['TASK','Actualizar matriz de evidencia',fernanda.id,'2026-10-23T17:00:00Z','MEDIUM'],
    ['HEARING','Audiencia de seguimiento procesal',catalina.id,'2026-10-28T13:30:00Z','HIGH']
  ];
  for (const [kind,title,assigneeId,dueAt,priority] of tasks) {
    await prisma.task.create({ data: { matterId: matter.id, assigneeId, kind: kind as any, title, dueAt: new Date(dueAt), priority } });
  }

  for (const [name,category] of [
    ['01_Querella_Demo.pdf','Escrito'],['02_Contratos_Proyecto_Los_Maitenes.pdf','Antecedentes'],['03_Resolucion_Formalizacion.pdf','Resolución'],
    ['04_Minuta_Audiencia_Formalizacion.docx','Minuta'],['05_Carpeta_Investigativa_Parcial.pdf','Fiscalía'],['06_Matriz_Hechos_Evidencia.xlsx','Trabajo interno'],
    ['07_Entrevista_Testigo_Marcela_Paredes.pdf','Entrevista'],['08_Solicitud_Diligencias.pdf','Escrito'],['09_Antecedentes_Bancarios.zip','Evidencia'],
    ['10_Informe_Pericial_Preliminar.pdf','Peritaje'],['11_Minuta_Revision_Cautelares.docx','Minuta']
  ]) await prisma.document.create({ data: { matterId: matter.id, name, category } });

  const charge1 = await prisma.feeCharge.create({ data: { matterId: matter.id, concept: 'Etapa 1 · Ingreso, análisis y formalización', amount: 1200000 } });
  const charge2 = await prisma.feeCharge.create({ data: { matterId: matter.id, concept: 'Etapa 2 · Investigación y diligencias', amount: 1800000 } });
  await prisma.payment.create({ data: { chargeId: charge1.id, amount: 1200000, method: 'TRANSFER' } });
  await prisma.payment.create({ data: { chargeId: charge2.id, amount: 900000, method: 'TRANSFER' } });

  console.log('Seed listo:', matter.code);
}

main().finally(() => prisma.$disconnect());
