import React from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { BlurImageBackground } from "../components/ui/blur-image-background";
import OptimizedImage from "../components/ui/optimized-image";
import { ThreeDMarquee } from "../components/ui/3d-marquee";
import CaseStudyNav from "../components/ui/case-study-nav";
import { getNavigation } from "../config/case-studies";

const teamMembers = [
  {
    name: "Opeyemi Ajagbe",
    designation: "Creator & Lead Developer",
    image: "/images/avatar.png",
  },
  {
    name: "Thompson Edolo",
    designation: "Developer",
    image: "/images/tom.jpg",
  },
];

const TryButton = () => (
  <a
    href="https://www.figma.com/community/plugin/1513874084032014970/ux-buddy"
    target="_blank"
    rel="noopener noreferrer"
    className="relative inline-flex items-center overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
  >
    <span className="absolute inset-[-1000%] motion-safe:animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9333EA_0%,#3B82F6_50%,#9333EA_100%)]" />
    <span className="relative inline-flex items-center px-6 py-3 font-medium transition-all bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg group">
      <img
        src="/images/figma-logo.svg"
        alt=""
        aria-hidden="true"
        className="mr-2 w-5 h-5 transition-opacity group-hover:opacity-70 brightness-0 invert"
      />
      <span className="text-white group-hover:text-neutral-100">Try UX Buddy</span>
      <svg
        className="ml-2 w-4 h-4 text-white group-hover:text-neutral-100"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </span>
  </a>
);

