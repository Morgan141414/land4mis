import { FormEvent, useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  DatabaseZap,
  FileCheck2,
  FileSpreadsheet,
  Gauge,
  HeartPulse,
  Languages,
  LockKeyhole,
  Menu,
  MessageCircle,
  Mail,
  Phone,
  Send,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  TimerReset,
  UserRoundX,
  UsersRound,
  Volume2,
  WalletCards,
  X,
} from 'lucide-react';

type Locale = 'ru' | 'kk';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

type Copy = {
  nav: string[];
  ctaDemo: string;
  ctaLogin: string;
  heroTitle: string;
  heroLead: string;
  heroMicro: string;
  loginTitle: string;
  loginLead: string;
  username: string;
  password: string;
  remember: string;
  forgot: string;
  loginButton: string;
  problemTitle: string;
  problemLead: string;
  solutionTitle: string;
  solutionLead: string;
  productTitle: string;
  productLead: string;
  journeyTitle: string;
  journeyLead: string;
  rolesTitle: string;
  rolesLead: string;
  rolloutTitle: string;
  rolloutLead: string;
  trustTitle: string;
  trustLead: string;
  finalTitle: string;
  finalLead: string;
  formTitle: string;
  formName: string;
  formPhone: string;
  formClinic: string;
  formCity: string;
  formScale: string;
  formEmail: string;
  formComment: string;
  formSubmit: string;
  formSuccess: string;
  formSending: string;
  formError: string;
  loginNotice: string;
};

