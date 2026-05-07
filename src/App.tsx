import type { CSSProperties, FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
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
  Globe2,
  Headphones,
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
  WalletCards,
  X,
} from 'lucide-react';

type Locale = 'ru' | 'kk';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

async function playIntroSound() {
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) {
    return false;
  }

  try {
    const context = new AudioContextClass();
    await context.resume();

    if (context.state !== 'running') {
      return false;
    }

    const now = context.currentTime;
    const master = context.createGain();
    const lowPass = context.createBiquadFilter();
    lowPass.type = 'lowpass';
    lowPass.frequency.setValueAtTime(1850, now);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.42, now + 0.035);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.75);
    lowPass.connect(master);
    master.connect(context.destination);

    const makeTone = (frequency: number, start: number, duration: number, peak = 0.24) => {
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, now + start);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.55, now + start + duration);
      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(peak, now + start + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);
      osc.connect(gain);
      gain.connect(lowPass);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.04);
    };

    makeTone(82, 0.02, 1.12, 0.32);
    makeTone(164, 0.08, 0.9, 0.16);
    makeTone(246, 0.22, 0.76, 0.1);

    const shimmer = context.createOscillator();
    const shimmerGain = context.createGain();
    shimmer.type = 'triangle';
    shimmer.frequency.setValueAtTime(620, now + 0.18);
    shimmer.frequency.exponentialRampToValueAtTime(1180, now + 0.78);
    shimmerGain.gain.setValueAtTime(0.0001, now + 0.18);
    shimmerGain.gain.exponentialRampToValueAtTime(0.055, now + 0.32);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.18);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(lowPass);
    shimmer.start(now + 0.18);
    shimmer.stop(now + 1.22);

    window.setTimeout(() => void context.close(), 2100);
    return true;
  } catch {
    return false;
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
  commandTitle: string;
  commandLead: string;
  insightTitle: string;
  insightLead: string;
  journeyTitle: string;
  journeyLead: string;
  rolesTitle: string;
  rolesLead: string;
  rolloutTitle: string;
  rolloutLead: string;
  faqTitle: string;
  faqLead: string;
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
  formSuccessLead: string;
  formSending: string;
  formError: string;
  formPrivacy: string;
  loginNotice: string;
};

