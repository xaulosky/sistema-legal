export type MatterStatus = 'En curso' | 'En evaluación' | 'En espera' | 'Cerrado';
export type TaskKind = 'Audiencia' | 'Vencimiento' | 'Tarea';

export const team = [
  { id: 'u1', name: 'Catalina Herrera', role: 'Socia / Abogada', initials: 'CH' },
  { id: 'u2', name: 'Tomás Fuentes', role: 'Abogado', initials: 'TF' },
  { id: 'u3', name: 'Fernanda Silva', role: 'Procuradora', initials: 'FS' },
  { id: 'u4', name: 'Paula Díaz', role: 'Administración', initials: 'PD' }
];

export const clients = [
  { id: 'c1', name: 'Sebastián Rivas Soto', type: 'Persona', rut: '15.842.761-4', email: 'sebastian.rivas@example.cl', phone: '+56 9 5555 0181', status: 'Cliente', matters: 1 },
  { id: 'c2', name: 'Inversiones Cordillera SpA', type: 'Empresa', rut: '77.412.660-8', email: 'legal@cordillera.example.cl', phone: '+56 2 2555 0142', status: 'Cliente', matters: 2 },
  { id: 'c3', name: 'María Paz Vergara', type: 'Persona', rut: '18.614.228-3', email: 'maria.vergara@example.cl', phone: '+56 9 5555 0128', status: 'Potencial', matters: 0 },
  { id: 'c4', name: 'Constructora Mirador Sur Ltda.', type: 'Empresa', rut: '76.992.541-1', email: 'contacto@miradorsur.example.cl', phone: '+56 43 255 9012', status: 'Cliente', matters: 1 }
];

