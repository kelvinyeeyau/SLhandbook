// src/App.tsx – Vite + React + TypeScript + Tailwind CSS
// Single‑page Streetlifting Handbook with sidebar nav (similar layout to tfthandbook.com)
// Sections: Programming · Form Analysis · Diet · Workout Routines · Warm‑Up & Rehab
// Requirements: framer‑motion, react‑router‑dom, shadcn/ui components. All styling via Tailwind classes.

import { FC, ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ────────────────────────────────────────────────────────────────────────────────
// Helper Types & Components
// ────────────────────────────────────────────────────────────────────────────────
interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ id, title, children }) => (
  <motion.section
    id={id}
    className="scroll-mt-28 space-y-4"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
    {children}
  </motion.section>
);

const SECTIONS: { id: string; title: string }[] = [
  { id: "programming", title: "Programming" },
  { id: "form", title: "Form Analysis" },
  { id: "diet", title: "Diet & Nutrition" },
  { id: "workouts", title: "Workout Routines" },
  { id: "warmup", title: "Warm‑Up & Rehab" },
];

// ────────────────────────────────────────────────────────────────────────────────
// Main App Component
// ────────────────────────────────────────────────────────────────────────────────
export const App: FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <aside className="hidden md:block w-72 fixed inset-y-0 left-0 bg-gray-900/80 backdrop-blur-sm border-r border-gray-700/40 px-6 py-8 overflow-y-auto">
          <h1 className="text-xl font-semibold text-white mb-6">Streetlifting Handbook</h1>
          <nav className="space-y-2">
            {SECTIONS.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-0 md:ml-72 px-6 sm:px-10 py-12 max-w-5xl mx-auto space-y-24">
          {/* ── Programming ─────────────────────────────────────── */}
          <Section id="programming" title="Programming">
            <Card className="bg-white/5 border border-gray-700/50">
              <CardContent className="space-y-4 leading-relaxed">
                <p>
                  Establish <strong>foundation strength</strong> in the four competition lifts (weighted
                  pull‑ups, dips, muscle‑ups & back squats). Once you can perform
                  <em>3 × 8</em> body‑weight pull‑ups & dips plus full‑depth squats, begin adding weight in
                  small increments while reducing reps to 5–6.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Beginner → full‑body 2×/week, then 3×/week</li>
                  <li>Intermediate → Push/Pull/Legs or Upper/Lower ×2</li>
                  <li>8‑week cycles: 4‑wk volume • 4‑wk intensity • 1‑wk deload</li>
                  <li>Track <code className="text-indigo-400">sets × reps × load</code>; change one variable at a time</li>
                </ul>
                <Button variant="secondary" asChild>
                  <a href="#workouts">See Sample Routines ↓</a>
                </Button>
              </CardContent>
            </Card>
          </Section>

          {/* ── Form Analysis ──────────────────────────────────── */}
          <Section id="form" title="Form Analysis">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="space-y-3 py-4">
                  <h3 className="font-semibold text-lg">DIY Video Review</h3>
                  <p>
                    Record sets side‑on with your phone & compare against the in‑app overlay.
                    Check full ROM, core tension, and minimal swing.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-3 py-4">
                  <h3 className="font-semibold text-lg">AI Pose Tracking (Beta)</h3>
                  <p>
                    Webcam module (MediaPipe + TensorFlow.js) detects joint angles and flags
                    faults such as elbow flare or shallow squats. Real‑time cues coming soon.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* ── Diet & Nutrition ──────────────────────────────── */}
          <Section id="diet" title="Diet & Nutrition">
            <p>
              Target a <strong>high strength‑to‑weight ratio</strong>: roughly 10–15 % body‑fat for men,
              18–25 % for women. Keep protein ≥ 1.6 g/kg and adjust calories ± 15 % depending on
              goal.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 text-sm">
              {[
                { color: "green", heading: "Muscle Gain", items: ["Surplus 10–15 %", "2 g/kg protein", "Carbs ≈ 50 %"] },
                { color: "blue", heading: "Fat Loss", items: ["Deficit 15 %", "Protein 2 g/kg", "Carb‑cycle"] },
                { color: "purple", heading: "Performance", items: ["Maintenance kcal", "Focus on recovery", "Hydrate ≥ 3 L"] },
              ].map(({ color, heading, items }) => (
                <div key={heading} className={`bg-${color}-200/5 border border-${color}-400/30 rounded-lg p-4`}>
                  <h4 className="font-medium mb-2">{heading}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Workout Routines ───────────────────────────────── */}
          <Section id="workouts" title="Workout Routines">
            <div className="space-y-8">
              {/* Beginner */}
              <Card>
                <CardContent className="space-y-2 py-4">
                  <h3 className="font-semibold">Beginner – 2 Days / Week</h3>
                  <pre className="bg-gray-800/70 text-gray-100 text-xs p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
Day 1 • Pull + Push
  • Assisted Pull‑Ups 3×8‑10
  • Bench Dips        3×10
  • Body‑weight Squats 3×12
Day 2 • Full Body
  • Inverted Rows     3×10
  • Push‑Ups          3×12
  • Walking Lunges    3×12 ea.
  • Hollow Hold       3×20 s</pre>
                </CardContent>
              </Card>
              {/* Intermediate */}
              <Card>
                <CardContent className="space-y-2 py-4">
                  <h3 className="font-semibold">Intermediate – Push / Pull / Legs</h3>
                  <pre className="bg-gray-800/70 text-gray-100 text-xs p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
Push
  • Weighted Dips        5×5
  • Dumbbell OHP         4×8
  • Ring Push‑Ups        3×AMRAP
Pull
  • Weighted Pull‑Ups    5×5
  • Barbell Rows         4×8
  • Biceps Curls         3×12
Legs
  • Back Squat           4×6
  • Romanian DL          3×8
  • Box Pistol Prog.     3×6 ea.</pre>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* ── Warm‑Up & Rehab ──────────────────────────────── */}
          <Section id="warmup" title="Warm‑Up & Rehab">
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">5‑Minute Dynamic Warm‑Up</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Jump Rope × 2 min</li>
                  <li>Cat‑Cow × 6</li>
                  <li>Band Dislocates × 15</li>
                  <li>Scap Pull‑ & Push‑Ups × 8</li>
                  <li>Deep Squat Hold 30 s</li>
                </ol>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Elbow Tendonitis Rehab</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Rest from painful vertical pulls 1–2 weeks</li>
                  <li>Eccentric Reverse Wrist Curls 3×15</li>
                  <li>Forearm Massage (ball) 5 min/day</li>
                  <li>Return → neutral‑grip rows then pull‑ups</li>
                </ul>
              </div>
            </div>
            <Button variant="secondary" className="mt-6" asChild>
              <a href="#programming">Back to Top ↑</a>
            </Button>
          </Section>

          <footer className="text-center text-sm text-gray-500 py-8">
            Built with ❤️ in React + Tailwind — 2025
          </footer>
        </main>
      </div>
    </Router>
  );
};