const COPY: Record<Locale, Copy> = {
  ru: {
    nav: ['Проблемы', 'Решение', 'Безопасность', 'Контакты'],
    ctaDemo: 'Запросить демо',
    ctaLogin: 'Войти',
    heroTitle: 'QorMed - система управления клиникой',
    heroLead:
      'Пациент, прием, оплата, документы, врач и KPI проходят через один цифровой контур. Руководитель видит клинику как систему, а не набор таблиц.',
    heroMicro: 'Разработано в Казахстане. Для клиник любого масштаба.',
    loginTitle: 'Вход в систему',
    loginLead: 'Для сотрудников клиники и руководителей',
    username: 'Логин или ИИН',
    password: 'Пароль',
    remember: 'Запомнить меня',
    forgot: 'Восстановить доступ',
    loginButton: 'Войти в систему',
    problemTitle: 'Знакомые проблемы?',
    problemLead:
      'QorMed убирает операционный шум, из-за которого клиника теряет время, данные и управляемость.',
    solutionTitle: 'Все процессы клиники - в одном окне',
    solutionLead:
      'От приема пациента до управленческого отчета: QorMed собирает ключевые процессы в понятную цифровую систему.',
    productTitle: 'Продуктовый контур, который видно с первого экрана',
    productLead:
      'Вместо сырой фотографии брошюры лендинг показывает аккуратные интерфейсные сцены: пациент, запись, оплата и управленческий контроль.',
    journeyTitle: 'Один путь пациента вместо десятков ручных действий',
    journeyLead:
      'QorMed показывает клинику как процесс: запись создает событие, врач ведет карту, оплата закрывает визит, а руководитель видит отчет.',
    rolesTitle: 'Разные роли, один источник правды',
    rolesLead:
      'Владелец, администратор и врач работают в своем интерфейсе, но все данные остаются в единой системе.',
    rolloutTitle: 'Внедрение без операционного шока',
    rolloutLead:
      'Лендинг уже готов говорить о подключении: этапы, перенос данных, обучение и сопровождение после запуска.',
    trustTitle: 'Надежность для медицинской инфраструктуры',
    trustLead:
      'Система создана под реальные требования клиник: безопасность, масштабирование, контроль доступа и документооборот.',
    finalTitle: 'Подключите клинику к QorMed',
    finalLead:
      'Покажем, как перевести расписание, пациентов, финансы и аналитику в единый цифровой контур.',
    formTitle: 'Заявка на демо',
    formName: 'Ваше имя',
    formPhone: 'Телефон',
    formClinic: 'Название клиники',
    formCity: 'Город',
    formScale: 'Сколько врачей или филиалов?',
    formEmail: 'Рабочая почта',
    formComment: 'Что хотите автоматизировать первым?',
    formSubmit: 'Отправить заявку',
    formSuccess: 'Заявка сохранена. Мы свяжемся с вами.',
    formSending: 'Отправляем...',
    formError: 'Не удалось отправить автоматически. Открываем письмо для отдела продаж.',
    loginNotice: 'Если рабочий endpoint не задан, кнопка ведет на текущую MIS-страницу.',
  },
  kk: {
    nav: ['Мәселелер', 'Шешім', 'Қауіпсіздік', 'Байланыс'],
    ctaDemo: 'Демо сұрау',
    ctaLogin: 'Кіру',
    heroTitle: 'QorMed - клиниканы басқару жүйесі',
    heroLead:
      'Пациент, қабылдау, төлем, құжаттар, дәрігер және KPI бір цифрлық контурдан өтеді. Басшы клиниканы бөлек кесте емес, жүйе ретінде көреді.',
    heroMicro: 'Қазақстанда жасалған. Әр түрлі көлемдегі клиникаларға арналған.',
    loginTitle: 'Жүйеге кіру',
    loginLead: 'Клиника қызметкерлері мен басшылары үшін',
    username: 'Логин немесе ЖСН',
    password: 'Құпиясөз',
    remember: 'Мені есте сақтау',
    forgot: 'Қолжетімділікті қалпына келтіру',
    loginButton: 'Жүйеге кіру',
    problemTitle: 'Таныс мәселелер ме?',
    problemLead:
      'QorMed клиниканың уақытын, деректерін және басқарылуын жоғалтатын операциялық шуды азайтады.',
    solutionTitle: 'Клиниканың барлық процесі - бір терезеде',
    solutionLead:
      'Пациентті қабылдаудан басқарушылық есепке дейін: QorMed негізгі процестерді түсінікті цифрлық жүйеге біріктіреді.',
    productTitle: 'Бірінші экраннан көрінетін өнім контуры',
    productLead:
      'Брошюра фотосының орнына лендинг пациент, жазылу, төлем және басқару бақылауын көрсететін таза интерфейс көріністерін береді.',
    journeyTitle: 'Ондаған қол әрекетінің орнына пациенттің бір жолы',
    journeyLead:
      'QorMed клиниканы процесс ретінде көрсетеді: жазылу оқиға жасайды, дәрігер карта жүргізеді, төлем визитті жабады, басшы есепті көреді.',
    rolesTitle: 'Әр рөлге өз интерфейсі, дерек көзі біреу',
    rolesLead:
      'Иесі, әкімші және дәрігер өз жұмысына ыңғайлы экранда жұмыс істейді, ал деректер бір жүйеде қалады.',
    rolloutTitle: 'Енгізу операциялық күйзеліссіз',
    rolloutLead:
      'Лендинг қосылу туралы нақты сөйлейді: кезеңдер, деректерді көшіру, оқыту және іске қосылғаннан кейін қолдау.',
    trustTitle: 'Медициналық инфрақұрылымға арналған сенімділік',
    trustLead:
      'Жүйе клиникалардың нақты талаптарына сай жасалған: қауіпсіздік, масштабтау, қолжетімділікті бақылау және құжат айналымы.',
    finalTitle: 'Клиникаңызды QorMed жүйесіне қосыңыз',
    finalLead:
      'Кестені, пациенттерді, қаржыны және аналитиканы бір цифрлық контурға қалай көшіруге болатынын көрсетеміз.',
    formTitle: 'Демоға өтінім',
    formName: 'Атыңыз',
    formPhone: 'Телефон',
    formClinic: 'Клиника атауы',
    formCity: 'Қала',
    formScale: 'Қанша дәрігер немесе филиал?',
    formEmail: 'Жұмыс поштасы',
    formComment: 'Алдымен нені автоматтандырғыңыз келеді?',
    formSubmit: 'Өтінім жіберу',
    formSuccess: 'Өтінім сақталды. Біз сізбен хабарласамыз.',
    formSending: 'Жіберілуде...',
    formError: 'Автоматты түрде жіберу мүмкін болмады. Сату бөліміне хат ашамыз.',
    loginNotice: 'Жұмыс endpoint көрсетілмесе, батырма ағымдағы MIS бетіне апарады.',
  },
};

