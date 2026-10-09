import { useMemo, useState } from 'react';
import { allTasks, clients, matters, penalCase, team, type TaskKind } from './demoData';

type Page = 'dashboard' | 'clients' | 'matters' | 'agenda' | 'finance' | 'team';
type AgendaView = 'day' | 'week' | 'month' | 'list';
type CaseTab = 'summary' | 'history' | 'tasks' | 'documents' | 'fees';

const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
const dateFmt = new Intl.DateTimeFormat('es-CL', { weekday: 'short', day: '2-digit', month: 'short' });
const monthFmt = new Intl.DateTimeFormat('es-CL', { month: 'long', year: 'numeric' });

function mondayOf(date: Date) {
  const d = new Date(date);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}
function iso(date: Date) { return date.toISOString().slice(0, 10); }
function addDays(date: Date, days: number) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
function kindClass(kind: TaskKind) { return kind === 'Audiencia' ? 'purple' : kind === 'Vencimiento' ? 'gold' : 'blue'; }

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [selectedMatter, setSelectedMatter] = useState<any>(null);
  const [caseTab, setCaseTab] = useState<CaseTab>('summary');
  const [agendaView, setAgendaView] = useState<AgendaView>('week');
  const [agendaDate, setAgendaDate] = useState(new Date('2026-10-09T12:00:00'));
  const [ownerFilter, setOwnerFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('Pendientes');

  const visibleTasks = useMemo(() => allTasks.filter(t => {
    const ownerOk = ownerFilter === 'Todos' || t.owner === ownerFilter;
    const statusOk = statusFilter === 'Todas' || (statusFilter === 'Vencidas' ? t.status === 'Vencida' : t.status !== 'Completada');
    return ownerOk && statusOk;
  }), [ownerFilter, statusFilter]);

  function nav(target: Page) { setPage(target); setSelectedMatter(null); }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">J</div>
          <div><strong>JurisFlow</strong><span>Gestión jurídica</span></div>
        </div>
        <div className="workspace-chip"><span>EC</span><div><strong>Estudio Cordillera</strong><small>Demo · Chile</small></div></div>
        <nav>
          <Nav active={page==='dashboard'} label="Inicio" icon="⌂" onClick={()=>nav('dashboard')} />
          <Nav active={page==='clients'} label="Clientes" icon="◎" onClick={()=>nav('clients')} />
          <Nav active={page==='matters'} label="Expedientes" icon="▣" onClick={()=>nav('matters')} badge="4" />
          <Nav active={page==='agenda'} label="Agenda" icon="◫" onClick={()=>nav('agenda')} badge="1" />
          <div className="nav-section">Administración</div>
          <Nav active={page==='finance'} label="Honorarios" icon="$" onClick={()=>nav('finance')} />
          <Nav active={page==='team'} label="Equipo" icon="♙" onClick={()=>nav('team')} />
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">CH</div>
          <div><strong>Catalina Herrera</strong><span>Socia administradora</span></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search">⌕ <span>Buscar cliente, expediente, RIT o RUC...</span><kbd>⌘ K</kbd></div>
          <div className="top-actions"><button className="icon-btn">◇</button><button className="primary" onClick={()=>setSelectedMatter(penalCase)}>+ Nuevo expediente</button></div>
        </header>

        <div className="content">
          {selectedMatter ? (
            <CaseView matter={selectedMatter} tab={caseTab} setTab={setCaseTab} onBack={()=>setSelectedMatter(null)} />
          ) : page === 'dashboard' ? (
            <Dashboard openMatter={(m:any)=>setSelectedMatter(m)} goAgenda={()=>nav('agenda')} />
          ) : page === 'clients' ? (
            <Clients />
          ) : page === 'matters' ? (
            <Matters openMatter={(m:any)=>setSelectedMatter(m)} />
          ) : page === 'agenda' ? (
            <Agenda
              view={agendaView}
              setView={setAgendaView}
              date={agendaDate}
              setDate={setAgendaDate}
              ownerFilter={ownerFilter}
              setOwnerFilter={setOwnerFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              tasks={visibleTasks}
              openMatter={()=>setSelectedMatter(penalCase)}
            />
          ) : page === 'finance' ? (
            <Finance />
          ) : (
            <Team />
          )}
        </div>
      </main>
    </div>
  );
}

