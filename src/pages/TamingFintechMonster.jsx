import React from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { BlurImageBackground } from "../components/ui/blur-image-background";
import CaseStudyNav from "../components/ui/case-study-nav";
import { getNavigation } from "../config/case-studies";

const teamMembers = [
  {
    name: "Opeyemi Ajagbe",
    designation: "Lead Product Designer",
    image: "/images/avatar.png",
  },
  {
    name: "Ayo",
    designation: "Product Designer",
    image: "/images/ayo.png",
  },
  {
    name: "Seun",
    designation: "Product Designer",
    image: "/images/seun.jpg",
  },
];

export default function TamingFintechMonster() {
  const { prevCase, nextCase } = getNavigation("fintech-monster");

  return (
    <>
      <main className="min-h-screen bg-neutral-950 text-white">
        {/* Hero */}
        <BlurImageBackground
          imageSrc="/images/case-studies/poseidon-hero.png"
          className="min-h-[60vh] flex items-center justify-center pt-24 md:pt-16"
          overlayClassName="bg-black/60"
        >
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-6">
              Poseidon: Taming the Fintech Sea Monster
            </h1>
            <p className="text-neutral-200 text-center max-w-3xl mx-auto text-lg md:text-xl mb-12">
              How a Nigerian fintech got one design language across web, mobile, and POS.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Role</h3>
                <p className="text-white font-medium">Lead Product Designer</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Client</h3>
                <p className="text-white font-medium">HydrogenPay</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Platforms</h3>
                <p className="text-white font-medium">Web · iOS · Android · POS</p>
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
                HydrogenPay is a Nigerian payments company whose customers move money across a web dashboard, native iOS and Android apps, and physical POS terminals on shop counters in Lagos, Abuja, and Port Harcourt. When I joined as Lead Product Designer, the same merchant could refund a transaction three different ways depending on which surface they reached for — different button shapes, different field orders, even different words for the same action.
              </p>
              <p>
                The product had grown faster than its design rails. Each surface had its own designer, its own component habits, and a separate front-end stack picking up the slack. There was no shared source of truth — only screens that happened to look related.
              </p>
              <p>
                The trigger was a planned POS expansion: a new terminal SKU was queued for the next quarter, and shipping it on the existing patchwork would have meant rebuilding primitives a fourth time. Leadership asked the design team to fix the foundation before adding another floor. I led the design and experience work on Poseidon inside a cross-functional team spanning Product, Design, Engineering, Data, and Ops.
              </p>
            </div>
            <div className="mt-12 rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/images/hydrogen-ds.png"
                alt="HydrogenPay surfaces — web dashboard, mobile apps, and POS terminal — viewed side by side."
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-16 md:py-24 px-4 bg-neutral-900/40">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">Problem</h2>
            <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-8">
              Merchants and engineers were both paying a recognition tax: the same task looked different on each surface, and developers kept rebuilding primitives per platform.
            </p>
            <ul className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed mb-8 list-disc pl-6 marker:text-purple-400">
              <li>
                Internal user testing surfaced repeated confusion when merchants moved between web and mobile — primary actions sat in different places and used different verbs.
              </li>
              <li>
                Support flagged tickets where users assumed a flow had failed because the success state on POS looked nothing like the success state on web.
              </li>
              <li>
                Engineers maintained three near-duplicate button, input, and modal implementations, with no shared tokens for spacing or color.
              </li>
              <li>
                Side-by-side, marketing screenshots from web, mobile, and POS read like three different products.
              </li>
            </ul>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-6 italic">
              Baseline adoption and satisfaction were not measured pre-system — instrumentation landed alongside the rollout, so we have qualitative signal only for the before-state.
            </p>
            <div className="rounded-lg border-l-4 border-purple-500 bg-neutral-900/60 p-6">
              <p className="text-neutral-200 text-base md:text-lg leading-relaxed">
                <span className="font-semibold text-white">Cost of inaction:</span> every new feature multiplied the problem by three, and the planned POS SKU would have made it four.
              </p>
            </div>
            <div className="mt-12 rounded-lg overflow-hidden">
              <img
                src="/images/fragment.svg"
                alt="Diagram of fragmented UI primitives — eleven button styles and divergent success states across web, mobile, and POS."
                className="w-full h-auto object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Constraints */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">Constraints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-3">Multi-platform parity</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  The system had to render coherently on web (responsive), iOS, Android, and a low-resolution POS screen with limited touch targets and no hover state.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-3">Nigerian fintech compliance and brand</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  CBN-regulated flows (KYC, transaction confirmations, dispute notices) had non-negotiable language and disclosure requirements. The HydrogenPay brand also carried equity we could refine, not replace.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-3">Lean front-end capacity</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  A small engineering team meant the system had to ship in adoptable slices — no big-bang rewrite.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-3">Accessibility floor: WCAG 2.1 AA</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Color contrast, keyboard navigation, and screen-reader semantics were ship-blockers, not polish.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 md:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-3">Aggressive timeline</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  First adoptable slice had to land before the POS SKU entered build.
                </p>
              </div>
            </div>
            <div className="mt-10 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 p-6">
              <p className="text-neutral-200 text-base md:text-lg leading-relaxed">
                When constraints collided, we chose <span className="font-semibold text-white">accessibility and platform familiarity over visual novelty</span> — a decision that killed at least one direction outright (see Process, beat 4).
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
                  <h3 className="text-xl md:text-2xl font-semibold text-white">Mapped the drift before drawing anything new.</h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    I pulled every primary-action screen across web, mobile, and POS into one Figma board and annotated the variance — eleven button styles, six input behaviors, four ways of saying "transaction successful." This audit, not a moodboard, set the scope.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Recognition over Recall:</span> every divergence was a memory tax we were charging the merchant.
                  </p>
                </div>
                <div className="mt-8 rounded-lg overflow-hidden">
                  <img
                    src="/images/case-studies/poseidon-before-after.png"
                    alt="Before/after: confirmation screen. Left: three divergent success states across web, mobile, POS. Right: one shared pattern."
                    className="w-full h-auto object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </li>

              {/* Beat 2 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">02</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">Talked to merchants and engineers in the same week.</h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    Six merchant interviews surfaced the moments they hesitated; four engineering conversations surfaced where the codebase fought them.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Jobs-to-Be-Done:</span> listening for the job a merchant was hiring the screen to do flipped our priority order. Accessibility of tap targets on POS jumped above visual refinement.
                  </p>
                </div>
              </li>

              {/* Beat 3 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">03</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">Built atoms before screens.</h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    Adopting Brad Frost's Atomic Design, we defined tokens (color, spacing, type, radius) first, then atoms (button, input, icon), then molecules (form rows, list items), then organisms (transaction card, KYC step).
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Chunking / Uniform Connectedness:</span> grouping by composition let designers and engineers reason about the same units. The decomposition changed delivery cadence: once tokens shipped, every downstream component PR shrank to hours, not days, and a token change in Figma matched a token change in code.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="/images/case-studies/poseidon-button-specimen.png"
                      alt="Component specimen: button — default, hover, focus, loading, disabled, destructive states across web, mobile, and POS."
                      className="w-full h-auto object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="/images/case-studies/poseidon-system-diagram.png"
                      alt="System diagram: design tokens feeding atoms (button, input), feeding molecules (form row, list item), feeding organisms (transaction card, KYC step)."
                      className="w-full h-auto object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              </li>

              {/* Beat 4 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">04</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">Discarded a custom motion language.</h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    An early direction added a HydrogenPay-specific transition curve across all surfaces. POS hardware couldn't render it without dropped frames, and on Android it fought platform expectations.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Jakob's Law:</span> users spend most of their time on other apps; meeting their muscle memory beat asserting a house style. We adopted platform-native motion instead — iOS easing on iOS, Material on Android, no motion on POS. The system got duller and more correct.
                  </p>
                </div>
              </li>

              {/* Beat 5 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">05</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">Shipped in adoptable slices.</h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Pareto:</span> the 20% of components touched by 80% of flows (button, input, transaction card, confirmation modal) shipped first; the long tail followed when teams pulled it.
                  </p>
                  <p>
                    The learning move: a migration checklist beat a big-bang rewrite because engineering kept delivering features the whole way through.
                  </p>
                </div>
                <div className="mt-8 rounded-lg overflow-hidden">
                  <img
                    src="/images/case-studies/poseidon-user-flow.png"
                    alt="User flow: refund transaction → confirmation → receipt, rendered identically on web, mobile, and POS."
                    className="w-full h-auto object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Outcome */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">Outcome</h2>
            <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed">
              <p>
                Headline: <span className="font-semibold text-white">the conversation around Poseidon changed.</span> Support and stakeholder threads stopped opening with <em>"why is this breaking, why is it so hard to operate?"</em> and shifted to nuanced asks about <em>insights and extensibility</em> — the Peak-End signal that the foundation had stopped being the bottleneck.
              </p>
              <p>
                Poseidon sat inside HydrogenPay's 2023–2024 turn from loss-making to profitable as the UX and infrastructure layer that lowered friction on high-volume payment flows and reduced support and ops overhead. Poseidon was one input among many in that turnaround — we are not claiming isolated revenue or profit numbers — but the foundation it laid is now load-bearing for every flow shipped after it.
              </p>
              <p className="font-semibold text-white">Qualitative signals we did see:</p>
              <ul className="space-y-3 list-disc pl-6 marker:text-purple-400">
                <li>The POS SKU shipped on the new system without rebuilding primitives — the foundation held under a fourth surface, which was the original goal.</li>
                <li>Support and ops escalations on shared flows dropped in tone and volume; merchants stopped flagging confusing or blocked states on confirmations and refunds.</li>
                <li>Front-end engineers stopped duplicating button, input, and modal code across repos; one shared package became canonical.</li>
                <li>Brand expression unified across surfaces — marketing screenshots from web, mobile, and POS now read as one product.</li>
                <li>Internal design reviews moved from "is this consistent?" to "is this the right pattern?" — a healthier conversation.</li>
              </ul>
            </div>

            <blockquote className="mt-12 border-l-4 border-purple-500 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-r-lg p-6 md:p-8">
              <p className="text-white text-lg md:text-xl italic leading-relaxed mb-3">
                "Poseidon turned a flow that constantly needed explanation into something our teams could trust and operate without babysitting."
              </p>
              <footer className="text-neutral-400 text-sm md:text-base not-italic">
                — Product / Operations Lead
              </footer>
            </blockquote>

            <div className="mt-12 rounded-lg bg-neutral-900/50 border border-neutral-800 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-white mb-3">Residual risks</h3>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                The system needs a versioning and deprecation policy before the next major brand refresh, and accessibility coverage is currently AA — a push to AAA on critical financial flows (KYC, transaction confirmations) is the obvious next investment. The migration checklist also needs to harden into automated lint rules so new screens cannot drift back to the old primitives.
              </p>
            </div>

            <div className="mt-12 rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/images/case-studies/poseidon-hero.png"
                alt="Final Poseidon UI grid — unified components rendered across web, mobile, and POS surfaces."
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
      <CaseStudyNav prevCase={prevCase} nextCase={nextCase} />
    </>
  );
}
