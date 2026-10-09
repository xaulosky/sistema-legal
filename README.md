# Sistema Legal · JurisFlow MVP

MVP para gestión de estudios jurídicos construido con **React + TypeScript + Vite**, **Express**, **Prisma ORM** y **PostgreSQL**.

## Qué incluye

- Dashboard ejecutivo.
- Gestión visual de clientes.
- Expedientes judiciales y extrajudiciales.
- Agenda con vistas **Día / Semana / Mes / Lista**.
- Filtros por profesional y estado.
- Ficha completa de expediente.
- Historial jurídico.
- Tareas, audiencias y vencimientos.
- Documentos.
- Honorarios y abonos.
- Modelo de roles y datos preparado en Prisma.
- Caso penal ficticio completo: **PEN-2026-0041 · Defensa penal · Caso Proyecto Los Maitenes**.

> Todos los datos, RIT, RUC, nombres, instituciones, fechas y actuaciones de la demo son ficticios y existen únicamente para demostrar el producto.

## Levantar el proyecto

```bash
cp .env.example .env
npm install

docker compose up -d
npm run db:generate
npm run db:push
npm run db:seed

npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3001
- PostgreSQL: localhost:5432

## Arquitectura

```text
React / Vite
     │
     ├── Dashboard
     ├── Clientes
     ├── Expedientes
     ├── Agenda
     ├── Honorarios
     └── Equipo
     │
Express API
     │
Prisma ORM
     │
PostgreSQL
```

## Caso penal demo

El expediente principal incluye:

- cliente e intervinientes;
- etapa procesal, tribunal, RIT y RUC ficticios;
- 17 actuaciones de historial;
- 14 tareas y plazos en la UI;
- audiencias;
- 11 referencias documentales;
- honorarios por etapas y saldo;
- responsables asignados.

La UI usa datos demo locales para que pueda presentarse inmediatamente. El esquema Prisma, seed y API están incluidos para continuar la conexión con persistencia real.

## Próximas etapas

1. Conectar todas las pantallas del frontend con la API.
2. Autenticación y sesiones.
3. RBAC y acceso por expediente.
4. Auditoría de operaciones.
5. Storage privado para documentos.
6. Flujo de conflictos de interés.
7. Notificaciones y sincronización de calendario.
8. Portal de clientes.
9. Integraciones judiciales evaluadas por separado.
10. Despliegue productivo con backups, monitoreo y HTTPS.

## Estado

Esta versión es un **MVP demostrativo**, no un sistema listo para manejar expedientes reales sin completar seguridad, autenticación, privacidad, respaldo y validación jurídica/operativa.