function Nav(props:{active:boolean;label:string;icon:string;badge?:string;onClick:()=>void}) {
  return <button className={'nav-item '+(props.active?'active':'')} onClick={props.onClick}><span className="nav-icon">{props.icon}</span><span>{props.label}</span>{props.badge&&<em>{props.badge}</em>}</button>;
}

function PageTitle({eyebrow,title,subtitle,actions}:{eyebrow?:string;title:string;subtitle:string;actions?:any}) {
  return <div className="page-title"><div><small>{eyebrow}</small><h1>{title}</h1><p>{subtitle}</p></div>{actions&&<div className="page-actions">{actions}</div>}</div>;
}

function Dashboard({openMatter,goAgenda}:{openMatter:(m:any)=>void;goAgenda:()=>void}) {
  return <>
    <PageTitle eyebrow="Viernes, 9 de octubre" title="Buenos días, Catalina" subtitle="Resumen operativo del estudio y asuntos que requieren atención." actions={<button className="secondary" onClick={goAgenda}>Ver agenda completa →</button>} />
    <div className="stats-grid">
      <Stat label="Expedientes activos" value="3" foot="+1 este mes" />
      <Stat label="Tareas pendientes" value="12" foot="1 vencida" warn />
      <Stat label="Próximas audiencias" value="2" foot="Próximos 20 días" />
      <Stat label="Saldo por cobrar" value="$900.000" foot="Caso penal demo" />
    </div>
    <div className="dash-grid">
      <section className="panel span2">
        <div className="panel-head"><div><small>PRIORIDAD</small><h2>Mi día</h2></div><span className="date-pill">09 OCT</span></div>
        <div className="timeline">
          {allTasks.slice(0,5).map(t=><button key={t.id} className="timeline-row" onClick={()=>openMatter(penalCase)}>
            <div className={'timeline-dot '+kindClass(t.kind)}></div><time>{t.time}</time><div className="timeline-main"><strong>{t.title}</strong><span>{penalCase.code} · {t.owner}</span></div><Badge text={t.kind} tone={kindClass(t.kind)} />
          </button>)}
        </div>
      </section>
      <section className="panel">
        <div className="panel-head"><div><small>CONTROL</small><h2>Atención requerida</h2></div></div>
        <div className="attention danger"><span>!</span><div><strong>1 tarea vencida</strong><p>Revisar respuesta a oficio bancario.</p></div></div>
        <div className="attention amber"><span>↗</span><div><strong>Audiencia próxima</strong><p>Revisión de cautelares · 14 oct.</p></div></div>
        <div className="attention"><span>$</span><div><strong>Saldo pendiente</strong><p>$900.000 en etapa de investigación.</p></div></div>
      </section>
      <section className="panel span3">
        <div className="panel-head"><div><small>CARTERA</small><h2>Expedientes recientes</h2></div><button className="link-btn">Ver todos</button></div>
        <div className="matter-table">
          {matters.map((m:any)=><button className="matter-row" key={m.id} onClick={()=>openMatter(m)}>
            <div><span className="code">{m.code}</span><strong>{m.title}</strong><small>{m.client}</small></div>
            <div><Badge text={m.area} tone="blue" /></div><div><span className="owner-dot">{m.owner.slice(0,1)}</span>{m.owner}</div><div><Badge text={m.status} tone={m.status==='En curso'?'green':m.status==='En evaluación'?'gold':'gray'} /></div><div className="arrow">→</div>
          </button>)}
        </div>
      </section>
    </div>
  </>;
}