const LOGIN_URL = import.meta.env.VITE_QORMED_LOGIN_URL || 'https://mis.qormed.kz/auth';
const DEMO_ENDPOINT = import.meta.env.VITE_QORMED_DEMO_ENDPOINT;
const SALES_EMAIL = import.meta.env.VITE_QORMED_SALES_EMAIL || 'vandalsavageaaa@gmail.com';

const problems = [
  { icon: FileSpreadsheet, ru: 'Устаревший учет в Excel', kk: 'Excel-дегі ескі есеп' },
  { icon: UserRoundX, ru: 'Потерянные карточки пациентов', kk: 'Жоғалған пациент карталары' },
  { icon: FileCheck2, ru: 'Долгие ручные отчеты', kk: 'Ұзақ қолмен жасалатын есептер' },
  { icon: Gauge, ru: 'Нет аналитики и контроля врачей', kk: 'Дәрігерлерді бақылау және аналитика жоқ' },
];

const solutions = [
  { icon: CalendarDays, ru: 'Календарь приемов', kk: 'Қабылдау күнтізбесі' },
  { icon: HeartPulse, ru: 'Электронная карта пациента', kk: 'Пациенттің электронды картасы' },
  { icon: WalletCards, ru: 'Управление оплатами и счетами', kk: 'Төлемдер мен шоттарды басқару' },
  { icon: BarChart3, ru: 'Отчеты и аналитика', kk: 'Есептер және аналитика' },
  { icon: Activity, ru: 'Автоматизация приема и записи', kk: 'Қабылдау мен жазылуды автоматтандыру' },
  { icon: UsersRound, ru: 'KPI сотрудников', kk: 'Қызметкерлер KPI' },
];

const trust = [
  { icon: LockKeyhole, ru: 'Данные хранятся в защищенном дата-центре', kk: 'Деректер қорғалған дата-орталықта сақталады' },
  { icon: DatabaseZap, ru: 'Масштабируется под сеть клиник', kk: 'Клиникалар желісіне дейін масштабталады' },
  { icon: ShieldCheck, ru: 'Работа по стандартам МЗ РК', kk: 'ҚР ДСМ стандарттарына сай жұмыс' },
  { icon: Smartphone, ru: 'Мобильное приложение для руководителя', kk: 'Басшыға арналған мобильді қосымша' },
];

const productScreens = [
  {
    icon: HeartPulse,
    ru: 'Карта пациента',
    kk: 'Пациент картасы',
    metric: '360°',
    rows: ['История визитов', 'Диагноз и назначения', 'Результаты обследований'],
  },
  {
    icon: CalendarDays,
    ru: 'Календарь приемов',
    kk: 'Қабылдау күнтізбесі',
    metric: '09:30',
    rows: ['График врачей', 'Кабинеты и услуги', 'Автозапись пациента'],
  },
  {
    icon: WalletCards,
    ru: 'Оплаты и счета',
    kk: 'Төлемдер мен шоттар',
    metric: '₸',
    rows: ['Счет за визит', 'Статус оплаты', 'Финансовая сводка'],
  },
];

const journey = [
  {
    icon: CalendarDays,
    ru: 'Пациент записывается на прием',
    kk: 'Пациент қабылдауға жазылады',
    detailRu: 'Календарь сразу учитывает врача, кабинет и услугу.',
    detailKk: 'Күнтізбе дәрігерді, кабинетті және қызметті бірден ескереді.',
  },
  {
    icon: HeartPulse,
    ru: 'Врач ведет электронную карту',
    kk: 'Дәрігер электронды картаны жүргізеді',
    detailRu: 'История, протокол, назначения и результаты остаются в одном месте.',
    detailKk: 'Тарих, хаттама, тағайындаулар және нәтижелер бір жерде қалады.',
  },
  {
    icon: WalletCards,
    ru: 'Администратор закрывает оплату',
    kk: 'Әкімші төлемді жабады',
    detailRu: 'Счета и оплаты связаны с визитом, пациентом и отчетностью.',
    detailKk: 'Шоттар мен төлемдер визитпен, пациентпен және есеппен байланысты.',
  },
  {
    icon: BarChart3,
    ru: 'Руководитель видит KPI',
    kk: 'Басшы KPI көреді',
    detailRu: 'Отчеты собираются из реальных действий команды, а не вручную.',
    detailKk: 'Есептер қолмен емес, команданың нақты әрекеттерінен жиналады.',
  },
];