const COPY: Record<Locale, Copy> = {
  ru: {
    nav: ['Проблемы', 'Решение', 'Безопасность', 'Контакты'],
    ctaDemo: 'Запросить демо',
    ctaLogin: 'Войти',
    heroTitle: 'Видьте клинику как систему в цифрах',
    heroLead:
      'QorMed объединяет CRM, телефонию, WhatsApp, запись, карту пациента, оплаты, аналитику и ЭЦП в один контур управления клиникой.',
    heroMicro: 'QorMed · цифровое управление клиникой · Казахстан',
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
    productTitle: 'Интерфейс, который продает продукт без лишних обещаний',
    productLead:
      'Лендинг показывает не абстрактную медицину, а рабочие экраны: расписание, карта пациента, финансовый статус и управленческая аналитика.',
    commandTitle: 'Операционная картина клиники в реальном времени',
    commandLead:
      'На одном экране видно загрузку врачей, ближайшие приемы, финансовый статус и узкие места процесса.',
    insightTitle: 'Клиника может терять деньги тихо',
    insightLead:
      'Потери редко выглядят как одна большая ошибка. Обычно это пропущенный звонок, ручной перенос записи, долгий ответ, незакрытая оплата и отчет, который собирают слишком поздно.',
    journeyTitle: 'Один путь пациента вместо десятков ручных действий',
    journeyLead:
      'QorMed показывает клинику как процесс: запись создает событие, врач ведет карту, оплата закрывает визит, а руководитель видит отчет.',
    rolesTitle: 'Разные роли, один источник правды',
    rolesLead:
      'Владелец, администратор и врач работают в своем интерфейсе, но все данные остаются в единой системе.',
    rolloutTitle: 'Внедрение без операционного шока',
    rolloutLead:
      'Лендинг уже готов говорить о подключении: этапы, перенос данных, обучение и сопровождение после запуска.',
    faqTitle: 'Вопросы перед подключением',
    faqLead:
      'Клиника должна понимать сроки, поддержку и следующий шаг еще до разговора с отделом продаж.',
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
    formSuccessLead: 'Номер заявки',
    formSending: 'Отправляем...',
    formError: 'Не удалось отправить автоматически. Открываем письмо для отдела продаж.',
    formPrivacy: 'Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи по демо QorMed.',
    loginNotice: 'Если рабочий endpoint не задан, кнопка ведет на текущую MIS-страницу.',
  },
  kk: {
    nav: ['Мәселелер', 'Шешім', 'Қауіпсіздік', 'Байланыс'],
    ctaDemo: 'Демо сұрау',
    ctaLogin: 'Кіру',
    heroTitle: 'Клиниканы цифрлар жүйесі ретінде көріңіз',
    heroLead:
      'QorMed CRM, телефония, WhatsApp, жазылу, пациент картасы, төлемдер, аналитика және ЭЦҚ деректерін бір басқару контурына біріктіреді.',
    heroMicro: 'QorMed · клиниканы цифрлық басқару · Қазақстан',
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
    productTitle: 'Өнімді артық уәдесіз көрсететін интерфейс',
    productLead:
      'Лендинг абстракт медицина емес, нақты жұмыс экрандарын көрсетеді: кесте, пациент картасы, қаржы статусы және басқару аналитикасы.',
    commandTitle: 'Клиниканың нақты уақыттағы операциялық көрінісі',
    commandLead:
      'Бір экранда дәрігер жүктемесі, жақын қабылдаулар, қаржы статусы және процестегі тар орындар көрінеді.',
    insightTitle: 'Клиника ақшаны үнсіз жоғалтуы мүмкін',
    insightLead:
      'Жоғалтулар көбіне бір үлкен қате емес. Бұл өткізіп алынған қоңырау, қолмен ауыстырылған жазылу, ұзақ жауап, жабылмаған төлем және кеш жиналған есеп.',
    journeyTitle: 'Ондаған қол әрекетінің орнына пациенттің бір жолы',
    journeyLead:
      'QorMed клиниканы процесс ретінде көрсетеді: жазылу оқиға жасайды, дәрігер карта жүргізеді, төлем визитті жабады, басшы есепті көреді.',
    rolesTitle: 'Әр рөлге өз интерфейсі, дерек көзі біреу',
    rolesLead:
      'Иесі, әкімші және дәрігер өз жұмысына ыңғайлы экранда жұмыс істейді, ал деректер бір жүйеде қалады.',
    rolloutTitle: 'Енгізу операциялық күйзеліссіз',
    rolloutLead:
      'Лендинг қосылу туралы нақты сөйлейді: кезеңдер, деректерді көшіру, оқыту және іске қосылғаннан кейін қолдау.',
    faqTitle: 'Қосылу алдындағы сұрақтар',
    faqLead:
      'Клиника сату бөлімімен сөйлеспей тұрып мерзімді, қолдауды және келесі қадамды түсінуі керек.',
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
    formSuccessLead: 'Өтінім нөмірі',
    formSending: 'Жіберілуде...',
    formError: 'Автоматты түрде жіберу мүмкін болмады. Сату бөліміне хат ашамыз.',
    formPrivacy: 'Батырманы басу арқылы QorMed демосы бойынша байланысу үшін контакт деректерін өңдеуге келісесіз.',
    loginNotice: 'Жұмыс endpoint көрсетілмесе, батырма ағымдағы MIS бетіне апарады.',
  },
};

const LOGIN_URL = import.meta.env.VITE_QORMED_LOGIN_URL || 'https://mis.qormed.kz/auth';
const DEMO_ENDPOINT = import.meta.env.VITE_QORMED_DEMO_ENDPOINT;
const SALES_EMAIL = import.meta.env.VITE_QORMED_SALES_EMAIL || 'inbox@qormed.kz';

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