function Stat({label,value,foot,warn}:{label:string;value:string;foot:string;warn?:boolean}) {
  return <div className="stat-card"><span>{label}</span><strong>{value}</strong><small className={warn?'warn':''}>{foot}</small></div>;
}

function Clients() {
  return <>
    <PageTitle eyebrow="CRM JURÍDICO" title="Clientes" subtitle="Personas y empresas relacionadas con el estudio." actions={<button className="primary">+ Nuevo cliente</button>} />
    <section className="panel"><div className="toolbar"><div className="input-like">⌕ Buscar clientes...</div><button className="filter-btn">Todos los estados ▾</button></div>
      <div className="data-table">
        <div className="data-head"><span>Cliente</span><span>RUT</span><span>Contacto</span><span>Relación</span><span>Asuntos</span></div>
        {clients.map(c=><div className="data-row" key={c.id}><div className="person"><span className="person-icon">{c.type==='Empresa'?'▦':'●'}</span><div><strong>{c.name}</strong><small>{c.type}</small></div></div><span>{c.rut}</span><div><strong>{c.email}</strong><small>{c.phone}</small></div><Badge text={c.status} tone={c.status==='Cliente'?'green':'gold'} /><strong>{c.matters}</strong></div>)}
      </div>
    </section>
  </>;
}

function Matters({openMatter}:{openMatter:(m:any)=>void}) {
  return <>
    <PageTitle eyebrow="GESTIÓN DE ASUNTOS" title="Expedientes" subtitle="Vista general de asuntos judiciales y extrajudiciales." actions={<button className="primary">+ Nuevo expediente</button>} />
    <div className="kanban">
      {['En evaluación','En curso','En espera'].map(status=><section className="kanban-col" key={status}><div className="kanban-head"><strong>{status}</strong><span>{matters.filter((m:any)=>m.status===status).length}</span></div>
        {matters.filter((m:any)=>m.status===status).map((m:any)=><button className="matter-card" key={m.id} onClick={()=>openMatter(m)}><div className="matter-card-top"><span className="code">{m.code}</span><Badge text={m.priority} tone={m.priority==='Alta'?'red':m.priority==='Media'?'gold':'gray'} /></div><h3>{m.title}</h3><p>{m.client}</p><div className="matter-card-foot"><span>{m.stage}</span><span className="owner-avatar">{m.owner.slice(0,2).toUpperCase()}</span></div></button>)}
      </section>)}
    </div>
  </>;
}

function Agenda(props:any) {
  const {view,setView,date,setDate,ownerFilter,setOwnerFilter,statusFilter,setStatusFilter,tasks,openMatter}=props;
  const start = mondayOf(date);
  const days = Array.from({length:7},(_,i)=>addDays(start,i));
  const dayKey = iso(date);
  const monthStart = new Date(date.getFullYear(),date.getMonth(),1);
  const monthGridStart = mondayOf(monthStart);
  const monthDays = Array.from({length:42},(_,i)=>addDays(monthGridStart,i));
  const shift = (dir:number) => setDate(addDays(date, view==='day'?dir:view==='week'?dir*7:view==='month'?dir*30:dir*7));
  return <>
    <PageTitle eyebrow="AGENDA DEL ESTUDIO" title="Agenda" subtitle="Audiencias, vencimientos y tareas del equipo." actions={<button className="primary">+ Nueva actividad</button>} />
    <div className="agenda-top panel">
      <div className="agenda-nav"><button onClick={()=>shift(-1)}>‹</button><button className="today" onClick={()=>setDate(new Date('2026-10-09T12:00:00'))}>Hoy</button><button onClick={()=>shift(1)}>›</button><strong>{view==='month'?monthFmt.format(date):view==='day'?dateFmt.format(date):dateFmt.format(start)+' — '+dateFmt.format(days[6])}</strong></div>
      <div className="view-switch">{(['day','week','month','list'] as AgendaView[]).map(v=><button key={v} className={view===v?'active':''} onClick={()=>setView(v)}>{v==='day'?'Día':v==='week'?'Semana':v==='month'?'Mes':'Lista'}</button>)}</div>
      <div className="agenda-filters"><select value={ownerFilter} onChange={e=>setOwnerFilter(e.target.value)}><option>Todos</option>{team.slice(0,3).map(u=><option key={u.id}>{u.name}</option>)}</select><select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option>Pendientes</option><option>Vencidas</option><option>Todas</option></select></div>
    </div>
    <div className="agenda-stats"><MiniStat label="Hoy" value={String(tasks.filter((t:any)=>t.date===dayKey).length)} /><MiniStat label="Vencidas" value={String(tasks.filter((t:any)=>t.status==='Vencida').length)} warn /><MiniStat label="Audiencias · 30 días" value={String(tasks.filter((t:any)=>t.kind==='Audiencia').length)} /></div>
    {view==='day'&&<DayView date={date} tasks={tasks} openMatter={openMatter} />}
    {view==='week'&&<WeekView days={days} tasks={tasks} openMatter={openMatter} />}
    {view==='month'&&<MonthView days={monthDays} month={date.getMonth()} tasks={tasks} setDate={setDate} openMatter={openMatter} />}
    {view==='list'&&<ListView tasks={tasks} openMatter={openMatter} />}
  </>;
}

