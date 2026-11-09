import { useState, type ReactNode } from 'react';
import {
  ArrowUpRight, Check, ChevronRight, ClipboardList, Code2, FileText, Info, Mail,
  Menu, MessageCircle, Palette, Rocket, Send, ListChecks, X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4';
const CONTACT_EMAIL = 'krasnikoff.ru@gmail.com';
const CONTACT_LINK = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Обсудить сайт')}`;
const MAX_LINK = 'https://max.ru/u/f9LHodD0cOKYn3sb0GAoQTd--MI4H0hQ55egGH0wOC8WfQXqUuriwAdCihs';
const TELEGRAM_LINK = 'https://t.me/Selerty';

function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M0 128c70.692 0 128 57.308 128 128H64c0-35.346-28.654-64-64-64zm256 64c-35.346 0-64 28.654-64 64h-64c0-70.692 57.308-128 128-128zM128 0c0 70.692-57.308 128-128 128V64c35.346 0 64-28.654 64-64zm64 0c0 35.346 28.654 64 64 64v64C185.308 128 128 70.692 128 0z" />
    </svg>
  );
}

function ContactButton({ label = 'Обсудить проект', full = false, href = CONTACT_LINK }: { label?: string; full?: boolean; href?: string }) {
  return (
    <a href={href} className={`apple-button group ${full ? 'w-full' : ''}`}>
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" />
    </a>
  );
}

function TopbarSocialLinks({ className = '' }: { className?: string }) {
  return (
    <nav className={`topbar-social ${className}`} aria-label="Контакты">
      <a className="topbar-social-link" href={MAX_LINK} target="_blank" rel="noreferrer" aria-label="Написать в MAX" data-tooltip="Написать в MAX"><MessageCircle size={17} strokeWidth={1.8}/></a>
      <a className="topbar-social-link" href={TELEGRAM_LINK} target="_blank" rel="noreferrer" aria-label="Написать в Telegram" data-tooltip="Написать в Telegram"><Send size={16} strokeWidth={1.8}/></a>
      <a className="topbar-social-link" href={CONTACT_LINK} aria-label="Написать на почту" data-tooltip="Написать на почту"><Mail size={17} strokeWidth={1.8}/></a>
    </nav>
  );
}

function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="section-eyebrow">
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      <span>{label}</span>
      {tag && <span className="eyebrow-tag">{tag}</span>}
    </div>
  );
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28, filter: 'blur(5px)' }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduce ? 0 : 0.72, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}

function Background() {
  const reduce = useReducedMotion();
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {!reduce && <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-[.3]" src={VIDEO_URL} />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,12,.58)_0%,rgba(12,12,12,.76)_42%,#0c0c0c_78%)]" />
        <div className="ambient-glow" />
      </div>
      <div className="guide-line guide-left hidden md:block" aria-hidden="true" />
      <div className="guide-line guide-right hidden md:block" aria-hidden="true" />
    </>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const links = ['Примеры', 'Процесс', 'Стоимость', 'Контакт'];
  const targets = ['#concepts', '#process', '#pricing', '#closing'];
  return (
    <motion.header
      className="sticky top-0 z-30 w-full border-b border-white/10 bg-[#0c0c0c]/75 backdrop-blur-xl"
      initial={reduce ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .6, ease: 'easeOut' }}
    >
      <div className="relative mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6">
      <a href="#top" className="topbar-brand inline-flex items-center gap-3 rounded-md text-white focus-visible:outline">
        <LogoMark />
        <span className="text-sm font-semibold tracking-tight">Krasnikoff Studio</span>
      </a>
      <TopbarSocialLinks className="topbar-social-mobile" />
      <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
        {links.map((link, i) => (
          <motion.a key={link} href={targets[i]} className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : .1 + i * .05, duration: reduce ? 0 : .45 }}>
            {link}
          </motion.a>
        ))}
      </nav>
      <TopbarSocialLinks className="topbar-social-desktop" />
      <div className="hidden md:block"><ContactButton label="Написать" /></div>
      <button className="icon-button md:hidden" aria-expanded={open} aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen(!open)}>
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      <AnimatePresence>
        {open && <motion.nav className="mobile-menu md:hidden" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} aria-label="Мобильная навигация">
          {links.map((link, i) => <a href={targets[i]} key={link} onClick={() => setOpen(false)}>{link}</a>)}
          <ContactButton label="Написать студии" full />
        </motion.nav>}
      </AnimatePresence>
      </div>
    </motion.header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-16 text-center md:pb-20 md:pt-28">
      <motion.h1 className="hero-title text-[2.625rem] leading-[.94] tracking-tight md:text-[5.5rem]"
        initial={reduce ? false : { opacity: 0, y: 25, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ delay: reduce ? 0 : .3, duration: reduce ? 0 : .8, ease: [.22, 1, .36, 1] }}>
        <span className="block">Твой сайт.</span>
        <motion.span className="hero-accent block"
          initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: reduce ? 0 : .62, duration: reduce ? 0 : .75, ease: [.22, 1, .36, 1] }}>
          Готов к работе.
        </motion.span>
      </motion.h1>
      <motion.p className="mt-8 max-w-md text-base leading-[1.5] text-white/80"
        initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : .5, duration: reduce ? 0 : .65 }}>
        Помогаем компаниям рассказать о себе и своих услугах в интернете.
      </motion.p>
      <motion.div className="mt-7 flex flex-col items-center gap-4"
        initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : .7, duration: reduce ? 0 : .6 }}>
        <ContactButton />
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <a href="#concepts" className="hero-secondary-link">Посмотреть примеры <ChevronRight size={14}/></a>
          <span className="hidden text-white/30 sm:inline" aria-hidden="true">·</span>
          <span className="text-xs text-white/75">Лендинги — от 39 900 ₽</span>
        </div>
      </motion.div>
    </section>
  );
}