const rolePanels = [
  {
    icon: Gauge,
    ru: 'Владелец клиники',
    kk: 'Клиника иесі',
    metric: '+контроль',
    pointsRu: ['выручка и загрузка', 'KPI врачей', 'филиальная сеть'],
    pointsKk: ['табыс және жүктеме', 'дәрігер KPI', 'филиалдар желісі'],
  },
  {
    icon: UsersRound,
    ru: 'Администратор',
    kk: 'Әкімші',
    metric: '-рутина',
    pointsRu: ['запись и переносы', 'оплаты и счета', 'единая база пациентов'],
    pointsKk: ['жазылу және ауыстыру', 'төлемдер мен шоттар', 'пациенттердің бір базасы'],
  },
  {
    icon: Stethoscope,
    ru: 'Врач',
    kk: 'Дәрігер',
    metric: '+фокус',
    pointsRu: ['карта пациента', 'протокол приема', 'история обследований'],
    pointsKk: ['пациент картасы', 'қабылдау хаттамасы', 'тексеру тарихы'],
  },
];

const rollout = [
  { ru: 'Аудит процессов', kk: 'Процестер аудиті' },
  { ru: 'Настройка ролей', kk: 'Рөлдерді баптау' },
  { ru: 'Перенос данных', kk: 'Деректерді көшіру' },
  { ru: 'Обучение команды', kk: 'Команданы оқыту' },
];

const proof = [
  { ru: 'единое окно', kk: 'бір терезе', value: '1' },
  { ru: 'ключевых модулей', kk: 'негізгі модуль', value: '6' },
  { ru: 'для сети клиник', kk: 'клиника желісіне', value: '∞' },
];

function QorMedLogo() {
  return (
    <div className="brand" aria-label="QorMed">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M12 8h18c5.5 0 10 4.5 10 10v18H22c-5.5 0-10-4.5-10-10V8Z" />
        <path d="M21 16h9c1.1 0 2 .9 2 2v10h-9c-1.1 0-2-.9-2-2V16Z" />
        <path d="M8 26h8v8H8z" />
      </svg>
      <span>QorMed</span>
      <small>информационная система</small>
    </div>
  );
}

function HeroScene({ locale }: { locale: Locale }) {
  const labels = locale === 'ru'
    ? ['Карта пациента', 'Календарь', 'Оплаты', 'KPI']
    : ['Пациент картасы', 'Күнтізбе', 'Төлемдер', 'KPI'];

  return (
    <div className="hero-scene" aria-label="QorMed product visualization">
      <div className="scene-glow" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="product-console">
        <div className="console-topbar">
          <span />
          <span />
          <span />
          <strong>QorMed Control</strong>
        </div>
        <div className="console-grid">
          <div className="patient-card">
            <HeartPulse size={18} />
            <div>
              <b>{locale === 'ru' ? 'Пациент' : 'Пациент'}</b>
              <small>ID 2048 / {locale === 'ru' ? 'прием сегодня' : 'бүгін қабылдау'}</small>
            </div>
          </div>
          <div className="schedule-card">
            <CalendarDays size={18} />
            <span>09:30</span>
            <span>10:15</span>
            <span>11:00</span>
          </div>
          <div className="chart-card">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="command-strip">
        <span>{locale === 'ru' ? 'Пациент принят' : 'Пациент қабылданды'}</span>
        <span>{locale === 'ru' ? 'Оплата закрыта' : 'Төлем жабылды'}</span>
        <span>KPI +18%</span>
      </div>
      <div className="clinic-core">
        <div className="core-ring" />
        <Stethoscope size={56} strokeWidth={1.4} />
        <span>QorMed MIS</span>
      </div>
      {labels.map((label, index) => (
        <div className={`float-panel float-panel-${index + 1}`} key={label}>
          <div className="panel-icon">
            {index === 0 && <HeartPulse size={18} />}
            {index === 1 && <CalendarDays size={18} />}
            {index === 2 && <WalletCards size={18} />}
            {index === 3 && <BarChart3 size={18} />}
          </div>
          <div>
            <strong>{label}</strong>
            <span>{index === 3 ? '+24%' : 'online'}</span>
          </div>
        </div>
      ))}
      <div className="data-line data-line-a" />
      <div className="data-line data-line-b" />
    </div>
  );
}