function MiniStat({label,value,warn}:{label:string;value:string;warn?:boolean}) { return <div className={'mini-stat '+(warn?'warnbox':'')}><span>{label}</span><strong>{value}</strong></div>; }

function EventCard({task,compact,openMatter}:{task:any;compact?:boolean;openMatter:()=>void}) {
  return <button className={'event-card '+kindClass(task.kind)+(task.status==='Vencida'?' overdue':'')+(compact?' compact':'')} onClick={openMatter}><span className="event-time">{task.time}</span><strong>{task.title}</strong>{!compact&&<small>{task.owner} · {task.kind}</small>}</button>;
}

function DayView({date,tasks,openMatter}:{date:Date;tasks:any[];openMatter:()=>void}) {
  const key=iso(date); const today=tasks.filter(t=>t.date===key);
  return <section className="panel day-view"><div className="day-label"><span>{dateFmt.format(date)}</span><strong>{date.getDate()}</strong></div><div className="day-line">{today.length?today.map(t=><EventCard key={t.id} task={t} openMatter={openMatter}/>):<div className="empty-state">No hay actividades para este día.</div>}</div></section>;
}

function WeekView({days,tasks,openMatter}:{days:Date[];tasks:any[];openMatter:()=>void}) {
  return <section className="week-grid">{days.map(d=><div className={'week-day '+(iso(d)==='2026-10-09'?'current':'')} key={iso(d)}><div className="week-day-head"><span>{dateFmt.format(d).split(' ')[0]}</span><strong>{d.getDate()}</strong></div><div className="week-events">{tasks.filter(t=>t.date===iso(d)).map(t=><EventCard key={t.id} task={t} compact openMatter={openMatter}/>)}</div></div>)}</section>;
}

