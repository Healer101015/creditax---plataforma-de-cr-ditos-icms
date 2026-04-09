/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ShieldCheck, Zap, Search, BarChart3,
  MessageSquare, ChevronDown, Menu, X, TrendingUp,
  Globe, CheckCircle2, Building2, Cpu, ArrowUpRight
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const WHATSAPP_LINK = "https://wa.me/5511976270562?text=Olá%20Reginaldo,%20gostaria%20de%20falar%20sobre%20compra%20e%20venda%20de%20ICMS.";

// --- Helper Components ---

const Counter = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = 2000;
    const incrementTime = (totalMiliseconds / end) * 2;

    const timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [value, inView]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const TechBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden bg-[#030712]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
    <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-cyan-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
    <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[150px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Plataforma", href: "#plataforma" },
    { name: "Diferenciais", href: "#diferenciais" },
    { name: "Processo", href: "#como-funciona" },
    { name: "FAQ", href: "#faq" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass-strong py-4 border-b border-white/5" : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-display font-black tracking-tight text-white">
            Credi<span className="text-blue-500">Tax</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden bg-white text-slate-950 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-slate-100 active:scale-95"
          >
            Acessar Portal
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-strong border-b border-white/10 p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-slate-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-4 rounded-xl text-center font-bold"
              >
                Falar com especialista
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <TechBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Plataforma Enterprise de Créditos Fiscais
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.05] mb-8 tracking-tight">
              Liquidez Imediata com <br className="hidden md:block" />
              <span className="text-gradient">Inteligência Tributária</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl font-medium">
              Transforme ativos fiscais em capital de giro. Conectamos grandes geradores de ICMS a empresas que buscam eficiência financeira, com 100% de segurança jurídica.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl text-lg font-bold text-white transition-all glow-blue hover:scale-105 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Falar com Especialista
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a
                href="#plataforma"
                className="px-10 py-5 glass border border-white/10 hover:bg-white/5 rounded-2xl text-lg font-bold text-white transition-all active:scale-95 flex items-center justify-center"
              >
                Conhecer a Plataforma
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Mockup / Abstract UI */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 relative mx-auto max-w-5xl perspective-1000"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-20 h-full w-full bottom-0" />

          <div className="relative rounded-t-3xl overflow-hidden border-t border-l border-r border-white/10 bg-slate-950/80 backdrop-blur-2xl p-6 shadow-[0_-20px_50px_rgba(0,102,255,0.15)] transform rotateX-12 scale-105 origin-bottom h-[400px] md:h-[500px] flex flex-col">
            {/* Mockup Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
              </div>
              <div className="h-4 w-32 bg-white/5 rounded-full" />
            </div>

            {/* Mockup Body */}
            <div className="flex gap-6 flex-1">
              {/* Sidebar */}
              <div className="w-1/4 hidden md:flex flex-col gap-4 border-r border-white/10 pr-6">
                <div className="h-10 w-full bg-blue-500/20 rounded-xl border border-blue-500/30" />
                <div className="h-8 w-3/4 bg-white/5 rounded-lg" />
                <div className="h-8 w-5/6 bg-white/5 rounded-lg" />
                <div className="h-8 w-4/5 bg-white/5 rounded-lg" />
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col gap-6">
                {/* Top Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="h-28 bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col justify-between">
                    <div className="h-3 w-1/2 bg-slate-500/50 rounded-full" />
                    <div className="h-8 w-3/4 bg-white/20 rounded-full" />
                  </div>
                  <div className="h-28 bg-blue-500/10 rounded-2xl border border-blue-500/20 p-5 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 w-24 h-24 bg-blue-500/20 blur-2xl" />
                    <div className="h-3 w-1/2 bg-blue-400/50 rounded-full relative z-10" />
                    <div className="h-8 w-4/5 bg-blue-400/80 rounded-full relative z-10" />
                  </div>
                  <div className="h-28 bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col justify-between">
                    <div className="h-3 w-1/2 bg-slate-500/50 rounded-full" />
                    <div className="h-8 w-2/3 bg-white/20 rounded-full" />
                  </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-6 relative overflow-hidden flex items-end gap-3">
                  {/* Abstract Bars */}
                  {[40, 70, 45, 90, 65, 85, 100, 60, 75, 50, 80, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/50 to-cyan-400/50 rounded-t-md" style={{ height: `${h}%` }} />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none" />
          </div>

          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute top-1/4 -right-4 md:-right-12 z-30 glass-strong border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Auditoria em Tempo Real</p>
              <p className="text-slate-400 text-xs">Sistema 100% Operante</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const AudienceSplit = () => {
  return (
    <section id="plataforma" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black text-white mb-6"
          >
            Ecossistema de <span className="text-gradient">Alta Performance</span>
          </motion.h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Soluções desenhadas especificamente para as necessidades de cada ponta da operação.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Comprador */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative glass p-10 md:p-14 rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-blue-500/30 transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-colors duration-500" />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-8 text-blue-400">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-4">Para Compradores</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Reduza sua carga tributária mensal adquirindo créditos validados com deságios estratégicos. Maximize sua margem de lucro com segurança total.
              </p>

              <ul className="space-y-4 mb-10">
                {["Economia direta no pagamento de ICMS", "Melhora imediata no fluxo de caixa", "Processo 100% auditado e seguro"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>

              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
                Simular economia <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Vendedor */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative glass p-10 md:p-14 rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-purple-500/30 transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-colors duration-500" />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-2xl flex items-center justify-center mb-8 text-purple-400">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-4">Para Vendedores</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Transforme saldos credores acumulados em capital de giro. Encontramos os melhores compradores para monetizar seu ativo fiscal rapidamente.
              </p>

              <ul className="space-y-4 mb-10">
                {["Liquidez imediata para o caixa da empresa", "Fim da desvalorização do crédito retido", "Burocracia e homologação por nossa conta"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>

              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300 transition-colors">
                Avaliar meus créditos <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Differentials = () => {
  return (
    <section id="diferenciais" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black text-white mb-6 max-w-2xl"
          >
            A infraestrutura mais <span className="text-gradient">robusta</span> do mercado
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Item 1 - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ShieldCheck className="w-12 h-12 text-blue-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Segurança Jurídica Inabalável</h3>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Cada transação é blindada por contratos rigorosos e compliance total com as diretrizes do SEFAZ. Nossa auditoria documental garante risco zero para ambas as partes.
            </p>
          </motion.div>

          {/* Item 2 - Small */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Zap className="w-12 h-12 text-cyan-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Agilidade Extrema</h3>
            <p className="text-slate-400 leading-relaxed">
              Processos digitalizados que reduzem o tempo de negociação e homologação em até 60%.
            </p>
          </motion.div>

          {/* Item 3 - Small */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Search className="w-12 h-12 text-purple-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Transparência Total</h3>
            <p className="text-slate-400 leading-relaxed">
              Acompanhamento em tempo real de cada etapa da sua transação através de relatórios detalhados.
            </p>
          </motion.div>

          {/* Item 4 - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 glass p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Cpu className="w-12 h-12 text-indigo-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Tecnologia Preditiva</h3>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Nossos algoritmos analisam o mercado em tempo real para conectar compradores e vendedores com o melhor match de deságio e volume, otimizando o resultado financeiro.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Institutional = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-950/20 -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-strong rounded-[3rem] p-12 md:p-24 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Building2 className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">Institucional</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-8 leading-tight">
              Transformando complexidade tributária em <span className="text-gradient">resultados financeiros sólidos.</span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-12">
              A CrediTax nasceu com o propósito de destravar o valor retido nos balanços das empresas brasileiras. Combinamos expertise jurídica profunda com tecnologia de ponta para criar um mercado secundário de créditos fiscais eficiente, líquido e absolutamente seguro.
            </p>

            <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <p className="text-4xl font-black text-white mb-2"><Counter value={15} suffix="+" /></p>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Anos de Mercado</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white mb-2"><Counter value={500} prefix="R$ " suffix="M" /></p>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Volume Transacionado</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white mb-2"><Counter value={100} suffix="%" /></p>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Taxa de Sucesso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Análise Preditiva", desc: "Nossa IA avalia a origem e a validade dos créditos com precisão cirúrgica.", icon: "01" },
    { title: "Compliance Digital", desc: "Auditoria automatizada e jurídica para garantir 100% de segurança na operação.", icon: "02" },
    { title: "Matching Inteligente", desc: "Algoritmos conectam as partes com os melhores deságios do mercado B2B.", icon: "03" },
    { title: "Liquidação Instantânea", desc: "Acompanhamento em tempo real até a homologação e liquidação financeira.", icon: "04" },
  ];

  return (
    <section id="como-funciona" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black text-white mb-6"
          >
            Fluxo de <span className="text-gradient">Alta Tecnologia</span>
          </motion.h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Processos otimizados que eliminam a burocracia e aceleram seus resultados financeiros.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-600/0 via-blue-500/50 to-blue-600/0 hidden md:block -z-10" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative text-center group"
            >
              <div className="w-24 h-24 mx-auto glass rounded-full flex items-center justify-center mb-8 relative border border-white/10 group-hover:border-blue-500/50 transition-colors duration-500">
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 group-hover:from-blue-400 group-hover:to-cyan-300 transition-all">
                  {step.icon}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "O que são créditos de ICMS?", a: "São créditos fiscais acumulados por empresas em operações de exportação, diferimento ou quando a alíquota de entrada é maior que a de saída, permitindo sua compensação ou transferência." },
    { q: "É seguro comprar créditos de terceiros?", a: "Absolutamente. Nosso processo passa por uma auditoria jurídica e documental rigorosa, garantindo conformidade total com as normas da Secretaria da Fazenda (SEFAZ) antes de qualquer transação." },
    { q: "Qual o prazo médio para conclusão de uma transação?", a: "Graças à nossa tecnologia e processos digitalizados, reduzimos o tempo médio de 90 para 30 a 60 dias até a homologação final, dependendo do estado." },
    { q: "Quais estados a CrediTax atende?", a: "Atuamos em todo o território nacional, com infraestrutura especializada nos estados com maior volume de créditos acumulados como SP, MG, RS, PR e SC." },
  ];

  return (
    <section id="faq" className="py-32 relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-black text-white mb-6">Perguntas Frequentes</h2>
          <p className="text-slate-400">Transparência total sobre nossa operação.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass rounded-2xl border border-white/5 overflow-hidden transition-colors hover:border-white/10">
              <button
                className="w-full p-6 text-left flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-bold text-white text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const text = `Olá Reginaldo! Tenho interesse em operações de ICMS.

*Nome:* ${data.name}
*Empresa:* ${data.company}
*Perfil:* ${data.profile}
*Volume Estimado:* ${data.volume || 'Não informado'}
*Mensagem:* ${data.message}`;

    const whatsappUrl = `https://wa.me/5511976270562?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 backdrop-blur-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 -z-10" />

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Text Side */}
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight tracking-tight">
                Inicie sua <br />
                <span className="text-gradient">análise premium</span>
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Preencha o formulário ao lado para que nossos especialistas entendam seu cenário. Entraremos em contato via WhatsApp com uma proposta personalizada de liquidez ou aquisição.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10">
                    <ShieldCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Sigilo Absoluto</h4>
                    <p className="text-sm text-slate-400">Seus dados estão protegidos por NDA.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10">
                    <Zap className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Retorno Rápido</h4>
                    <p className="text-sm text-slate-400">Análise preliminar em até 24 horas.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="glass p-8 md:p-10 rounded-[2rem] border border-white/10 relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none" />

              <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-300">Nome Completo</label>
                    <input required type="text" id="name" name="name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="João Silva" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-sm font-semibold text-slate-300">Empresa</label>
                    <input required type="text" id="company" name="company" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="Sua Empresa LTDA" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="profile" className="text-sm font-semibold text-slate-300">Seu Perfil</label>
                    <select required id="profile" name="profile" defaultValue="" className="bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                      <option value="" disabled>Selecione...</option>
                      <option value="Quero Vender ICMS">Quero Vender ICMS</option>
                      <option value="Quero Comprar ICMS">Quero Comprar ICMS</option>
                      <option value="Apenas Dúvidas">Apenas Dúvidas</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="volume" className="text-sm font-semibold text-slate-300">Volume Estimado (R$)</label>
                    <input type="text" id="volume" name="volume" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="Ex: 500.000,00" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-300">Mensagem Adicional</label>
                  <textarea required id="message" name="message" rows={3} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none" placeholder="Conte-nos um pouco mais sobre sua necessidade..."></textarea>
                </div>

                <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all glow-blue active:scale-95 flex items-center justify-center gap-2 w-full">
                  Enviar para WhatsApp <ArrowUpRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#02040A] text-slate-400 py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-display font-black text-white tracking-tight">
                Credi<span className="text-blue-500">Tax</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-8 text-slate-500">
              A infraestrutura definitiva para monetização e gestão de créditos fiscais no Brasil.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#plataforma" className="hover:text-blue-400 transition-colors">Para Compradores</a></li>
              <li><a href="#plataforma" className="hover:text-blue-400 transition-colors">Para Vendedores</a></li>
              <li><a href="#como-funciona" className="hover:text-blue-400 transition-colors">Como Funciona</a></li>
              <li><a href="#diferenciais" className="hover:text-blue-400 transition-colors">Segurança Jurídica</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Institucional</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Imprensa</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contato Direto</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                rjsabc@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-blue-500" />
                São Paulo - SP
              </li>
              <li className="flex items-center gap-3 font-bold text-white mt-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                  +55 11 97627-0562 <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 CrediTax Soluções Tributárias. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#030712] font-sans text-slate-200 selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Institutional />
        <AudienceSplit />
        <HowItWorks />
        <Differentials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
