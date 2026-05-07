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
  ShieldCheck,
  Smartphone,
  Stethoscope,
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
  trustTitle: string;
  trustLead: string;
  finalTitle: string;
  finalLead: string;
  formTitle: string;
  formName: string;
  formPhone: string;
  formClinic: string;
  formEmail: string;
  formComment: string;
  formSubmit: string;
  formSuccess: string;
};

const COPY: Record<Locale, Copy> = {
  ru: {
    nav: ['Проблемы', 'Решение', 'Безопасность', 'Контакты'],
    ctaDemo: 'Запросить демо',
    ctaLogin: 'Войти',
    heroTitle: 'QorMed - медицинская информационная система для управления клиникой в одном окне',
    heroLead:
      'Пациенты, расписание, финансы, документы, врачи, отчеты и KPI работают как единая система, а не как разрозненные таблицы и ручные процессы.',
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
    formEmail: 'Рабочая почта',
    formComment: 'Что хотите автоматизировать первым?',
    formSubmit: 'Отправить заявку',
    formSuccess: 'Заявка сохранена. Мы свяжемся с вами.',
  },
  kk: {
    nav: ['Мәселелер', 'Шешім', 'Қауіпсіздік', 'Байланыс'],
    ctaDemo: 'Демо сұрау',
    ctaLogin: 'Кіру',
    heroTitle: 'QorMed - клиниканы бір терезеде басқаруға арналған медициналық ақпараттық жүйе',
    heroLead:
      'Пациенттер, кесте, қаржы, құжаттар, дәрігерлер, есептер және KPI бөлек кестелер емес, біртұтас жүйе ретінде жұмыс істейді.',
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
    formEmail: 'Жұмыс поштасы',
    formComment: 'Алдымен нені автоматтандырғыңыз келеді?',
    formSubmit: 'Өтінім жіберу',
    formSuccess: 'Өтінім сақталды. Біз сізбен хабарласамыз.',
  },
};

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

function App() {
  const [locale, setLocale] = useState<Locale>('ru');
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoSent, setDemoSent] = useState(false);
  const c = COPY[locale];

  const localizedPipeline = useMemo(
    () => locale === 'ru' ? ['Пациент', 'Прием', 'Оплата', 'Отчет'] : ['Пациент', 'Қабылдау', 'Төлем', 'Есеп'],
    [locale],
  );

  function handleDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    playSoftClick();
    setDemoSent(true);
    window.setTimeout(() => setDemoSent(false), 3600);
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
          <button className="lang-toggle" type="button" onClick={() => { playSoftClick(); setLocale(locale === 'ru' ? 'kk' : 'ru'); }}>
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
            <a className="primary-btn" href="#login" onClick={playSoftClick}>
              {c.ctaLogin}
              <ArrowRight size={18} />
            </a>
            <a className="secondary-btn" href="#contact" onClick={playSoftClick}>{c.ctaDemo}</a>
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
          <form className="login-card" id="login" onSubmit={(event) => { event.preventDefault(); playSoftClick(); }}>
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
          <div className="contact-methods">
            <a href="tel:+77003527000">
              <Phone size={18} />
              +7-700-352-70-00
            </a>
            <a href="https://instagram.com/qormed" target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              qormed
            </a>
            <a href="mailto:vandalsavageaaa@gmail.com">
              <Mail size={18} />
              sales
            </a>
          </div>
        </div>
        <form className="demo-form" onSubmit={handleDemoSubmit}>
          <h3><Building2 size={22} />{c.formTitle}</h3>
          <label>
            {c.formName}
            <input required type="text" />
          </label>
          <label>
            {c.formPhone}
            <input required type="tel" />
          </label>
          <label>
            {c.formClinic}
            <input required type="text" />
          </label>
          <label>
            {c.formEmail}
            <input required type="email" />
          </label>
          <label>
            {c.formComment}
            <input type="text" />
          </label>
          <button type="submit">
            <Send size={16} />
            {c.formSubmit}
          </button>
          {demoSent && <p className="success-message"><CheckCircle2 size={16} />{c.formSuccess}</p>}
        </form>
      </section>
    </main>
  );
}

export default App;