function MonthView({days,month,tasks,setDate,openMatter}:{days:Date[];month:number;tasks:any[];setDate:(d:Date)=>void;openMatter:()=>void}) {
  return <section className="month-grid">{['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d=><div className="month-name" key={d}>{d}</div>)}{days.map(d=><div className={'month-day '+(d.getMonth()!==month?'muted':'')+(iso(d)==='2026-10-09'?' current':'')} key={iso(d)} onDoubleClick={()=>setDate(d)}><div className="month-num">{d.getDate()}</div>{tasks.filter(t=>t.date===iso(d)).slice(0,3).map(t=><button key={t.id} className={'month-event '+kindClass(t.kind)} onClick={openMatter}><span>{t.time}</span> {t.title}</button>)}</div>)}</section>;
}

function ListView({tasks,openMatter}:{tasks:any[];openMatter:()=>void}) {
  return <section className="panel"><div className="agenda-list">{[...tasks].sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).map(t=><button className="agenda-list-row" key={t.id} onClick={openMatter}><div className="list-date"><strong>{t.date.slice(8,10)}</strong><span>{t.date.slice(5,7)}</span></div><Badge text={t.kind} tone={kindClass(t.kind)} /><div><strong>{t.title}</strong><small>{penalCase.code} · {t.owner}</small></div><Badge text={t.status} tone={t.status==='Vencida'?'red':t.status==='En proceso'?'gold':'gray'} /><span>{t.time}</span></button>)}</div></section>;
}

function CaseView({matter,tab,setTab,onBack}:{matter:any;tab:CaseTab;setTab:(t:CaseTab)=>void;onBack:()=>void}) {
  const isPenal=matter.id===penalCase.id;
  const m=isPenal?penalCase:matter;
  return <div className="case-view">
    <button className="back" onClick={onBack}>← Volver a expedientes</button>
    <div className="case-hero">
      <div><div className="case-kicker"><span className="code light">{m.code}</span><Badge text={m.status} tone="green" /><Badge text={m.area} tone="blue" /></div><h1>{m.title}</h1><p>{m.client} · Responsable: {m.owner}</p></div>
      <div className="case-hero-actions"><button className="secondary">Compartir acceso</button><button className="primary">+ Registrar actuación</button></div>
    </div>
    {isPenal&&<div className="case-meta"><div><span>Etapa</span><strong>{m.stage}</strong></div><div><span>Tribunal</span><strong>{m.court}</strong></div><div><span>RIT</span><strong>{m.rit}</strong></div><div><span>RUC</span><strong>{m.ruc}</strong></div></div>}
    <div className="case-tabs">{(['summary','history','tasks','documents','fees'] as CaseTab[]).map(t=><button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t==='summary'?'Resumen':t==='history'?'Historial':t==='tasks'?'Tareas y plazos':t==='documents'?'Documentos':'Honorarios'}</button>)}</div>
    {!isPenal?<section className="panel"><h2>{m.title}</h2><p>Este expediente secundario se incluye para mostrar la cartera. El caso penal contiene el detalle completo del MVP.</p></section>:
      tab==='summary'?<CaseSummary/>:tab==='history'?<CaseHistory/>:tab==='tasks'?<CaseTasks/>:tab==='documents'?<CaseDocuments/>:<CaseFees/>
    }
  </div>;
}

function CaseSummary() {
  return <div className="case-grid"><section className="panel span2"><div className="panel-head"><div><small>CONTEXTO</small><h2>Resumen del asunto</h2></div></div><p className="lead">{penalCase.summary}</p><div className="summary-block"><h3>Intervinientes</h3>{penalCase.parties.map(p=><div className="party" key={p.role}><span>{p.role}</span><strong>{p.name}</strong></div>)}</div></section><section className="panel"><div className="panel-head"><div><small>EQUIPO</small><h2>Responsables</h2></div></div>{team.slice(0,3).map(u=><div className="team-mini" key={u.id}><span className="avatar small">{u.initials}</span><div><strong>{u.name}</strong><small>{u.role}</small></div></div>)}<hr/><div className="summary-block"><h3>Próximos hitos</h3>{penalCase.tasks.filter(t=>t.status!=='Vencida').slice(0,4).map(t=><div className="next-item" key={t.id}><span>{t.date.slice(8,10)}</span><div><strong>{t.title}</strong><small>{t.date} · {t.time}</small></div></div>)}</div></section></div>;
}

function CaseHistory() {
  return <section className="panel"><div className="panel-head"><div><small>TRAZABILIDAD</small><h2>Historial jurídico</h2></div><button className="primary">+ Registrar actuación</button></div><div className="history">{penalCase.history.slice().reverse().map((h,i)=><div className="history-item" key={i}><div className="history-marker"></div><div className="history-date">{h.date}</div><div className="history-body"><div><Badge text={h.type} tone="gray" /></div><h3>{h.title}</h3><p>{h.detail}</p></div></div>)}</div></section>;
}