type DemoConcept = { kind: string; title: string; description: string; theme: 'clinic' | 'table' | 'interior'; headline: string; detail: string; brand: string; image: string };
const demoConcepts: DemoConcept[] = [
  { kind: 'Медицинский сайт', title: 'Запись на приём', description: 'Светлая страница клиники с разделами об услугах и врачах.', theme: 'clinic', headline: 'Врачи и услуги клиники', detail: 'Врачи · Услуги · Запись', brand: 'КЛИНИКА', image: '/concepts/clinic.webp' },
  { kind: 'Ресторан', title: 'Меню и бронирование', description: 'Тёмное фото, крупный заголовок и кнопка бронирования.', theme: 'table', headline: 'Посмотрите меню', detail: 'Меню · Блюда · Бронирование', brand: 'РЕСТОРАН', image: '/concepts/restaurant.webp' },
  { kind: 'Интерьерная студия', title: 'Портфолио интерьеров', description: 'Тёплая палитра, редакционная сетка и крупное фото интерьера.', theme: 'interior', headline: 'Дизайн интерьера', detail: 'Проекты · О студии · Контакт', brand: 'СТУДИЯ', image: '/concepts/interior.webp' },
];

function ConceptArtwork({ concept }: { concept: DemoConcept }) {
  if (concept.theme === 'clinic') return (
    <div className="concept-art concept-art--clinic" aria-hidden="true">
      <header className="clinic-top"><span className="clinic-brand">{concept.brand}<small>МЕДИЦИНСКИЙ ЦЕНТР</small></span><nav>О клинике&nbsp;&nbsp; Услуги&nbsp;&nbsp; Врачи</nav><span className="clinic-book">Запись</span></header>
      <div className="clinic-main"><div className="clinic-copy"><span className="clinic-kicker">УСЛУГИ КЛИНИКИ</span><strong>{concept.headline}</strong><p>{concept.detail}</p><span className="clinic-cta">Выбрать время <ArrowUpRight size={11}/></span></div><img src={concept.image} alt="" loading="lazy" /></div>
      <div className="clinic-note"><span>Врачи</span><span>Диагностика</span><span>Приём</span></div>
    </div>
  );

  if (concept.theme === 'table') return (
    <div className="concept-art concept-art--table" aria-hidden="true">
      <img className="restaurant-image" src={concept.image} alt="" loading="lazy" />
      <div className="restaurant-shade" />
      <header className="restaurant-top"><span>{concept.brand}</span><nav>ИСТОРИЯ&nbsp;&nbsp; МЕНЮ&nbsp;&nbsp; КОНТАКТЫ</nav><span className="restaurant-book">Забронировать</span></header>
      <div className="restaurant-copy"><span className="restaurant-kicker">КУХНЯ · МЕНЮ · БРОНИРОВАНИЕ</span><strong>{concept.headline}</strong><span className="restaurant-link">Открыть меню <ArrowUpRight size={12}/></span></div>
      <div className="restaurant-index"><span>МЕНЮ · РЕСТОРАН</span><span>01 / 03</span></div>
    </div>
  );

  return (
    <div className="concept-art concept-art--interior" aria-hidden="true">
      <header className="interior-top"><span>{concept.brand}<small>АРХИТЕКТУРА И ИНТЕРЬЕР</small></span><span className="interior-menu">МЕНЮ&nbsp;&nbsp; <b>☰</b></span></header>
      <div className="interior-main"><div className="interior-copy"><span className="interior-kicker">ИНТЕРЬЕРЫ · ПОРТФОЛИО</span><strong>{concept.headline}</strong><span className="interior-link">Смотреть проекты <ArrowUpRight size={11}/></span></div><figure><img src={concept.image} alt="" loading="lazy"/><figcaption>Интерьерный проект <span>01 — 03</span></figcaption></figure></div>
      <div className="interior-foot"><span>Планировки и интерьеры</span><span>ПРОЕКТЫ · СТУДИЯ · КОНТАКТЫ</span></div>
    </div>
  );
}