export default function UXBuddy() {
  const { prevCase, nextCase } = getNavigation("ux-buddy");

  return (
    <>
      <main className="min-h-screen bg-neutral-950 text-white">
        {/* Hero */}
        <BlurImageBackground
          imageSrc="/images/UX-buddy.png"
          className="min-h-[60vh] flex items-center justify-center pt-24 md:pt-16"
          overlayClassName="bg-black/60"
        >
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-purple-500/60 motion-safe:animate-pulse" aria-hidden="true"></div>
                <img
                  src="/images/uxbuddy.svg"
                  alt=""
                  aria-hidden="true"
                  className="w-24 h-24 md:w-32 md:h-32 relative z-10 drop-shadow-2xl"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-4">
              UX Buddy
            </h1>
            <p className="text-white text-center max-w-3xl mx-auto text-2xl md:text-3xl mb-4 font-semibold">
              The Future of Feedback
            </p>
            <p className="text-neutral-200 text-center max-w-3xl mx-auto text-lg md:text-xl mb-10">
              An AI design co-pilot that brings the review meeting forward.
            </p>

            <div className="flex justify-center mb-12">
              <TryButton />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Role</h3>
                <p className="text-white font-medium">Creator & Lead Developer</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Platform</h3>
                <p className="text-white font-medium">Figma Plugin</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Timeline</h3>
                <p className="text-white font-medium">~3 months (solo, evenings & weekends)</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Team</h3>
                <div className="flex justify-center">
                  <AnimatedTooltip items={teamMembers} />
                </div>
              </div>
            </div>
          </div>
        </BlurImageBackground>

        {/* Context */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">Context</h2>
            <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed">
              <p>
                UX Buddy is a Figma plugin built for product designers — a quiet, in-canvas reviewer that critiques the screen you are working on before you take it into a stakeholder meeting. I built it as a solo project with developer Thompson Edolo on the hardest pieces, over roughly three months of evenings and weekends.
              </p>
              <p>
                Before UX Buddy existed, my own work had a recurring shape: a project that should have wrapped on Friday would slip into weeks of review cycles. Stakeholder meetings surfaced feedback that could have been spotted earlier; developers found UX issues during handoff; each loop meant more changes, more time, more frustration. Talking to other designers turned that pattern into a signal — the same waste was showing up across teams and tools.
              </p>
              <p>
                The trigger was personal. I wanted a design co-pilot beside me in Figma giving thoughtful UX feedback as I worked, instead of waiting for the next review to find out what I had missed.
              </p>
            </div>
            <div className="mt-12 bg-neutral-900/50 backdrop-blur-md rounded-xl border border-neutral-800 p-2">
              <OptimizedImage
                src="/images/the-vision.png"
                alt="UX Buddy vision: Figma workspace with the analysis panel docked alongside a design file."
                className="rounded-lg"
                priority={true}
              />
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-16 md:py-24 px-4 bg-neutral-900/40">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">Problem</h2>
            <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-8">
              Designers were getting their most important feedback at the wrong time — after the meeting, after handoff, after the cycle had already cost a week.
            </p>
            <ul className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed mb-8 list-disc pl-6 marker:text-purple-400">
              <li>
                Stakeholder reviews repeatedly surfaced UX issues a designer could have caught alone, given a structured second pair of eyes.
              </li>
              <li>
                Developers flagged UX problems at handoff that should have been resolved upstream — a recognition tax paid in re-work, not in the design phase.
              </li>
              <li>
                Existing audit tools either felt cold and checklist-shaped, or required leaving the canvas — both broke flow.
              </li>
            </ul>

            <blockquote className="border-l-4 border-purple-500 bg-neutral-900/60 rounded-r-lg p-6 mb-8">
              <p className="text-white text-base md:text-lg italic leading-relaxed">
                "I ran UX Buddy before my review — it caught three things I would've missed. The meeting went so much smoother."
              </p>
              <footer className="mt-2 text-neutral-400 text-sm not-italic">
                — Junior designer, early access tester
              </footer>
            </blockquote>

            <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-6 italic">
              Quantitative review-cycle and per-analysis issue baselines were not formally tracked pre-launch — current install and weekly-active counts on Figma Community are being pulled in. Numbers will replace this note once instrumentation lands.
            </p>

            <div className="rounded-lg border-l-4 border-purple-500 bg-neutral-900/60 p-6">
              <p className="text-neutral-200 text-base md:text-lg leading-relaxed">
                <span className="font-semibold text-white">Cost of inaction:</span> every late-arriving piece of feedback was a designer's afternoon spent re-doing work that a five-minute pre-review check could have prevented.
              </p>
            </div>
          </div>
        </section>

        {/* Constraints */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">Constraints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-3">Figma plugin sandbox</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  No direct web APIs, restricted storage, strict UI ↔ core message passing. The whole architecture had to live inside that bottle.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-3">Solo build, lean engineering</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  One designer-developer plus Thompson on the hardest bits — no room for scope creep, no team to absorb a re-architecture.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-3">AI unpredictability</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Re-running an analysis on the same file could return a fresh list of issues, breaking the designer's trust in the tool.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-3">Accessibility math on transparent layers</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  WCAG 2.1 AA contrast had to account for backgrounds beneath semi-transparent elements — the naive calculation was wrong.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 md:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-3">Tone, not just correctness</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  A cold audit voice would have shipped on time and still failed — designers receive feedback emotionally; the language had to be conversational, calm, kind.
                </p>
              </div>
            </div>
            <div className="mt-10 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 p-6">
              <p className="text-neutral-200 text-base md:text-lg leading-relaxed">
                When constraints collided, the tradeoff lens was{" "}
                <span className="font-semibold text-white">trust over feature breadth</span> — every decision optimized for "would a designer believe this output and act on it?" over "how much can the tool detect?"
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24 px-4 bg-neutral-900/40">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-12">Process</h2>
            <ol className="space-y-16">
              {/* Beat 1 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">01</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    Reframed the problem from audit to companion.
                  </h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    The first instinct was a checklist tool — alignment, contrast, spacing pass/fail. Designer interviews reframed it: what they wanted was the review meeting brought forward, in a voice they trusted.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Jobs-to-Be-Done:</span> designers were not hiring an audit tool, they were hiring a calmer review experience.
                  </p>
                </div>
              </li>

              {/* Beat 2 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">02</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    Locked a structured response rhythm: Strengths → Opportunities → Recommendations.
                  </h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    Early outputs were a wall of issues. Every analysis got restructured into the same three-beat rhythm — a predictable shape to scan and act on.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Chunking + Progressive Disclosure:</span> short, structured, human. Leading with strengths lowered the emotional cost of receiving the rest.
                  </p>
                </div>
                <div className="mt-8 rounded-lg overflow-hidden">
                  <img
                    src="/images/ux-buddy-chart.png"
                    alt="UX Buddy flow: Select → Analyze → Review → Iterate → Track."
                    className="w-full h-auto object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </li>

              {/* Beat 3 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">03</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    Solved contrast on transparent layers.
                  </h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    WCAG contrast on a semi-transparent button kept failing — math fell apart without the background underneath. Factoring resolved background color in unlocked accurate accessibility on real Figma compositions, not opaque mockups.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Accessibility floor (WCAG 2.1 AA):</span> wrong here would have made the tool untrustworthy on ship-blocking issues.
                  </p>
                </div>
                <div className="mt-8 rounded-lg overflow-hidden">
                  <img
                    src="/images/analysis.png"
                    alt="Before/after: contrast feedback on a transparent-layer button. Left: naive contrast result. Right: corrected reading factoring in resolved background color."
                    className="w-full h-auto object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </li>

              {/* Beat 4 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">04</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    Split the plugin into two cooperating processes.
                  </h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    Figma's sandbox forced the shape: a data process (layers, screenshots) and a UI process exchanging lightweight messages, plus a smart cache over <code className="px-1.5 py-0.5 rounded bg-neutral-800 text-purple-300">clientStorage</code> for analysis persistence.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Constraint-as-protagonist:</span> every limit became a design decision.
                  </p>
                  <p className="text-neutral-500 italic text-sm">
                    System diagram (16:9, two-process architecture + <code className="px-1 py-0.5 rounded bg-neutral-800 text-purple-300/80 not-italic">clientStorage</code> cache layer) is in flight — will land before this case study moves into the portfolio rotation.
                  </p>
                </div>
              </li>

              {/* Beat 5 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">05</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    Taught the plugin to remember.
                  </h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    Biggest trust break: re-running an analysis returned a fresh list. Fix: diff each run against the previous, tag items{" "}
                    <span className="text-green-400 font-semibold">✅ Resolved</span>,{" "}
                    <span className="text-purple-400 font-semibold">🆕 New</span>,{" "}
                    <span className="text-blue-400 font-semibold">🔁 Ongoing</span>.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Recognition over Recall + Doherty Threshold:</span> no mental load, sub-second response.
                  </p>
                  <p className="font-semibold text-white">
                    This was the move that turned the plugin from critic into mentor.
                  </p>
                </div>
              </li>
            </ol>

            {/* Discarded direction */}
            <div className="mt-16 rounded-lg border-l-4 border-neutral-600 bg-neutral-900/60 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Discarded direction: the cold-audit voice</h3>
              <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                An early version mimicked accessibility scanners — flat issue list, severity tags. Accurate, awful to use. Killed it for the rhythm above. Lesson: in a tool designers reach for under deadline pressure, tone is not polish — it is product.
              </p>
            </div>
          </div>
        </section>

        {/* Outcome */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">Outcome</h2>
            <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed">
              <p>
                Headline: <span className="font-semibold text-white">the first analysis that felt human</span> — a coworker test where the plugin surfaced, in seconds, issues that had previously taken an entire review meeting to spot. The reaction in the room was the Peak-End signal: wide eyes, then <em>"can I get access?"</em>
              </p>
              <p className="font-semibold text-white">Supporting signals:</p>
              <ul className="space-y-3 list-disc pl-6 marker:text-purple-400">
                <li>
                  A junior designer reported running UX Buddy before a review and catching three issues that would have otherwise landed in the meeting — feedback moved upstream, exactly where the tool was aimed.
                </li>
                <li>
                  The plugin shipped publicly on the Figma Community:{" "}
                  <a
                    href="https://www.figma.com/community/plugin/1513874084032014970/ux-buddy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 underline underline-offset-4 hover:text-purple-200"
                  >
                    UX Buddy on Figma Community
                  </a>
                  .
                </li>
                <li>
                  The diff-tagging behavior (
                  <span className="text-green-400 font-semibold">✅ Resolved</span> /{" "}
                  <span className="text-purple-400 font-semibold">🆕 New</span> /{" "}
                  <span className="text-blue-400 font-semibold">🔁 Ongoing</span>) became the most-cited reason testers said the tool felt like a mentor rather than a critic — the architecture decision in Process beat 5 was the one that earned trust.
                </li>
              </ul>
              <p className="text-neutral-400 italic">
                Install / weekly active counts and a structured tester satisfaction signal are being pulled from the Figma Community dashboard — this section will swap to a numeric headline once those land.
              </p>
            </div>

            <blockquote className="mt-12 border-l-4 border-purple-500 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-r-lg p-6 md:p-8">
              <p className="text-white text-lg md:text-xl italic leading-relaxed mb-3">
                "It feels like having a calm, honest mentor by your side — one who notices the details you miss and cheers when you improve."
              </p>
              <footer className="text-neutral-400 text-sm md:text-base not-italic">
                — Tester, early access
              </footer>
            </blockquote>

            <div className="mt-12 rounded-lg bg-neutral-900/50 border border-neutral-800 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-white mb-3">Residual risks &amp; follow-ups</h3>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                The next iteration adds a persistence layer that saves every analysis to a database, so designers can track accessibility and usability scores across versions and see their own growth over time. Tone calibration is the other open thread — designers receive feedback emotionally, and there is more to tune in language, timing, and the order of strengths vs. opportunities than the current rhythm captures. Longer term, UX Buddy is positioned to become a family of empathetic design tools that understand intent, not just pixels.
              </p>
            </div>

            {/* Showcase marquee */}
            <div className="mt-16 space-y-4">
              <div className="mx-auto max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
                <ThreeDMarquee
                  images={[
                    "/3d-marquee/Login.png",
                    "/3d-marquee/OTP.png",
                    "/3d-marquee/Frame-selection.png",
                    "/3d-marquee/Frame-selection-1.png",
                    "/3d-marquee/Background-7.png",
                    "/3d-marquee/Top-up.png",
                    "/3d-marquee/Log-out-confirmation.png",
                    "/3d-marquee/Log-out-confirmation-1.png",
                    "/3d-marquee/Background.png",
                    "/3d-marquee/Background-2.png",
                    "/3d-marquee/Background-3.png",
                    "/3d-marquee/Background-4.png",
                    "/3d-marquee/Background-5.png",
                    "/3d-marquee/Background-6.png",
                  ]}
                />
              </div>
              <p className="text-neutral-400 italic text-center max-w-lg mx-auto">
                Sample screens analyzed by UX Buddy across a real product flow.
              </p>
            </div>

            {/* Final CTA */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to bring the review forward?
              </h3>
              <p className="text-neutral-300 text-base md:text-lg max-w-2xl mx-auto mb-8">
                Get instant, expert-level UX feedback directly in Figma.
              </p>
              <div className="flex justify-center">
                <TryButton />
              </div>
            </div>
          </div>
        </section>
      </main>
      <CaseStudyNav prevCase={prevCase} nextCase={nextCase} />
    </>
  );
}