function CaseTasks() {
  return <section className="panel"><div className="panel-head"><div><small>CONTROL DE PLAZOS</small><h2>Tareas, audiencias y vencimientos</h2></div><button className="primary">+ Nueva tarea</button></div><div className="task-table"><div className="task-head"><span>Actividad</span><span>Tipo</span><span>Responsable</span><span>Fecha</span><span>Estado</span></div>{penalCase.tasks.map(t=><div className="task-row" key={t.id}><div><strong>{t.title}</strong><small>Prioridad {t.priority}</small></div><Badge text={t.kind} tone={kindClass(t.kind)} /><span>{t.owner}</span><span>{t.date}<small>{t.time}</small></span><Badge text={t.status} tone={t.status==='Vencida'?'red':t.status==='En proceso'?'gold':'gray'} /></div>)}</div></section>;
}

function CaseDocuments() {
  return <section className="panel"><div className="panel-head"><div><small>CARPETA DIGITAL</small><h2>Documentos</h2></div><button className="primary">+ Subir documento</button></div><div className="documents">{penalCase.documents.map(d=><div className="doc-row" key={d.name}><div className="doc-icon">{d.name.endsWith('.pdf')?'PDF':d.name.endsWith('.docx')?'DOC':d.name.endsWith('.xlsx')?'XLS':'ZIP'}</div><div><strong>{d.name}</strong><small>{d.category} · {d.owner}</small></div><span>{d.date}</span><button>⋯</button></div>)}</div></section>;
}

function CaseFees() {
  const total=penalCase.fees.reduce((s,x)=>s+x.amount,0), paid=penalCase.fees.reduce((s,x)=>s+x.paid,0);
  return <div className="case-grid"><section className="panel span2"><div className="panel-head"><div><small>HONORARIOS</small><h2>Cargos del expediente</h2></div><button className="primary">+ Registrar abono</button></div>{penalCase.fees.map((f,i)=><div className="fee-row" key={i}><div><strong>{f.concept}</strong><small>Pagado {CLP.format(f.paid)}</small></div><strong>{CLP.format(f.amount)}</strong><Badge text={f.paid===f.amount?'Pagado':'Parcial'} tone={f.paid===f.amount?'green':'gold'} /></div>)}</section><section className="panel finance-summary"><span>Total contratado</span><strong>{CLP.format(total)}</strong><span>Pagado</span><strong>{CLP.format(paid)}</strong><span>Saldo pendiente</span><strong className="balance">{CLP.format(total-paid)}</strong></section></div>;
}

function Finance() {
  return <><PageTitle eyebrow="ADMINISTRACIÓN" title="Honorarios" subtitle="Cargos, abonos y saldos por expediente." actions={<button className="primary">+ Nuevo cargo</button>} /><div className="stats-grid three"><Stat label="Facturado / cargos" value="$3.000.000" foot="Caso penal demo"/><Stat label="Abonado" value="$2.100.000" foot="70% cobrado"/><Stat label="Pendiente" value="$900.000" foot="1 saldo abierto" warn/></div><CaseFees/></>;
}

function Team() {
  return <><PageTitle eyebrow="CONFIGURACIÓN" title="Equipo y accesos" subtitle="Usuarios internos y rol operativo." actions={<button className="primary">+ Invitar integrante</button>} /><section className="panel team-grid">{team.map(u=><div className="team-card" key={u.id}><span className="avatar">{u.initials}</span><div><strong>{u.name}</strong><small>{u.role}</small></div><Badge text="Activo" tone="green"/></div>)}</section></>;
}

function Badge({text,tone}:{text:string;tone:string}) { return <span className={'badge '+tone}>{text}</span>; }