function FlowMap({ locale }: { locale: Locale }) {
  return (
    <section className="journey" aria-labelledby="journey-title">
      <div className="journey-copy">
        <h2 id="journey-title">{COPY[locale].journeyTitle}</h2>
        <p>{COPY[locale].journeyLead}</p>
      </div>
      <div className="journey-rail">
        {journey.map((item, index) => (
          <article className="journey-step" key={item.ru}>
            <div className="journey-number">{index + 1}</div>
            <div className="journey-icon">
              <item.icon size={24} />
            </div>
            <h3>{locale === 'ru' ? item.ru : item.kk}</h3>
            <p>{locale === 'ru' ? item.detailRu : item.detailKk}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RoleMatrix({ locale }: { locale: Locale }) {
  return (
    <section className="roles" aria-labelledby="roles-title">
      <div className="section-heading">
        <h2 id="roles-title">{COPY[locale].rolesTitle}</h2>
        <p>{COPY[locale].rolesLead}</p>
      </div>
      <div className="role-grid">
        {rolePanels.map((role) => (
          <article className="role-card" key={role.ru}>
            <div className="role-card-top">
              <div className="role-icon"><role.icon size={24} /></div>
              <strong>{role.metric}</strong>
            </div>
            <h3>{locale === 'ru' ? role.ru : role.kk}</h3>
            <ul>
              {(locale === 'ru' ? role.pointsRu : role.pointsKk).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function trackEvent(name: string, params: Record<string, string> = {}) {
  window.dispatchEvent(new CustomEvent('qormed:analytics', { detail: { name, ...params } }));
  if (import.meta.env.DEV) {
    console.info('[QorMed analytics]', name, params);
  }
}

function buildLeadBody(form: HTMLFormElement, locale: Locale) {
  const data = new FormData(form);
  const labels = locale === 'ru'
    ? ['Новая заявка QorMed', 'Имя', 'Телефон', 'Клиника', 'Почта', 'Комментарий']
    : ['QorMed жаңа өтінімі', 'Аты', 'Телефон', 'Клиника', 'Пошта', 'Пікір'];

  return [
    labels[0],
    `${labels[1]}: ${data.get('name')}`,
    `${labels[2]}: ${data.get('phone')}`,
    `${labels[3]}: ${data.get('clinic')}`,
    `${locale === 'ru' ? 'Город' : 'Қала'}: ${data.get('city')}`,
    `${locale === 'ru' ? 'Масштаб' : 'Көлемі'}: ${data.get('scale')}`,
    `${labels[4]}: ${data.get('email')}`,
    `${labels[5]}: ${data.get('comment') || '-'}`,
  ].join('\n');
}

function openLeadEmail(body: string) {
  const subject = encodeURIComponent('QorMed demo request');
  const encodedBody = encodeURIComponent(body);
  window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${encodedBody}`;
}

function App() {
  const [locale, setLocale] = useState<Locale>('ru');
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoStatus, setDemoStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const c = COPY[locale];

  const localizedPipeline = useMemo(
    () => locale === 'ru' ? ['Пациент', 'Прием', 'Оплата', 'Отчет'] : ['Пациент', 'Қабылдау', 'Төлем', 'Есеп'],
    [locale],
  );

  async function handleDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    playSoftClick();
    const form = event.currentTarget;
    const body = buildLeadBody(form, locale);
    setDemoStatus('sending');
    trackEvent('demo_submit', { locale });

    try {
      if (DEMO_ENDPOINT) {
        const response = await fetch(DEMO_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        if (!response.ok) throw new Error(`Demo endpoint returned ${response.status}`);
      } else {
        localStorage.setItem('qormed:lastLead', body);
        openLeadEmail(body);
      }
      form.reset();
      setDemoStatus('sent');
      window.setTimeout(() => setDemoStatus('idle'), 4200);
    } catch (error) {
      console.error(error);
      setDemoStatus('error');
      openLeadEmail(body);
    }
  }

  function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    playSoftClick();
    trackEvent('login_redirect', { locale });
    window.location.assign(LOGIN_URL);
  }

  function playSoftClick() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = new AudioCtx();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(620, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1);
  }

  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="logo-link" href="#top">
          <QorMedLogo />
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          {c.nav.map((item, index) => (
            <a key={item} href={['#problems', '#solution', '#trust', '#contact'][index]} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="lang-toggle" type="button" onClick={() => { playSoftClick(); trackEvent('language_switch', { from: locale }); setLocale(locale === 'ru' ? 'kk' : 'ru'); }}>
            <Languages size={16} />
            {locale === 'ru' ? 'Қазақша' : 'Русский'}
          </button>
          <a className="header-login" href="#login">{c.ctaLogin}</a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="hero-note">{c.heroMicro}</p>
          <h1>{c.heroTitle}</h1>
          <p className="hero-lead">{c.heroLead}</p>
          <div className="hero-buttons">
            <a className="primary-btn" href="#login" onClick={() => { playSoftClick(); trackEvent('hero_login_click', { locale }); }}>
              {c.ctaLogin}
              <ArrowRight size={18} />
            </a>
            <a className="secondary-btn" href="#contact" onClick={() => { playSoftClick(); trackEvent('hero_demo_click', { locale }); }}>{c.ctaDemo}</a>
          </div>
          <div className="proof-row">
            {proof.map((item) => (
              <div className="proof-item" key={item.ru}>
                <strong>{item.value}</strong>
                <span>{item[locale]}</span>
              </div>
            ))}
          </div>
          <div className="pipeline" aria-label="Workflow">
            {localizedPipeline.map((item, index) => (
              <div className="pipeline-step" key={item}>
                <span>{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <HeroScene locale={locale} />
          <form className="login-card" id="login" onSubmit={handleLoginSubmit}>
            <div className="sound-note">
              <Volume2 size={14} />
              {locale === 'ru' ? 'мягкие звуки только после действия' : 'дыбыс тек әрекеттен кейін'}
            </div>
            <div>
              <span className="card-kicker">{c.loginLead}</span>
              <h2>{c.loginTitle}</h2>
            </div>
            <label>
              {c.username}
              <input type="text" placeholder="qormed_admin" />
            </label>
            <label>
              {c.password}
              <input type="password" placeholder="••••••••" />
            </label>
            <div className="login-row">
              <label className="remember">
                <input type="checkbox" />
                {c.remember}
              </label>
              <a href="#contact">{c.forgot}</a>
            </div>
            <button className="login-submit" type="submit">{c.loginButton}</button>
            <p className="login-notice">{c.loginNotice}</p>
          </form>
        </div>
      </section>

      <section className="problems section-band" id="problems">
        <div className="section-heading">
          <h2>{c.problemTitle}</h2>
          <p>{c.problemLead}</p>
        </div>
        <div className="problem-grid">
          {problems.map((item) => (
            <article className="problem-item" key={item.ru}>
              <item.icon size={28} />
              <span>{item[locale]}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="solution" id="solution">
        <div className="solution-copy">
          <h2>{c.solutionTitle}</h2>
          <p>{c.solutionLead}</p>
        </div>
        <div className="solution-grid">
          {solutions.map((item) => (
            <article className="solution-card" key={item.ru}>
              <div className="solution-icon">
                <item.icon size={24} />
              </div>
              <h3>{item[locale]}</h3>
              <div className="mini-bars">
                <span />
                <span />
                <span />
              </div>
            </article>
          ))}
        </div>
      </section>

      <FlowMap locale={locale} />

      <section className="product-showcase" aria-labelledby="product-title">
        <div className="product-showcase-copy">
          <h2 id="product-title">{c.productTitle}</h2>
          <p>{c.productLead}</p>
        </div>
        <div className="mockup-stage" aria-label="QorMed product mockups">
          {productScreens.map((screen, index) => (
            <article className={`mockup-card mockup-card-${index + 1}`} key={screen.ru}>
              <div className="mockup-header">
                <screen.icon size={20} />
                <span>{screen[locale]}</span>
              </div>
              <strong>{screen.metric}</strong>
              <div className="mockup-rows">
                {screen.rows.map((row) => (
                  <span key={row}>{row}</span>
                ))}
              </div>
            </article>
          ))}
          <div className="mockup-command">
            <ServerCog size={24} />
            <div>
              <b>{locale === 'ru' ? 'Единый контур данных' : 'Бірыңғай деректер контуры'}</b>
              <span>{locale === 'ru' ? 'пациент -> прием -> оплата -> отчет' : 'пациент -> қабылдау -> төлем -> есеп'}</span>
            </div>
            <TimerReset size={22} />
          </div>
        </div>
      </section>

      <RoleMatrix locale={locale} />

      <section className="trust section-band" id="trust">
        <div className="section-heading">
          <h2>{c.trustTitle}</h2>
          <p>{c.trustLead}</p>
        </div>
        <div className="trust-grid">
          {trust.map((item) => (
            <article className="trust-item" key={item.ru}>
              <item.icon size={24} />
              <span>{item[locale]}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-copy">
          <h2>{c.finalTitle}</h2>
          <p>{c.finalLead}</p>
          <div className="rollout-panel">
            <h3>{c.rolloutTitle}</h3>
            <p>{c.rolloutLead}</p>
            <div className="rollout-steps">
              {rollout.map((item, index) => (
                <span key={item.ru}><b>{index + 1}</b>{item[locale]}</span>
              ))}
            </div>
          </div>
          <div className="contact-methods">
            <a href="tel:+77003527000">
              <Phone size={18} />
              +7-700-352-70-00
            </a>
            <a href="https://instagram.com/qormed" target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              qormed
            </a>
            <a href={`mailto:${SALES_EMAIL}`} onClick={() => trackEvent('sales_email_click', { locale })}>
              <Mail size={18} />
              sales
            </a>
          </div>
        </div>
        <form className="demo-form" onSubmit={handleDemoSubmit}>
          <h3><Building2 size={22} />{c.formTitle}</h3>
          <label>
            {c.formName}
            <input required name="name" type="text" autoComplete="name" />
          </label>
          <label>
            {c.formPhone}
            <input required name="phone" type="tel" autoComplete="tel" />
          </label>
          <label>
            {c.formClinic}
            <input required name="clinic" type="text" autoComplete="organization" />
          </label>
          <label>
            {c.formCity}
            <input required name="city" type="text" autoComplete="address-level2" />
          </label>
          <label>
            {c.formScale}
            <input required name="scale" type="text" placeholder={locale === 'ru' ? 'Например: 12 врачей, 2 филиала' : 'Мысалы: 12 дәрігер, 2 филиал'} />
          </label>
          <label>
            {c.formEmail}
            <input required name="email" type="email" autoComplete="email" />
          </label>
          <label>
            {c.formComment}
            <input name="comment" type="text" />
          </label>
          <button type="submit" disabled={demoStatus === 'sending'}>
            <Send size={16} />
            {demoStatus === 'sending' ? c.formSending : c.formSubmit}
          </button>
          {demoStatus === 'sent' && <p className="success-message"><CheckCircle2 size={16} />{c.formSuccess}</p>}
          {demoStatus === 'error' && <p className="error-message">{c.formError}</p>}
        </form>
      </section>
    </main>
  );
}

export default App;
