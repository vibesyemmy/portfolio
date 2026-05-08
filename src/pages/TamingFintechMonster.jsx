import React from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import CaseStudyNav from "../components/ui/case-study-nav";
import CaseStudyMeta from "../components/ui/case-study-meta";
import CaseStudyHero from "../components/ui/case-study-hero";
import CaseStudyArtifact from "../components/ui/case-study-artifact";
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
        <CaseStudyHero
          variant="composite"
          image="/images/case-studies/poseidon-hero.png"
          alt="HydrogenPay surfaces — web dashboard, mobile apps, and POS terminal — viewed side by side."
          title="Poseidon: Taming the Fintech Sea Monster"
          subtitle="One design language across web, mobile, and POS."
        >
          <CaseStudyMeta
            items={[
              { label: "Role", value: "Lead Product Designer" },
              { label: "Client", value: "HydrogenPay" },
              { label: "Platforms", value: "Web · iOS · Android · POS" },
              {
                label: "Team",
                value: (
                  <div className="flex justify-center">
                    <AnimatedTooltip items={teamMembers} />
                  </div>
                ),
              },
            ]}
          />
        </CaseStudyHero>

        {/* Pull-quote epigraph — conversation-changed headline */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-neutral-200 text-lg md:text-xl italic leading-relaxed text-center">
              Threads about the platform stopped opening with{" "}
              <span className="not-italic">"why is this breaking, why is it so hard to operate?"</span>{" "}
              and shifted to{" "}
              <span className="not-italic">"what insight or extension can we build on top?"</span>{" "}
              That is the foundation we built.
            </blockquote>
          </div>
        </section>

        {/* Drift Audit */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 mb-8">Drift Audit</h2>
            <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed max-w-3xl">
              <p>
                HydrogenPay moves money across a web dashboard, native iOS and Android apps, and physical POS terminals on shop counters in Lagos, Abuja, and Port Harcourt. By the time I joined as Lead Product Designer, the same merchant could refund a transaction three different ways depending on which surface they reached for — different button shapes, different field orders, even different words for the same action.
              </p>
              <p>
                Each surface had its own designer, its own component habits, and a separate front-end stack picking up the slack. There was no shared source of truth, only screens that happened to look related.
              </p>
              <p>
                I pulled every primary-action screen across web, mobile, and POS into one Figma board and named the variance: eleven button styles, six input behaviours, four ways of saying <em>"transaction successful."</em> The audit, not a moodboard, set the scope.
              </p>
              <p>
                The trigger was external. A new POS terminal SKU was queued for the next quarter. Shipping it on the existing patchwork would have meant rebuilding primitives a fourth time. Leadership asked the design team to fix the floor before adding another room.
              </p>
            </div>
            <CaseStudyArtifact
              ratio="16:9"
              src="/images/case-studies/poseidon-before-after.png"
              alt="Before/after: confirmation screen. Left, three divergent success states across web, mobile, and POS. Right, one shared pattern."
              caption="Eleven button styles, six input behaviours, four success states — collapsed into one shared confirmation pattern across web, mobile, and POS."
            />
          </div>
        </section>

        {/* Tradeoff Lens — accent: divider rule above uses brand gradient */}
        <section className="py-16 md:py-24 px-4 bg-neutral-900/40 border-t-2 border-transparent [border-image:linear-gradient(90deg,#9333ea,#2563eb)_1]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 mb-8">Tradeoff Lens</h2>
            <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed max-w-3xl">
              <p>
                Coherence had to land under five constraints, and they fought each other often enough that the lens we picked decided the work.
              </p>
              <ul className="space-y-3 list-disc pl-6 marker:text-purple-400">
                <li>
                  <span className="font-semibold text-white">Multi-platform parity.</span> The system had to render on web (responsive), iOS, Android, and a low-resolution POS screen with limited touch targets and no hover state.
                </li>
                <li>
                  <span className="font-semibold text-white">Nigerian fintech compliance and brand.</span> CBN-regulated flows — KYC, transaction confirmations, dispute notices — carried non-negotiable language and disclosure requirements. The HydrogenPay brand also held equity I could refine, not replace.
                </li>
                <li>
                  <span className="font-semibold text-white">Lean front-end capacity.</span> A small engineering team meant the system had to ship in adoptable slices. No big-bang rewrite was on the table.
                </li>
                <li>
                  <span className="font-semibold text-white">WCAG 2.1 AA as the floor.</span> Contrast, keyboard reach, and screen-reader semantics were ship-blockers, not polish.
                </li>
                <li>
                  <span className="font-semibold text-white">Aggressive timeline.</span> The first adoptable slice had to land before the POS SKU entered build.
                </li>
              </ul>
              <p>
                When constraints collided, we chose <span className="font-semibold text-white">accessibility and platform familiarity over visual novelty.</span> That call killed at least one direction outright — see Atomic Build, beat 4.
              </p>
              <p>
                The other call worth naming: I treated <span className="font-semibold text-white">the merchant's recognition tax as the unit of cost.</span> Every time a primary action moved between surfaces or used a different verb, a merchant paid in hesitation, support tickets, or abandoned flows. Once we measured the work that way, the priority order rearranged itself — touch-target accessibility on POS climbed above visual refinement, and the brand refresh moved behind the migration checklist.
              </p>
            </div>
          </div>
        </section>

        {/* Atomic Build */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 mb-8">Atomic Build</h2>
            <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed max-w-3xl">
              <p>Once the lens held, the work got mechanical. We built atoms before screens.</p>
              <ol className="space-y-5 list-decimal pl-6 marker:text-purple-400 marker:font-semibold">
                <li>
                  <span className="font-semibold text-white">Tokens first.</span> Color, spacing, type, radius. One palette, one type scale, one spacing ramp.{" "}
                  <em className="text-neutral-400">Lens: Recognition over Recall.</em> Once tokens shipped, every downstream component PR shrank to hours, not days, and a token change in Figma matched a token change in code.
                </li>
                <li>
                  <span className="font-semibold text-white">Atoms next.</span> Button, input, icon. One component, every state — default, hover, focus, loading, disabled, destructive — across web, mobile, and POS. POS got the strictest tap-target rules; everything else stepped up to meet it.
                </li>
                <li>
                  <span className="font-semibold text-white">Then molecules and organisms.</span> Form rows, list items, transaction cards, KYC steps.{" "}
                  <em className="text-neutral-400">Lens: Chunking and Uniform Connectedness.</em> Grouping by composition let designers and engineers reason about the same units at the same time.
                </li>
                <li>
                  <span className="font-semibold text-white">One direction killed: a custom motion language.</span> An early option added a HydrogenPay-specific transition curve across all surfaces. POS hardware couldn't render it without dropped frames. On Android it fought platform expectations.{" "}
                  <em className="text-neutral-400">Lens: Jakob's Law.</em> Users spend most of their time on other apps; meeting their muscle memory beat asserting a house style. We adopted platform-native motion instead — iOS easing on iOS, Material on Android, no motion on POS. The system got duller and more correct.
                </li>
              </ol>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <CaseStudyArtifact
                ratio="16:9"
                src="/images/case-studies/poseidon-system-diagram.png"
                alt="System diagram: design tokens feeding atoms, molecules, and organisms across web, mobile, and POS."
                caption="Tokens feed atoms (button, input). Atoms feed molecules (form row, list item). Molecules feed organisms (transaction card, KYC step). One source, four surfaces."
                className="mt-0"
              />
              <CaseStudyArtifact
                ratio="1:1"
                src="/images/case-studies/poseidon-button-specimen.png"
                alt="Component specimen: button states across web, mobile, and POS."
                caption="One button, every state — default, hover, focus, loading, disabled, destructive — rendered identically across web, mobile, and POS."
                className="mt-0"
              />
            </div>
          </div>
        </section>

        {/* Adoption Path */}
        <section className="py-16 md:py-24 px-4 bg-neutral-900/40">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 mb-8">Adoption Path</h2>
            <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed max-w-3xl">
              <p>A design system is only as real as its uptake. We shipped in slices and let the work pull itself.</p>
              <ul className="space-y-3 list-disc pl-6 marker:text-purple-400">
                <li>
                  <span className="font-semibold text-white">Pareto first.</span> The 20% of components touched by 80% of flows — button, input, transaction card, confirmation modal — shipped first. The long tail followed when teams pulled it.
                </li>
                <li>
                  <span className="font-semibold text-white">Migration checklist over big-bang rewrite.</span> Each squad kept delivering features the whole way through. Nobody had to stop and rebuild their world.
                </li>
                <li>
                  <span className="font-semibold text-white">Merchants and engineers in the same week.</span> Six merchant interviews surfaced the moments they hesitated; four engineering conversations surfaced where the codebase fought them.{" "}
                  <em className="text-neutral-400">Lens: Jobs-to-Be-Done.</em> Listening for the job a merchant was hiring the screen to do flipped our priority order — accessibility on POS climbed above visual refinement before any token shipped.
                </li>
                <li>
                  <span className="font-semibold text-white">The POS SKU was the forcing function.</span> Once tokens, atoms, and the four organisms covering refunds and confirmations had shipped, the new terminal could be designed inside the system instead of around it.
                </li>
              </ul>
            </div>
            <CaseStudyArtifact
              ratio="16:9"
              src="/images/case-studies/poseidon-user-flow.png"
              alt="User flow: refund transaction → confirmation → receipt, rendered identically across three surfaces."
              caption="Refund → confirmation → receipt, rendered identically on web, mobile, and POS."
            />
          </div>
        </section>

        {/* Foundation Held — accent: pull-quote left-border uses brand gradient */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 mb-8">Foundation Held</h2>
            <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed max-w-3xl">
              <p>
                The headline isn't a percentage — instrumentation landed alongside the rollout, so we have qualitative signal only for the before-state.{" "}
                <em className="text-neutral-400">[METRIC NEEDED] — pre/post adoption and satisfaction baselines were not measured before the system shipped; comparable instrumentation post-rollout is being pulled.</em>
              </p>
              <p>What we can say is what the team can now do that it couldn't before:</p>
              <ul className="space-y-3 list-disc pl-6 marker:text-purple-400">
                <li>The POS SKU shipped on the new system without rebuilding primitives. The foundation held under a fourth surface, which was the original goal.</li>
                <li>
                  Support and ops escalations on shared flows shifted in tone and volume. Confusing or blocked states on confirmations and refunds fell off support's top-three escalation themes.{" "}
                  <em className="text-neutral-400">[METRIC NEEDED] — ticket-volume delta not captured at the time.</em>
                </li>
                <li>Front-end engineers stopped duplicating button, input, and modal code across repos. One shared package became canonical.</li>
                <li>Marketing screenshots from web, mobile, and POS now read as one product.</li>
                <li>Internal design reviews moved from <em>"is this consistent?"</em> to <em>"is this the right pattern?"</em> — a healthier conversation.</li>
              </ul>
              <p>
                Poseidon sat inside HydrogenPay's 2023–2024 turn from loss-making to profitable as the UX and infrastructure layer that lowered friction on high-volume payment flows and reduced support and ops overhead. It was one input among many in that turn — not isolated revenue or profit numbers — but the foundation it laid is now load-bearing for every flow shipped after it.
              </p>
            </div>

            <figure className="mt-12 max-w-3xl">
              <div className="relative rounded-r-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 md:p-8 pl-8 md:pl-10">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-gradient-to-b from-purple-600 to-blue-600"
                />
                <blockquote className="text-white text-lg md:text-xl italic leading-relaxed">
                  "Poseidon turned a flow that constantly needed explanation into something our teams could trust and operate without babysitting."
                </blockquote>
                <figcaption className="mt-3 text-neutral-400 text-sm md:text-base not-italic">
                  — Composite, drawn from post-rollout 1:1s with product and operations leads.
                </figcaption>
              </div>
            </figure>

            <div className="mt-12 max-w-3xl rounded-lg bg-neutral-900/50 border border-neutral-800 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-white mb-3">Residual risks</h3>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                The system needs a versioning and deprecation policy before the next major brand refresh. Accessibility coverage sits at AA; pushing critical financial flows (KYC, transaction confirmations) to AAA is the next investment. The migration checklist needs to harden into automated lint rules so new screens cannot drift back to the old primitives.
              </p>
            </div>
          </div>
        </section>
      </main>
      <CaseStudyNav prevCase={prevCase} nextCase={nextCase} />
    </>
  );
}