const operatingModules = [
  { icon: MessageCircle, ru: 'WhatsApp и CRM', kk: 'WhatsApp және CRM', value: 'CRM' },
  { icon: Phone, ru: 'Телефония и скорость ответа', kk: 'Телефония және жауап жылдамдығы', value: 'call' },
  { icon: FileCheck2, ru: 'ЭЦП и документы', kk: 'ЭЦҚ және құжаттар', value: 'EDS' },
  { icon: BarChart3, ru: 'Аналитика владельца', kk: 'Иесінің аналитикасы', value: 'KPI' },
];

const trust = [
  { icon: LockKeyhole, ru: 'Данные хранятся в защищенном дата-центре', kk: 'Деректер қорғалған дата-орталықта сақталады' },
  { icon: DatabaseZap, ru: 'Масштабируется под сеть клиник', kk: 'Клиникалар желісіне дейін масштабталады' },
  { icon: ShieldCheck, ru: 'Работа по стандартам МЗ РК', kk: 'ҚР ДСМ стандарттарына сай жұмыс' },
  { icon: Smartphone, ru: 'Мобильное приложение для руководителя', kk: 'Басшыға арналған мобильді қосымша' },
  { icon: Globe2, ru: 'Поддержка на 3 языках', kk: '3 тілде қолдау' },
  { icon: Headphones, ru: 'Поддержка 24/7 и персональный менеджер', kk: '24/7 қолдау және жеке менеджер' },
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

const faqs = [
  {
    ru: 'Как быстро можно внедрить QorMed?',
    kk: 'QorMed жүйесін қаншалықты тез енгізуге болады?',
    answerRu: 'Ориентир для разговора с клиникой - от 2 до 6 недель, в зависимости от размера клиники и объема миграции данных.',
    answerKk: 'Клиникамен сөйлесудегі бағдар - клиника көлемі мен деректерді көшіру көлеміне қарай 2-6 апта.',
  },
  {
    ru: 'Что происходит после запуска?',
    kk: 'Іске қосылғаннан кейін не болады?',
    answerRu: 'Команда получает обучение, сопровождение, помощь с настройками, обновлениями и масштабированием системы.',
    answerKk: 'Команда оқыту, сүйемелдеу, баптаулар, жаңартулар және жүйені масштабтау бойынша көмек алады.',
  },
  {
    ru: 'Для кого интерфейс?',
    kk: 'Интерфейс кімге арналған?',
    answerRu: 'Для руководителя, администратора и врача: роли разные, но данные остаются в одном контуре.',
    answerKk: 'Басшыға, әкімшіге және дәрігерге: рөлдер әртүрлі, бірақ деректер бір контурда қалады.',
  },
];

const moneyLeaks = [
  {
    ru: 'Скорость ответа',
    kk: 'Жауап жылдамдығы',
    detailRu: 'Если пациент ждет слишком долго, клиника теряет запись еще до приема.',
    detailKk: 'Пациент ұзақ күтсе, клиника қабылдауға дейін-ақ жазылуды жоғалтады.',
  },
  {
    ru: 'Тихие процессы',
    kk: 'Үнсіз процестер',
    detailRu: 'Ручные переносы, незакрытые оплаты и Excel-отчеты прячут реальные потери.',
    detailKk: 'Қолмен ауыстыру, жабылмаған төлемдер және Excel есептері нақты шығынды жасырады.',
  },
  {
    ru: 'Команда выгорает',
    kk: 'Команда шаршайды',
    detailRu: 'Когда система держится на людях, администраторы и врачи становятся узким местом.',
    detailKk: 'Жүйе адамдарға ғана тірелсе, әкімшілер мен дәрігерлер тар орынға айналады.',
  },
];

const controlChecks = [
  {
    ru: 'Руководитель видит выручку, загрузку врачей и оплаты без ручного Excel.',
    kk: 'Басшы табыс, дәрігер жүктемесі және төлемдерді қолмен Excel жинамай көреді.',
    signalRu: 'Финансы видны сегодня',
    signalKk: 'Қаржы бүгін көрінеді',
  },
  {
    ru: 'Администратор не теряет обращения из звонков, WhatsApp и повторных записей.',
    kk: 'Әкімші қоңырау, WhatsApp және қайта жазылудан келген өтініштерді жоғалтпайды.',
    signalRu: 'Заявки не пропадают',
    signalKk: 'Өтініштер жоғалмайды',
  },
  {
    ru: 'Врач открывает карту пациента, протокол и историю обследований в одном контуре.',
    kk: 'Дәрігер пациент картасын, хаттаманы және тексеру тарихын бір контурда ашады.',
    signalRu: 'Прием не дробится',
    signalKk: 'Қабылдау бөлінбейді',
  },
  {
    ru: 'KPI сотрудников считается по данным системы, а не по ощущениям.',
    kk: 'Қызметкерлер KPI жүйе деректерімен есептеледі, болжаммен емес.',
    signalRu: 'KPI без споров',
    signalKk: 'KPI дау тудырмайды',
  },
  {
    ru: 'Сеть клиник может расти без копирования хаоса в новые филиалы.',
    kk: 'Клиникалар желісі хаосты жаңа филиалдарға көшірмей өсе алады.',
    signalRu: 'Масштабирование готово',
    signalKk: 'Масштабтауға дайын',
  },
];

const proof = [
  { ru: 'внедрение', kk: 'енгізу', value: '2-6', unitRu: 'недель', unitKk: 'апта' },
  { ru: 'языка поддержки', kk: 'қолдау тілі', value: '3', unitRu: 'языка', unitKk: 'тіл' },
  { ru: 'поддержка', kk: 'қолдау', value: '24/7', unitRu: 'после запуска', unitKk: 'іске қосылған соң' },
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
      <div className="scene-depth" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="holo-base" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
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
          <div className="console-matrix" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
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
      <div className="scene-beam scene-beam-a" />
      <div className="scene-beam scene-beam-b" />
      <div className="data-line data-line-a" />
      <div className="data-line data-line-b" />
    </div>
  );
}