function ConceptShowcase() {
  return (
    <section id="concepts" className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionEyebrow label="Примеры дизайна" />
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">Как может выглядеть ваш сайт</h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-white/65">Клиника — светлая сетка с записью. Ресторан — тёмное фото и меню. Студия интерьеров — тёплая редакционная вёрстка.</p>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {demoConcepts.map((concept, index) => <Reveal key={concept.theme} delay={index * .08}>
          <article className="concept-card">
            <ConceptArtwork concept={concept}/>
            <div className="px-1 pb-1 pt-5">
              <span className="concept-type">{concept.kind}</span>
              <h3 className="mt-3 text-lg font-medium tracking-tight text-white">{concept.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{concept.description}</p>
            </div>
          </article>
        </Reveal>)}
      </div>
    </section>
  );
}

const projectSteps = [
  { number: '01', title: 'Бриф проекта', copy: 'Собираем информацию о компании, целях сайта, аудитории и материалах.', Icon: ClipboardList },
  { number: '02', title: 'Фиксируем объём', copy: 'Согласуем страницы, функции, сроки, стоимость и состав работ.', Icon: ListChecks },
  { number: '03', title: 'Заключаем договор', copy: 'Закрепляем договорённости и условия работы до начала проекта.', Icon: FileText },
  { number: '04', title: 'Разрабатываем дизайн', copy: 'Создаём макет сайта и согласуем визуальное направление.', Icon: Palette },
  { number: '05', title: 'Верстаем сайт', copy: 'Собираем адаптивную версию и подключаем согласованные функции.', Icon: Code2 },
  { number: '06', title: 'Проверяем и запускаем', copy: 'Проверяем страницы и формы, подключаем домен и публикуем сайт.', Icon: Rocket },
];

function ProjectProcess() {
  return (
    <section id="process" className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="mb-10 md:mb-12">
        <SectionEyebrow label="Процесс" />
        <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">От обсуждения до запуска.</h2>
        </div>
      </Reveal>
      <div className="process-grid">
        {projectSteps.map((step, index) => <Reveal key={step.number} delay={index * .06}>
          <article className="process-step">
            <div className="process-mark">
              <span className="process-number">{step.number}</span>
              <step.Icon className="process-icon" size={32} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        </Reveal>)}
      </div>
    </section>
  );
}

type Plan = { tier: string; price: string; description: string; features: string[]; note?: string; popular?: boolean; pro?: boolean };
const plans: Plan[] = [
  { tier: 'Лендинг', price: 'от 39 900 ₽', description: 'Одна страница для услуги, продукта или нового направления.', features: ['Одна страница', 'Блоки об услуге или продукте', 'Форма или контакты для связи'] },
  { tier: 'Сайт компании', price: 'от 69 900 ₽', description: 'До пяти страниц о компании и её услугах.', features: ['До пяти страниц', 'Разделы о компании и услугах'], note: 'Домен и тариф платформы оплачиваются отдельно.', popular: true },
  { tier: 'Каталог', price: 'от 99 000 ₽', description: 'Каталог товаров с категориями и описаниями.', features: ['Категории и страницы товаров', 'Карточки товаров с описаниями'], note: 'Стоимость интеграций рассчитывается отдельно.' },
  { tier: 'Интернет-магазин', price: 'от 149 000 ₽', description: 'Каталог, корзина и оформление заказа на сайте.', features: ['Каталог товаров', 'Корзина и оформление заказа'], note: 'Дополнительные интеграции обсуждаются отдельно.', pro: true },
];

function Pricing() {
  return (
    <section id="pricing" className="c3-pricing-section relative z-10">
      <Reveal className="pricing-heading">
        <SectionEyebrow label="Форматы и стоимость" />
        <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">Выберите формат проекта.</h2>
      </Reveal>
      <div className="c3-grid">
        {plans.map((plan, index) => <Reveal key={plan.tier} delay={index * .07} className="min-w-0">
          <article className={`c3-card ${plan.pro ? 'c3-card-pro' : ''}`}>
            <div className="relative z-[1] flex h-full flex-col">
              <div className="c3-card-heading"><p className="c3-tier-small">{plan.tier}</p>{plan.popular && <span className="c3-popular-badge">Популярно</span>}</div>
              <p className="c3-tier-large">{plan.price}</p><p className="c3-desc">{plan.description}</p>
              <ul className="c3-list">{plan.features.map((feature) => <li key={feature}><span className="c3-check"><Check size={13} strokeWidth={2.4}/></span><span>{feature}</span></li>)}</ul>
              <div className="c3-note-slot">{plan.note && <p className="c3-note"><Info size={15} strokeWidth={1.7} aria-hidden="true"/><span>{plan.note}</span></p>}</div>
              <a href={`${CONTACT_LINK}&body=${encodeURIComponent(`Здравствуйте! Хочу обсудить формат: ${plan.tier}.`)}`} className="c3-btn">Обсудить формат</a>
            </div>
          </article>
        </Reveal>)}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="closing" className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-32">
      <Reveal className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 text-center md:py-24">
        <div className="cta-glow" aria-hidden="true" />
        <div className="relative z-[1]">
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">Создадим сайт<br/>для вашей компании.</h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-[1.6] text-white/65">Расскажите, чем занимается компания и какие услуги или товары нужно представить. Обсудим структуру, дизайн и стоимость сайта.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><ContactButton label="Написать студии"/><a href="#pricing" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/5">Посмотреть стоимость<ChevronRight size={16}/></a></div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer relative z-10 mx-auto max-w-6xl border-t border-white/10 px-6 py-7 text-xs text-white/55">
      <div className="footer-main">
        <div className="footer-brand flex items-center gap-2 text-white/75"><LogoMark className="h-5 w-5"/><span className="font-medium">Krasnikoff Studio</span></div>
        <span>Разработка сайтов для бизнеса</span>
        <div className="footer-links">
          <a className="footer-social-icon" href={MAX_LINK} target="_blank" rel="noreferrer" aria-label="Написать в MAX" data-tooltip="Написать в MAX"><MessageCircle size={19} strokeWidth={1.8}/></a>
          <a className="footer-social-icon" href={TELEGRAM_LINK} target="_blank" rel="noreferrer" aria-label="Написать в Telegram" data-tooltip="Написать в Telegram"><Send size={18} strokeWidth={1.8}/></a>
          <a className="footer-social-icon" href={CONTACT_LINK} aria-label="Написать на почту" data-tooltip="Написать на почту"><Mail size={19} strokeWidth={1.8}/></a>
        </div>
      </div>
      <div className="footer-legal">
        <strong>Индивидуальный предприниматель Красников Павел Евгеньевич</strong>
        <span>ИНН 636702176058 · ОГРНИП 325632700139102 от 29.08.2025 · Самарская область</span>
        <span>Основной ОКВЭД 63.11.1 · Дополнительные ОКВЭД 62.01, 62.02, 62.09</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0c0c0c] text-white selection:bg-brand/30">
      <Background />
      <Navbar />
      <Hero />
      <ConceptShowcase />
      <ProjectProcess />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}
