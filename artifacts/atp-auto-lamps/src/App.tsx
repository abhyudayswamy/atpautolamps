import { useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronRight,
  CircuitBoard,
  Lightbulb,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  UsersRound,
  Wrench,
  X,
} from 'lucide-react';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Why ATP', href: '#why-atp' },
  { label: 'Industries', href: '#industries' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
];

const reasons = [
  { icon: ShieldCheck, title: 'Reliable Quality', copy: 'Consistent quality for the work your vehicles do every day.' },
  { icon: CircuitBoard, title: 'Practical Solutions', copy: 'Thoughtful lighting and electrical parts that make sense in the real world.' },
  { icon: Truck, title: 'Commercial Vehicle Focus', copy: 'Built around the needs of Indian fleets, workshops, and the aftermarket.' },
  { icon: UsersRound, title: 'Customer-First Service', copy: 'A responsive team that stays close to your requirement from first call.' },
];

const industries = [
  { title: 'Fleet Owners', copy: 'Keep every vehicle ready for its next route.', image: '/indian-fleet-hero.png', icon: Truck },
  { title: 'Bus Operators', copy: 'Practical support for vehicles that move communities.', image: '/automotive-lighting-detail.png', icon: UsersRound },
  { title: 'Automotive Parts Dealers', copy: 'A dependable brand to bring into your network.', image: '/indian-fleet-hero.png', icon: CircuitBoard },
  { title: 'Vehicle Workshops', copy: 'Parts support that respects your time and your craft.', image: '/automotive-lighting-detail.png', icon: Wrench },
  { title: 'Transport Companies', copy: 'Lighting solutions aligned to uptime and duty cycles.', image: '/indian-fleet-hero.png', icon: ArrowRight },
  { title: 'Service Centers', copy: 'A clear, practical partner for day-to-day requirements.', image: '/automotive-lighting-detail.png', icon: Wrench },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src="/atp-logo-tight.png"
      alt="ATP Auto Lamps"
      className={compact ? 'h-11 w-20 object-contain' : 'h-14 w-28 object-contain'}
    />
  );
}

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className={`max-w-2xl ${light ? 'text-white' : ''}`}>
      <p className={`section-kicker ${light ? 'text-[hsl(var(--accent))]' : ''}`}>{eyebrow}</p>
      <h2 className={`mt-4 font-display text-3xl font-semibold tracking-[-0.04em] sm:text-5xl ${light ? 'text-white' : 'text-[hsl(var(--foreground))]'}`}>{title}</h2>
      {copy && <p className={`mt-5 text-base leading-7 ${light ? 'text-white/70' : 'text-[hsl(var(--muted-foreground))]'}`}>{copy}</p>}
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden">
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="container-atp flex h-[84px] items-center justify-between">
          <a href="#top" aria-label="ATP Auto Lamps home" className="focus-ring -ml-4 rounded-xl">
            <Logo />
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => <a className="nav-link focus-ring rounded-sm text-sm font-medium" href={item.href} key={item.href}>{item.label}</a>)}
            <a href="#contact" className="btn-primary focus-ring flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-white">
              Get in Touch <ArrowDownRight size={16} />
            </a>
          </nav>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} className="focus-ring rounded-lg p-2 text-[hsl(var(--foreground))] md:hidden">
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute inset-x-4 top-[76px] rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-[var(--shadow-lg)] md:hidden" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a onClick={closeMenu} className="focus-ring block rounded-xl px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]" href={item.href} key={item.href}>{item.label}</a>
              ))}
              <a onClick={closeMenu} href="#contact" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-sm font-semibold text-white">Get in Touch <ArrowRight size={16} /></a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        <section className="relative isolate min-h-[740px] overflow-hidden bg-[#f6f4ef] pt-28 sm:min-h-[800px]">
          <div className="absolute -right-24 top-28 h-[440px] w-[440px] rounded-full border border-[hsl(var(--primary)/.13)] sm:h-[680px] sm:w-[680px]">
            <div className="absolute inset-8 rounded-full border border-[hsl(var(--secondary)/.12)]" />
          </div>
          <div className="container-atp relative z-10 grid min-h-[620px] items-center gap-10 lg:grid-cols-[.88fr_1.12fr]">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="max-w-xl">
              <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-[hsl(var(--primary))]">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--secondary))]" /> Automotive lighting & electrical parts
              </div>
              <h1 className="font-display text-[clamp(3.35rem,7vw,6.8rem)] font-semibold leading-[.94] tracking-[-.075em] text-[hsl(var(--foreground))]">
                Lighting Solutions <span className="text-[hsl(var(--primary))]">Built for</span> Indian Roads.
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-8 text-[hsl(var(--muted-foreground))]">Reliable automotive lighting and electrical solutions designed for commercial vehicles with a focus on quality, practicality, and dependable performance.</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn-primary focus-ring inline-flex items-center gap-3 rounded-full bg-[hsl(var(--secondary))] px-6 py-3.5 text-sm font-semibold text-white">Contact Us <ArrowRight size={17} /></a>
                <a href="#products" className="btn-outline focus-ring inline-flex items-center gap-3 rounded-full border border-[hsl(var(--primary)/.28)] px-6 py-3.5 text-sm font-semibold text-[hsl(var(--primary))]">View Products <ChevronRight size={17} /></a>
              </div>
              <div className="mt-14 flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[hsl(var(--primary))] shadow-sm"><ShieldCheck size={17} /></span>
                Under Ample Techno Plast
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }} className="image-zoom relative min-h-[340px] overflow-hidden rounded-[2rem] shadow-[var(--shadow-lg)] sm:min-h-[490px]">
              <img src="/indian-fleet-hero.png" alt="Commercial vehicle travelling on an Indian highway" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101b37]/65 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-white/70">For the road ahead</p>
                <p className="mt-2 max-w-sm font-display text-2xl font-medium leading-tight">A practical partner for the vehicles that keep India moving.</p>
              </div>
              <div className="absolute right-5 top-5 rounded-full border border-white/40 bg-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-white backdrop-blur-sm">ATP / 01</div>
            </motion.div>
          </div>
          <div className="container-atp absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center justify-between text-xs uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">
            <span>01 — dependable by design</span><a href="#about" aria-label="Scroll to about ATP" className="focus-ring rounded-full"><ArrowDownRight size={21} /></a>
          </div>
        </section>

        <section id="about" className="scroll-mt-10 bg-white py-24 sm:py-32">
          <div className="container-atp grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr]">
            <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .6 }} className="relative">
              <div className="image-zoom relative h-[390px] overflow-hidden rounded-[1.75rem] bg-[hsl(var(--muted))] sm:h-[470px]">
                <img src="/automotive-lighting-detail.png" alt="Automotive lighting and electrical detail in a workshop" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-7 -right-4 flex h-28 w-28 items-center justify-center rounded-full bg-[hsl(var(--primary))] p-5 text-center text-xs font-semibold leading-4 text-white shadow-[var(--shadow-md)] sm:-right-7">
                <span>Made for<br />Indian roads</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .6, delay: .1 }}>
              <SectionHeading eyebrow="About ATP" title="The work matters. So does the part." copy="ATP Auto Lamps, under Ample Techno Plast, focuses on dependable automotive lighting and electrical parts for commercial vehicles. We aim to provide practical solutions backed by consistent quality and customer-first service." />
              <div className="mt-10 grid gap-6 border-t border-[hsl(var(--border))] pt-7 sm:grid-cols-2">
                <div><p className="font-display text-2xl font-semibold text-[hsl(var(--primary))]">Growing with purpose</p><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">A focused Indian brand, building trust one requirement at a time.</p></div>
                <div><p className="font-display text-2xl font-semibold text-[hsl(var(--secondary))]">Close to the road</p><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Grounded in how commercial vehicles are actually used and maintained.</p></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="why-atp" className="scroll-mt-10 bg-[hsl(var(--muted))] py-24 sm:py-32">
          <div className="container-atp">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Why choose ATP" title="Useful is the new premium." copy="When a vehicle is on the road, confidence is practical. That is the standard we bring to every conversation." />
              <span className="font-display text-6xl font-semibold tracking-[-.08em] text-[hsl(var(--primary)/.13)] sm:text-8xl">02</span>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return <motion.article key={reason.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .45, delay: index * .07 }} className="service-card group relative min-h-[245px] overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white p-7">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border-[14px] border-[hsl(var(--secondary)/.08)] transition-transform duration-500 group-hover:scale-150" />
                  <Icon className="relative z-10 text-[hsl(var(--primary))]" size={27} strokeWidth={1.7} />
                  <h3 className="relative z-10 mt-12 font-display text-xl font-semibold tracking-[-.04em]">{reason.title}</h3>
                  <p className="relative z-10 mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{reason.copy}</p>
                </motion.article>;
              })}
            </div>
          </div>
        </section>

        <section id="industries" className="scroll-mt-10 bg-white py-24 sm:py-32">
          <div className="container-atp">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Who we support" title="Built around the rhythm of the road." copy="From a workshop bay to a multi-vehicle fleet, ATP is here for the people keeping commercial vehicles moving." />
              <span className="font-display text-6xl font-semibold tracking-[-.08em] text-[hsl(var(--secondary)/.15)] sm:text-8xl">03</span>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return <motion.article key={industry.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .5, delay: index * .06 }} className="group relative overflow-hidden rounded-2xl bg-[hsl(var(--foreground))] text-white">
                  <div className="image-zoom h-64 overflow-hidden opacity-80"><img src={industry.image} alt="" className="h-full w-full object-cover mix-blend-luminosity" /></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--foreground))] via-[hsl(var(--foreground)/.4)] to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6"><Icon size={19} className="mb-5 text-[hsl(var(--accent))]" /><h3 className="font-display text-xl font-semibold">{industry.title}</h3><p className="mt-2 text-sm leading-5 text-white/65">{industry.copy}</p></div>
                </motion.article>;
              })}
            </div>
          </div>
        </section>

        <section id="products" className="scroll-mt-10 relative overflow-hidden bg-[hsl(var(--primary))] py-24 sm:py-32">
          <div className="absolute -right-32 -top-40 h-[560px] w-[560px] rounded-full border border-white/10 sm:h-[760px] sm:w-[760px]"><div className="absolute inset-10 rounded-full border border-[hsl(var(--secondary)/.35)]" /></div>
          <div className="container-atp relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_.7fr]">
            <div><SectionHeading light eyebrow="Products" title="A range worth waiting for." copy="Our product range will be updated soon. We are taking the time to build it around what Indian commercial vehicles and their operators actually need." /><button type="button" disabled className="mt-9 inline-flex cursor-not-allowed items-center gap-3 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white/65">Coming Soon <Sparkles size={16} /></button></div>
            <div className="hidden justify-end lg:flex"><div className="flex h-64 w-64 items-center justify-center rounded-full border border-white/20"><div className="flex h-44 w-44 items-center justify-center rounded-full border border-[hsl(var(--secondary)/.45)]"><Lightbulb className="text-[hsl(var(--accent))]" size={63} strokeWidth={1} /></div></div></div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-10 bg-[#f6f4ef] py-24 sm:py-32">
          <div className="container-atp grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <SectionHeading eyebrow="Start a conversation" title="Tell us what keeps you moving." copy="Whether you are sourcing for a fleet, workshop, dealership, or transport operation, our team is ready to listen." />
              <div className="mt-10 space-y-7">
                <a href="tel:8073180468" className="focus-ring group flex items-start gap-4 rounded-xl"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white"><Phone size={18} /></span><span><span className="block text-xs font-semibold uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">Customer care</span><span className="mt-1 block font-display text-xl font-semibold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))]">8073180468</span></span></a>
                <div className="flex items-start gap-4"><span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[hsl(var(--secondary))] shadow-sm"><ArrowRight size={18} /></span><div><p className="text-xs font-semibold uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">Office address</p><p className="mt-1 max-w-xs text-sm leading-6 text-[hsl(var(--foreground))]">10/11, Kebbehalla Main Road, Chandana Layout, Sunkadakatte, Bengaluru, Karnataka – 560091</p></div></div>
              </div>
              <div className="mt-10 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white shadow-sm"><iframe title="ATP Auto Lamps office location" src="https://www.google.com/maps?q=10/11%20Kebbehalla%20Main%20Road%2C%20Chandana%20Layout%2C%20Sunkadakatte%2C%20Bengaluru%20560091&output=embed" className="h-44 w-full border-0 grayscale-[.4]" loading="lazy" /></div>
            </div>
            <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} onSubmit={handleSubmit} className="rounded-[1.75rem] border border-[hsl(var(--border))] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-9">
              <div className="mb-8 flex items-start justify-between gap-4"><div><p className="section-kicker">Inquiry form</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-[-.04em]">Let’s make the next call useful.</h3></div><span className="font-display text-4xl font-semibold tracking-[-.08em] text-[hsl(var(--primary)/.12)]">04</span></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium">Name<input required name="name" type="text" className="focus-ring mt-2 w-full rounded-xl border border-[hsl(var(--border))] bg-[#fdfcf9] px-4 py-3 text-sm outline-none focus:border-[hsl(var(--primary))]" placeholder="Your name" /></label>
                <label className="text-sm font-medium">Company<input name="company" type="text" className="focus-ring mt-2 w-full rounded-xl border border-[hsl(var(--border))] bg-[#fdfcf9] px-4 py-3 text-sm outline-none focus:border-[hsl(var(--primary))]" placeholder="Company name" /></label>
                <label className="text-sm font-medium">Phone<input required name="phone" type="tel" className="focus-ring mt-2 w-full rounded-xl border border-[hsl(var(--border))] bg-[#fdfcf9] px-4 py-3 text-sm outline-none focus:border-[hsl(var(--primary))]" placeholder="Phone number" /></label>
                <label className="text-sm font-medium">Email<input required name="email" type="email" className="focus-ring mt-2 w-full rounded-xl border border-[hsl(var(--border))] bg-[#fdfcf9] px-4 py-3 text-sm outline-none focus:border-[hsl(var(--primary))]" placeholder="you@company.com" /></label>
                <label className="text-sm font-medium sm:col-span-2">Message<textarea required name="message" rows={4} className="focus-ring mt-2 w-full resize-none rounded-xl border border-[hsl(var(--border))] bg-[#fdfcf9] px-4 py-3 text-sm outline-none focus:border-[hsl(var(--primary))]" placeholder="Tell us a little about your requirement" /></label>
              </div>
              <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><button type="submit" className="btn-primary focus-ring inline-flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-6 py-3.5 text-sm font-semibold text-white">Send Inquiry <ArrowRight size={16} /></button>{submitted && <p role="status" className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--primary))]"><Check size={16} /> Thank you. We’ll be in touch soon.</p>}</div>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="bg-[hsl(var(--foreground))] py-14 text-white">
        <div className="container-atp">
          <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.3fr_.7fr_1fr]">
            <div><div className="mb-5 flex w-fit rounded-xl bg-white px-2"><Logo compact /></div><p className="max-w-xs text-sm leading-6 text-white/55">Lighting Solutions Built for Indian Roads.</p><p className="mt-5 text-xs uppercase tracking-[.16em] text-white/35">Under Ample Techno Plast</p></div>
            <div><p className="section-kicker text-[hsl(var(--accent))]">Quick links</p><div className="mt-5 grid gap-3 text-sm text-white/65">{navItems.map((item) => <a className="hover:text-white" href={item.href} key={item.href}>{item.label}</a>)}</div></div>
            <div><p className="section-kicker text-[hsl(var(--accent))]">Contact information</p><a href="tel:8073180468" className="mt-5 block font-display text-lg text-white">8073180468</a><p className="mt-3 max-w-xs text-sm leading-6 text-white/55">10/11, Kebbehalla Main Road, Chandana Layout, Sunkadakatte, Bengaluru, Karnataka – 560091</p></div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-7 text-xs text-white/35 sm:flex-row"><span>© {new Date().getFullYear()} ATP Auto Lamps. All rights reserved.</span><span>Automotive lighting & electrical parts</span></div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;