function IntroSequence({ locale }: { locale: Locale }) {
  return (
    <div className="intro-sequence" aria-hidden="true">
      <div className="intro-curtain" />
      <div className="intro-ribbon intro-ribbon-a" />
      <div className="intro-ribbon intro-ribbon-b" />
      <div className="intro-ribbon intro-ribbon-c" />
      <div className="intro-grid">
        <span />
        <span />
        <span />
      </div>
      <div className="intro-mark">
        <QorMedLogo />
        <div className="intro-lines">
          <span />
          <span />
          <span />
        </div>
        <p>{locale === 'ru' ? 'цифровое управление клиникой' : 'клиниканы цифрлық басқару'}</p>
      </div>
      <div className="intro-console">
        <span>{locale === 'ru' ? 'запись' : 'жазылу'}</span>
        <span>{locale === 'ru' ? 'карта' : 'карта'}</span>
        <span>{locale === 'ru' ? 'оплата' : 'төлем'}</span>
        <span>KPI</span>
      </div>
      <div className="intro-flash" />
    </div>
  );
}

function CommandCenter({ locale }: { locale: Locale }) {
  const appointments = locale === 'ru'
    ? ['Терапевт · 09:30', 'УЗИ · 10:15', 'Кардиолог · 11:00', 'Повторный прием · 12:20']
    : ['Терапевт · 09:30', 'УДЗ · 10:15', 'Кардиолог · 11:00', 'Қайта қабылдау · 12:20'];
  const labels = locale === 'ru'
    ? ['Загрузка врачей', 'Оплаты сегодня', 'Открытые визиты']
    : ['Дәрігер жүктемесі', 'Бүгінгі төлемдер', 'Ашық визиттер'];

  return (
    <section className="command-center" aria-labelledby="command-title">
      <div className="command-copy">
        <h2 id="command-title">{COPY[locale].commandTitle}</h2>
        <p>{COPY[locale].commandLead}</p>
      </div>
      <div className="command-screen" aria-label="QorMed command center mockup">
        <aside className="command-sidebar">
          <QorMedLogo />
          <span>{locale === 'ru' ? 'Сегодня' : 'Бүгін'}</span>
          <b>18</b>
          <small>{locale === 'ru' ? 'активных приемов' : 'белсенді қабылдау'}</small>
        </aside>
        <div className="command-main">
          <div className="command-topline">
            <span>{locale === 'ru' ? 'Клиника · операционный день' : 'Клиника · операциялық күн'}</span>
            <strong>online</strong>
          </div>
          <div className="command-kpis">
            {labels.map((label, index) => (
              <div className="command-kpi" key={label}>
                <span>{label}</span>
                <strong>{['82%', '₸ 1.8M', '14'][index]}</strong>
              </div>
            ))}
          </div>
          <div className="command-workspace">
            <div className="schedule-board">
              <h3>{locale === 'ru' ? 'Ближайшие приемы' : 'Жақын қабылдаулар'}</h3>
              {appointments.map((item) => (
                <div className="schedule-row" key={item}>
                  <span>{item}</span>
                  <i />
                </div>
              ))}
            </div>
            <div className="patient-snapshot">
              <HeartPulse size={24} />
              <h3>{locale === 'ru' ? 'Карта пациента' : 'Пациент картасы'}</h3>
              <p>{locale === 'ru' ? 'История, диагноз, назначения и результаты в одном профиле.' : 'Тарих, диагноз, тағайындаулар және нәтижелер бір профильде.'}</p>
              <div className="patient-lines">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightSection({ locale }: { locale: Locale }) {
  return (
    <section className="insights" aria-labelledby="insight-title">
      <div className="insight-copy">
        <h2 id="insight-title">{COPY[locale].insightTitle}</h2>
        <p>{COPY[locale].insightLead}</p>
      </div>
      <div className="leak-grid">
        {moneyLeaks.map((item, index) => (
          <article className="leak-card" key={item.ru}>
            <small>{String(index + 1).padStart(2, '0')}</small>
            <h3>{locale === 'ru' ? item.ru : item.kk}</h3>
            <p>{locale === 'ru' ? item.detailRu : item.detailKk}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ControlDiagnostic({ locale }: { locale: Locale }) {
  const [checked, setChecked] = useState(() => new Set([0, 2]));
  const score = checked.size;
  const scoreLabel = locale === 'ru'
    ? score >= 4 ? 'Клиника управляется системой' : score >= 2 ? 'Есть опорные процессы, но видны потери' : 'Клиника держится на людях'
    : score >= 4 ? 'Клиника жүйемен басқарылады' : score >= 2 ? 'Негізгі процестер бар, бірақ шығын көрінеді' : 'Клиника адамдарға тіреліп тұр';
  const nextStep = locale === 'ru'
    ? score >= 4 ? 'Следующий шаг - масштабирование и точный KPI.' : 'Следующий шаг - собрать заявки, приемы, оплаты и отчеты в один контур.'
    : score >= 4 ? 'Келесі қадам - масштабтау және нақты KPI.' : 'Келесі қадам - өтініш, қабылдау, төлем және есепті бір контурға жинау.';

  function toggleCheck(index: number) {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      trackEvent('control_diagnostic_toggle', { index: String(index), active: String(next.has(index)), locale });
      return next;
    });
  }

  return (
    <section className="diagnostic" aria-labelledby="diagnostic-title">
      <div className="diagnostic-copy">
        <h2 id="diagnostic-title">
          {locale === 'ru' ? 'Проверьте, клиника управляется или просто держится' : 'Клиника басқарыла ма, әлде жай ғана ұсталып тұр ма?'}
        </h2>
        <p>
          {locale === 'ru'
            ? 'Пять признаков показывают, где бизнес теряет контроль: в деньгах, записи, приеме, KPI или масштабировании.'
            : 'Бес белгі бақылаудың қай жерде жоғалатынын көрсетеді: қаржы, жазылу, қабылдау, KPI немесе масштабтау.'}
        </p>
        <a className="diagnostic-cta" href="#contact" onClick={() => trackEvent('diagnostic_demo_click', { locale, score: String(score) })}>
          {locale === 'ru' ? 'Разобрать процессы с QorMed' : 'Процестерді QorMed-пен талдау'}
          <ArrowRight size={18} />
        </a>
      </div>
      <div className="diagnostic-console">
        <div className="diagnostic-score">
          <div>
            <span>{locale === 'ru' ? 'Индекс управляемости' : 'Басқару индексі'}</span>
            <strong>{score}/5</strong>
          </div>
          <p>{scoreLabel}</p>
          <i style={{ '--score': `${score * 20}%` } as CSSProperties} />
        </div>
        <div className="diagnostic-list">
          {controlChecks.map((item, index) => {
            const isActive = checked.has(index);
            return (
              <button
                className={isActive ? 'diagnostic-row active' : 'diagnostic-row'}
                key={item.ru}
                type="button"
                onClick={() => toggleCheck(index)}
                aria-pressed={isActive}
              >
                <span className="diagnostic-check">
                  {isActive && <CheckCircle2 size={17} />}
                </span>
                <span>
                  <b>{locale === 'ru' ? item.signalRu : item.signalKk}</b>
                  <small>{locale === 'ru' ? item.ru : item.kk}</small>
                </span>
              </button>
            );
          })}
        </div>
        <div className="diagnostic-next">
          <Gauge size={20} />
          <span>{nextStep}</span>
        </div>
      </div>
    </section>
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
  const [activeRole, setActiveRole] = useState(0);
  const active = rolePanels[activeRole];
  const points = locale === 'ru' ? active.pointsRu : active.pointsKk;

  return (
    <section className="roles" aria-labelledby="roles-title">
      <div className="section-heading">
        <h2 id="roles-title">{COPY[locale].rolesTitle}</h2>
        <p>{COPY[locale].rolesLead}</p>
      </div>
      <div className="role-switcher" role="tablist" aria-label={locale === 'ru' ? 'Роли в клинике' : 'Клиникадағы рөлдер'}>
        {rolePanels.map((role, index) => (
          <button
            aria-selected={activeRole === index}
            className={activeRole === index ? 'role-tab active' : 'role-tab'}
            key={role.ru}
            onClick={() => {
              setActiveRole(index);
              trackEvent('role_tab_click', { locale, role: role.ru });
            }}
            role="tab"
            type="button"
          >
            <role.icon size={18} />
            {locale === 'ru' ? role.ru : role.kk}
          </button>
        ))}
      </div>
      <article className="role-feature" role="tabpanel">
        <div className="role-feature-copy">
          <div className="role-card-top">
            <div className="role-icon"><active.icon size={26} /></div>
            <strong>{active.metric}</strong>
          </div>
          <h3>{locale === 'ru' ? active.ru : active.kk}</h3>
          <ul>
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="role-dashboard" aria-hidden="true">
          <div className="role-dashboard-header">
            <span>{locale === 'ru' ? 'Рабочий экран' : 'Жұмыс экраны'}</span>
            <b>QorMed</b>
          </div>
          <div className="role-dashboard-grid">
            <div className="role-stat large">{active.metric}</div>
            <div className="role-stat">KPI</div>
            <div className="role-stat">24/7</div>
            <div className="role-list">
              {points.map((point) => <span key={point}>{point}</span>)}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

function FaqSection({ locale }: { locale: Locale }) {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="section-heading">
        <h2 id="faq-title">{COPY[locale].faqTitle}</h2>
        <p>{COPY[locale].faqLead}</p>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <details className="faq-item" key={item.ru} open={index === 0}>
            <summary>{locale === 'ru' ? item.ru : item.kk}</summary>
            <p>{locale === 'ru' ? item.answerRu : item.answerKk}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function trackEvent(name: string, params: Record<string, string> = {}) {
  const payload = { event: name, ...params, timestamp: new Date().toISOString() };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent('qormed:analytics', { detail: payload }));
  if (import.meta.env.DEV) {
    console.info('[QorMed analytics]', name, params);
  }
}

function createLeadId() {
  return `QM-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function buildLeadBody(form: HTMLFormElement, locale: Locale, leadId: string) {
  const data = new FormData(form);
  const labels = locale === 'ru'
    ? ['Новая заявка QorMed', 'Имя', 'Телефон', 'Клиника', 'Почта', 'Комментарий']
    : ['QorMed жаңа өтінімі', 'Аты', 'Телефон', 'Клиника', 'Пошта', 'Пікір'];

  return [
    labels[0],
    `Lead ID: ${leadId}`,
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
  const [leadId, setLeadId] = useState('');
  const c = COPY[locale];

  useEffect(() => {
    let soundPlayed = false;

    const play = async () => {
      if (soundPlayed) return;
      soundPlayed = await playIntroSound();
    };

    const playOnGesture = () => {
      void play();
    };

    if (navigator.userActivation?.hasBeenActive) {
      void play();
    }

    window.addEventListener('pointerdown', playOnGesture, { once: true });
    window.addEventListener('keydown', playOnGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', playOnGesture);
      window.removeEventListener('keydown', playOnGesture);
    };
  }, []);

  const localizedPipeline = useMemo(
    () => locale === 'ru' ? ['Пациент', 'Прием', 'Оплата', 'Отчет'] : ['Пациент', 'Қабылдау', 'Төлем', 'Есеп'],
    [locale],
  );

  async function handleDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (new FormData(form).get('website')) {
      trackEvent('demo_spam_blocked', { locale });
      return;
    }
    const nextLeadId = createLeadId();
    const body = buildLeadBody(form, locale, nextLeadId);
    setLeadId(nextLeadId);
    setDemoStatus('sending');
    trackEvent('demo_submit', { locale, leadId: nextLeadId });

    try {
      if (DEMO_ENDPOINT) {
        const response = await fetch(DEMO_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leadId: nextLeadId, locale, ...Object.fromEntries(new FormData(form)) }),
        });
        if (!response.ok) throw new Error(`Demo endpoint returned ${response.status}`);
      } else {
        localStorage.setItem('qormed:lastLead', body);
        localStorage.setItem('qormed:lastLeadId', nextLeadId);
        openLeadEmail(body);
      }
      form.reset();
      setDemoStatus('sent');
      trackEvent('demo_success', { locale, leadId: nextLeadId, transport: DEMO_ENDPOINT ? 'endpoint' : 'mailto' });
      window.setTimeout(() => setDemoStatus('idle'), 4200);
    } catch (error) {
      console.error(error);
      setDemoStatus('error');
      trackEvent('demo_error', { locale, leadId: nextLeadId });
      openLeadEmail(body);
    }
  }

  function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent('login_redirect', { locale });
    window.location.assign(LOGIN_URL);
  }

  return (
    <main className="page-shell">
      <IntroSequence locale={locale} />
      <a className="skip-link" href="#contact">
        {locale === 'ru' ? 'Перейти к заявке' : 'Өтінімге өту'}
      </a>
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
          <button className="lang-toggle" type="button" onClick={() => { trackEvent('language_switch', { from: locale }); setLocale(locale === 'ru' ? 'kk' : 'ru'); }}>
            <Languages size={16} />
            {locale === 'ru' ? 'Қазақша' : 'Русский'}
          </button>
          <a className="header-login" href="#login">{c.ctaLogin}</a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Open menu">
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
            <a className="primary-btn" href="#login" onClick={() => { trackEvent('hero_login_click', { locale }); }}>
              {c.ctaLogin}
              <ArrowRight size={18} />
            </a>
            <a className="secondary-btn" href="#contact" onClick={() => { trackEvent('hero_demo_click', { locale }); }}>{c.ctaDemo}</a>
          </div>
          <div className="proof-row">
            {proof.map((item) => (
              <div className="proof-item" key={item.ru}>
                <strong>{item.value}</strong>
                <span>{locale === 'ru' ? item.unitRu : item.unitKk}</span>
                <small>{item[locale]}</small>
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
          <div className="module-strip" aria-label="QorMed operating modules">
            {operatingModules.map((item) => (
              <div className="module-chip" key={item.ru}>
                <item.icon size={16} />
                <b>{item.value}</b>
                <span>{item[locale]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <HeroScene locale={locale} />
          <form className="login-card" id="login" onSubmit={handleLoginSubmit}>
            <div>
              <span className="card-kicker">{c.loginLead}</span>
              <h2>{c.loginTitle}</h2>
            </div>
            <label>
              {c.username}
              <input name="login" type="text" placeholder="qormed_admin" autoComplete="username" />
            </label>
            <label>
              {c.password}
              <input name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
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

      <InsightSection locale={locale} />

      <ControlDiagnostic locale={locale} />

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

      <CommandCenter locale={locale} />

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

      <FaqSection locale={locale} />

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
            <a href="tel:+77003527000" onClick={() => trackEvent('sales_phone_click', { locale })}>
              <Phone size={18} />
              +7-700-352-70-00
            </a>
            <a href="https://instagram.com/qormed" target="_blank" rel="noreferrer" onClick={() => trackEvent('instagram_click', { locale })}>
              <MessageCircle size={18} />
              qormed
            </a>
            <a href={`mailto:${SALES_EMAIL}`} onClick={() => trackEvent('sales_email_click', { locale })}>
              <Mail size={18} />
              sales
            </a>
          </div>
        </div>
        <form className="demo-form" onSubmit={handleDemoSubmit} aria-describedby="demo-privacy demo-status">
          <h3><Building2 size={22} />{c.formTitle}</h3>
          <label className="lead-honeypot" aria-hidden="true">
            Website
            <input name="website" tabIndex={-1} type="text" autoComplete="off" />
          </label>
          <label htmlFor="lead-name">
            {c.formName}
            <input id="lead-name" required name="name" type="text" autoComplete="name" />
          </label>
          <label htmlFor="lead-phone">
            {c.formPhone}
            <input id="lead-phone" required name="phone" type="tel" autoComplete="tel" />
          </label>
          <label htmlFor="lead-clinic">
            {c.formClinic}
            <input id="lead-clinic" required name="clinic" type="text" autoComplete="organization" />
          </label>
          <label htmlFor="lead-city">
            {c.formCity}
            <input id="lead-city" required name="city" type="text" autoComplete="address-level2" />
          </label>
          <label htmlFor="lead-scale">
            {c.formScale}
            <input id="lead-scale" required name="scale" type="text" placeholder={locale === 'ru' ? 'Например: 12 врачей, 2 филиала' : 'Мысалы: 12 дәрігер, 2 филиал'} />
          </label>
          <label htmlFor="lead-email">
            {c.formEmail}
            <input id="lead-email" required name="email" type="email" autoComplete="email" />
          </label>
          <label htmlFor="lead-comment">
            {c.formComment}
            <input id="lead-comment" name="comment" type="text" />
          </label>
          <p className="privacy-note" id="demo-privacy">{c.formPrivacy}</p>
          <button type="submit" disabled={demoStatus === 'sending'}>
            <Send size={16} />
            {demoStatus === 'sending' ? c.formSending : c.formSubmit}
          </button>
          <div id="demo-status" aria-live="polite">
            {demoStatus === 'sent' && (
              <p className="success-message">
                <CheckCircle2 size={16} />
                {c.formSuccess}
                {leadId && <span>{c.formSuccessLead}: {leadId}</span>}
              </p>
            )}
            {demoStatus === 'error' && <p className="error-message">{c.formError}</p>}
          </div>
        </form>
      </section>
    </main>
  );
}

export default App;