export const penalCase = {
  id: 'm1',
  code: 'PEN-2026-0041',
  title: 'Defensa penal · Caso Proyecto Los Maitenes',
  area: 'Penal',
  status: 'En curso' as MatterStatus,
  stage: 'Investigación formalizada',
  priority: 'Alta',
  client: 'Sebastián Rivas Soto',
  clientId: 'c1',
  owner: 'Catalina Herrera',
  court: 'Juzgado de Garantía de Santiago (demo)',
  rit: 'RIT 1842-2026',
  ruc: 'RUC 2600987654-3',
  summary: 'Defensa penal ficticia asociada a hechos investigados en la ejecución del Proyecto Los Maitenes. El expediente se utiliza exclusivamente para demostrar el flujo del sistema.',
  parties: [
    { role: 'Imputado / Cliente', name: 'Sebastián Rivas Soto' },
    { role: 'Querellante', name: 'Desarrollos Urbanos del Centro SpA' },
    { role: 'Testigo', name: 'Marcela Paredes Núñez' },
    { role: 'Institución', name: 'Fiscalía Local Centro Norte (referencia ficticia)' }
  ],
  history: [
    { date: '2026-08-18 09:15', type: 'Ingreso', title: 'Primer contacto con cliente', detail: 'Se registra consulta y se solicita documentación inicial.' },
    { date: '2026-08-18 12:40', type: 'Conflictos', title: 'Revisión inicial de conflictos', detail: 'Sin coincidencias detectadas en la revisión manual del estudio.' },
    { date: '2026-08-19 10:00', type: 'Reunión', title: 'Entrevista inicial', detail: 'Levantamiento de cronología, participantes y documentos disponibles.' },
    { date: '2026-08-20 16:25', type: 'Documento', title: 'Recepción de antecedentes contractuales', detail: 'Se incorporan contratos, anexos y comunicaciones relevantes.' },
    { date: '2026-08-24 11:50', type: 'Análisis', title: 'Matriz preliminar de hechos y evidencia', detail: 'Clasificación de hechos controvertidos, fuentes y diligencias sugeridas.' },
    { date: '2026-08-27 15:10', type: 'Tribunal', title: 'Notificación de audiencia de formalización', detail: 'Se registra fecha de audiencia y preparación requerida.' },
    { date: '2026-09-02 08:45', type: 'Audiencia', title: 'Audiencia de formalización', detail: 'Se registran hechos formalizados y medidas cautelares debatidas.' },
    { date: '2026-09-02 13:30', type: 'Estado', title: 'Etapa actualizada', detail: 'Expediente pasa a investigación formalizada.' },
    { date: '2026-09-04 17:05', type: 'Documento', title: 'Carpeta investigativa parcial', detail: 'Se registra recepción y revisión inicial de carpeta.' },
    { date: '2026-09-09 10:20', type: 'Diligencia', title: 'Solicitud de diligencias', detail: 'Se deja constancia de diligencias defensivas propuestas.' },
    { date: '2026-09-15 12:00', type: 'Reunión', title: 'Preparación entrevista testigo', detail: 'Definición de temas y cronología a contrastar.' },
    { date: '2026-09-18 15:40', type: 'Entrevista', title: 'Entrevista a testigo', detail: 'Se registran antecedentes útiles para contrastar documentación.' },
    { date: '2026-09-24 09:30', type: 'Peritaje', title: 'Encargo de peritaje documental', detail: 'Se solicita revisión técnica de documentación financiera.' },
    { date: '2026-10-01 18:10', type: 'Análisis', title: 'Actualización estrategia de defensa', detail: 'Se incorporan hallazgos documentales y próximos pasos.' },
    { date: '2026-10-05 10:45', type: 'Cliente', title: 'Reunión de actualización', detail: 'Se informa estado de la investigación y agenda de octubre.' },
    { date: '2026-10-07 16:20', type: 'Documento', title: 'Informe pericial preliminar', detail: 'Se agrega borrador preliminar para revisión del equipo.' },
    { date: '2026-10-09 09:00', type: 'Equipo', title: 'Revisión semanal del caso', detail: 'Se priorizan audiencia, diligencias y revisión de evidencia pendiente.' }
  ],
  tasks: [
    { id: 't1', date: '2026-10-06', time: '12:00', kind: 'Vencimiento' as TaskKind, title: 'Revisar respuesta a oficio bancario', owner: 'Fernanda Silva', status: 'Vencida', priority: 'Alta' },
    { id: 't2', date: '2026-10-09', time: '15:30', kind: 'Tarea' as TaskKind, title: 'Revisión conjunta de informe pericial', owner: 'Catalina Herrera', status: 'En proceso', priority: 'Alta' },
    { id: 't3', date: '2026-10-12', time: '10:00', kind: 'Tarea' as TaskKind, title: 'Preparar minuta para cliente', owner: 'Tomás Fuentes', status: 'Pendiente', priority: 'Media' },
    { id: 't4', date: '2026-10-13', time: '09:00', kind: 'Vencimiento' as TaskKind, title: 'Presentar solicitud de diligencias complementarias', owner: 'Tomás Fuentes', status: 'Pendiente', priority: 'Alta' },
    { id: 't5', date: '2026-10-14', time: '11:30', kind: 'Audiencia' as TaskKind, title: 'Audiencia de revisión de cautelares', owner: 'Catalina Herrera', status: 'Pendiente', priority: 'Alta' },
    { id: 't6', date: '2026-10-16', time: '16:00', kind: 'Tarea' as TaskKind, title: 'Entrevista complementaria a testigo', owner: 'Tomás Fuentes', status: 'Pendiente', priority: 'Media' },
    { id: 't7', date: '2026-10-19', time: '12:30', kind: 'Tarea' as TaskKind, title: 'Contrastar cartolas con informe pericial', owner: 'Fernanda Silva', status: 'Pendiente', priority: 'Media' },
    { id: 't8', date: '2026-10-21', time: '09:30', kind: 'Vencimiento' as TaskKind, title: 'Control interno de plazo de investigación', owner: 'Catalina Herrera', status: 'Pendiente', priority: 'Alta' },
    { id: 't9', date: '2026-10-23', time: '14:00', kind: 'Tarea' as TaskKind, title: 'Actualizar matriz de evidencia', owner: 'Fernanda Silva', status: 'Pendiente', priority: 'Media' },
    { id: 't10', date: '2026-10-28', time: '10:30', kind: 'Audiencia' as TaskKind, title: 'Audiencia de seguimiento procesal', owner: 'Catalina Herrera', status: 'Pendiente', priority: 'Alta' },
    { id: 't11', date: '2026-11-03', time: '09:00', kind: 'Tarea' as TaskKind, title: 'Reunión de estrategia con cliente', owner: 'Catalina Herrera', status: 'Pendiente', priority: 'Media' },
    { id: 't12', date: '2026-11-06', time: '17:00', kind: 'Vencimiento' as TaskKind, title: 'Revisión de diligencias pendientes', owner: 'Tomás Fuentes', status: 'Pendiente', priority: 'Alta' },
    { id: 't13', date: '2026-11-10', time: '11:00', kind: 'Tarea' as TaskKind, title: 'Preparar resumen ejecutivo de investigación', owner: 'Tomás Fuentes', status: 'Pendiente', priority: 'Media' },
    { id: 't14', date: '2026-11-18', time: '09:30', kind: 'Vencimiento' as TaskKind, title: 'Control de plazo procesal interno', owner: 'Catalina Herrera', status: 'Pendiente', priority: 'Alta' }
  ],
  documents: [
    { name: '01_Querella_Demo.pdf', category: 'Escrito', date: '2026-08-20', owner: 'Catalina Herrera' },
    { name: '02_Contratos_Proyecto_Los_Maitenes.pdf', category: 'Antecedentes', date: '2026-08-20', owner: 'Tomás Fuentes' },
    { name: '03_Resolucion_Formalizacion.pdf', category: 'Resolución', date: '2026-09-02', owner: 'Catalina Herrera' },
    { name: '04_Minuta_Audiencia_Formalizacion.docx', category: 'Minuta', date: '2026-09-02', owner: 'Tomás Fuentes' },
    { name: '05_Carpeta_Investigativa_Parcial.pdf', category: 'Fiscalía', date: '2026-09-04', owner: 'Fernanda Silva' },
    { name: '06_Matriz_Hechos_Evidencia.xlsx', category: 'Trabajo interno', date: '2026-09-10', owner: 'Fernanda Silva' },
    { name: '07_Entrevista_Testigo_Marcela_Paredes.pdf', category: 'Entrevista', date: '2026-09-18', owner: 'Tomás Fuentes' },
    { name: '08_Solicitud_Diligencias.pdf', category: 'Escrito', date: '2026-09-21', owner: 'Catalina Herrera' },
    { name: '09_Antecedentes_Bancarios.zip', category: 'Evidencia', date: '2026-09-29', owner: 'Fernanda Silva' },
    { name: '10_Informe_Pericial_Preliminar.pdf', category: 'Peritaje', date: '2026-10-07', owner: 'Catalina Herrera' },
    { name: '11_Minuta_Revision_Cautelares.docx', category: 'Minuta', date: '2026-10-09', owner: 'Tomás Fuentes' }
  ],
  fees: [
    { concept: 'Etapa 1 · Ingreso, análisis y formalización', amount: 1200000, paid: 1200000 },
    { concept: 'Etapa 2 · Investigación y diligencias', amount: 1800000, paid: 900000 }
  ]
};

export const otherMatters = [
  { id: 'm2', code: 'CORP-2026-0035', title: 'Reorganización societaria Cordillera', area: 'Corporativo', client: 'Inversiones Cordillera SpA', owner: 'Tomás Fuentes', status: 'En curso' as MatterStatus, stage: 'Redacción de instrumentos', priority: 'Media' },
  { id: 'm3', code: 'CIV-2026-0028', title: 'Cobro contractual Mirador Sur', area: 'Civil', client: 'Constructora Mirador Sur Ltda.', owner: 'Catalina Herrera', status: 'En espera' as MatterStatus, stage: 'Negociación', priority: 'Media' },
  { id: 'm4', code: 'LAB-2026-0019', title: 'Consulta laboral ejecutiva', area: 'Laboral', client: 'Inversiones Cordillera SpA', owner: 'Tomás Fuentes', status: 'En evaluación' as MatterStatus, stage: 'Antecedentes iniciales', priority: 'Baja' }
];

export const matters = [penalCase, ...otherMatters];
export const allTasks = penalCase.tasks;
