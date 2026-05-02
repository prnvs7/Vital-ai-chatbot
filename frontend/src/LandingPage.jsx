import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    Brain,
    Clock3,
    Sparkles,
    ShieldCheck,
    MessageSquareText,
    ClipboardList,
    Activity,
} from 'lucide-react'

const features = [
    {
        icon: Clock3,
        title: 'Fast Diagnosis',
        description: 'Get a quick first-pass symptom check in a clean, guided flow.',
    },
    {
        icon: Brain,
        title: 'AI Analysis',
        description: 'Powered by AI to help summarize likely causes and next steps.',
    },
    {
        icon: MessageSquareText,
        title: 'Simple Interface',
        description: 'A focused chat experience designed for clarity on every device.',
    },
]

const steps = [
    {
        number: '01',
        title: 'Enter symptoms',
        description: 'Describe what you are feeling in plain language.',
    },
    {
        number: '02',
        title: 'AI analysis',
        description: 'The assistant evaluates the details and organizes the response.',
    },
    {
        number: '03',
        title: 'Get results',
        description: 'Review likely causes, triage guidance, and suggested actions.',
    },
]

function FeatureCard({ icon: Icon, title, description }) {
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300 ring-1 ring-white/10">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
        </motion.div>
    )
}

function StepCard({ number, title, description }) {
    return (
        <div className="relative rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
            <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-200">
                {number}
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
        </div>
    )
}

export default function LandingPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070b1d] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.24),_transparent_22%),linear-gradient(135deg,_#070b1d_0%,_#0f172a_45%,_#111827_100%)]" />
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

            <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
                <header className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/80">Vital AI</p>
                            <p className="text-xs text-slate-400">AI-powered symptom checker</p>
                        </div>
                    </div>

                    <Link
                        to="/chat"
                        className="hidden rounded-full border border-white/15 bg-white/6 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-md transition hover:border-cyan-300/40 hover:bg-white/10 sm:inline-flex"
                    >
                        Start Chat
                    </Link>
                </header>

                <section className="grid flex-1 items-center gap-14 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="max-w-2xl"
                    >
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur-md">
                            <Sparkles className="h-4 w-4" />
                            Fast, guided symptom checking in one place
                        </div>

                        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                            Vital AI
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
                            AI-powered symptom checker that helps you describe symptoms, review likely causes, and get next-step guidance in a calm, modern chat experience.
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Link
                                to="/chat"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:scale-[1.03] hover:shadow-cyan-400/30"
                            >
                                Start Chat
                                <ArrowRight className="h-5 w-5" />
                            </Link>

                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-6 py-4 text-sm text-slate-300 backdrop-blur-md">
                                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                                Clean, responsive, and easy to use
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        className="relative"
                    >
                        <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl" />
                        <div className="absolute -right-6 bottom-6 h-28 w-28 rounded-full bg-blue-500/20 blur-3xl" />

                        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-7">
                            <div className="rounded-[1.6rem] border border-white/10 bg-slate-950/40 p-5">
                                <div className="mb-4 flex items-center gap-3 text-sm text-slate-300">
                                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                    Live symptom assistant preview
                                </div>

                                <div className="space-y-4">
                                    <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-gradient-to-r from-fuchsia-500/80 to-pink-500/80 px-4 py-3 text-sm leading-6 text-white shadow-lg">
                                        I have been feeling dizzy and nauseous since morning.
                                    </div>
                                    <div className="max-w-[90%] rounded-2xl rounded-tl-md border border-white/10 bg-white/8 px-4 py-3 text-sm leading-6 text-slate-200">
                                        I can help summarize possible causes, triage level, and simple next steps.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                <section className="pb-8 pt-2 sm:pb-12">
                    <div className="mb-6 flex items-center gap-3">
                        <ClipboardList className="h-5 w-5 text-cyan-300" />
                        <h2 className="text-2xl font-semibold text-white">Features</h2>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {features.map((feature) => (
                            <FeatureCard key={feature.title} {...feature} />
                        ))}
                    </div>
                </section>

                <section className="pb-8 sm:pb-12">
                    <div className="mb-6 flex items-center gap-3">
                        <Brain className="h-5 w-5 text-cyan-300" />
                        <h2 className="text-2xl font-semibold text-white">How it works</h2>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {steps.map((step) => (
                            <StepCard key={step.number} {...step} />
                        ))}
                    </div>
                </section>

                <footer className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-sm text-slate-400 sm:flex-row sm:items-center">
                    <p>Vital AI helps you organize symptoms before deciding what to do next.</p>
                    <Link to="/chat" className="text-cyan-300 transition hover:text-cyan-200">
                        Start Chat
                    </Link>
                </footer>
            </main>
        </div>
    )
}