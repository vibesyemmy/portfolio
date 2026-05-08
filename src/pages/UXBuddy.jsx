import React from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import CaseStudyNav from '../components/ui/case-study-nav';
import { getNavigation } from '../config/case-studies';
import { BlurImageBackground } from "../components/ui/blur-image-background";
import OptimizedImage from "../components/ui/optimized-image";
import { ThreeDMarquee } from "../components/ui/3d-marquee";
import TestimonialCards from "../components/ui/testimonial-cards";

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
  }
];

export default function UXBuddy() {
  const { prevCase, nextCase } = getNavigation('ux-buddy');

  return (
    <>
      <main className="min-h-screen bg-neutral-950 text-white">
        {/* Hero Section */}
        <BlurImageBackground 
          imageSrc="/images/UX-buddy.png"
          className="min-h-[60vh] flex items-center justify-center pt-24 md:pt-16"
          overlayClassName="bg-black/60"
        >
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
            {/* Hero Element 0: Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-purple-500/60 animate-pulse"></div>
                <img
                  src="/images/uxbuddy.svg"
                  alt="UX Buddy Logo"
                  className="w-24 h-24 md:w-32 md:h-32 relative z-10 drop-shadow-2xl"
                />
              </div>
            </div>
            {/* Hero Element 1: Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8">
              UX Buddy
            </h1>
            {/* Hero Element 2: Subtitle */}
            <p className="text-white text-center max-w-2xl mx-auto text-2xl md:text-3xl mb-4 font-semibold">
              The Future of Feedback
            </p>
            <p className="text-neutral-300 text-center max-w-2xl mx-auto text-lg md:text-xl mb-10">
              A personal story of frustration, invention, and the joy of building something that helps others design better.
            </p>

            {/* Try UX Buddy Button */}
            <div className="flex justify-center mb-12">
              <a
                href="https://www.figma.com/community/plugin/1513874084032014970/ux-buddy"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9333EA_0%,#3B82F6_50%,#9333EA_100%)]" />
                <span className="relative inline-flex items-center px-6 py-3 font-medium transition-all bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg group">
                  <img
                    src="/images/figma-logo.svg"
                    alt="Figma Logo"
                    className="mr-2 w-5 h-5 transition-opacity group-hover:opacity-70 brightness-0 invert"
                  />
                  <span className="text-white group-hover:text-neutral-100">
                    Try UX Buddy
                  </span>
                  <svg
                    className="ml-2 w-4 h-4 text-white group-hover:text-neutral-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
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
            </div>

            {/* Hero Element 3: Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
                <p className="text-white font-medium">3 months</p>
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

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* The Vision */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">The Vision</h2>
            <p className="text-sm md:text-base text-purple-300 mb-8 italic">
              What if feedback came before the meeting?
            </p>
            
            <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
              <p>
                Every designer knows that sinking feeling: the project that should have been simple, wrapped up by Friday, but somehow drags on for weeks of endless reviews.
              </p>
              <p>
                For me, it became a pattern.
              </p>
              <p>
                Stakeholder meetings were full of feedback that could've been spotted earlier. Developers found UX issues during handoff. Each cycle meant more changes, more time, more frustration.
              </p>
              <p className="font-semibold text-white">
                I remember thinking, there has to be a better way.
              </p>
              <p>
                I wanted something that could act as a design co-pilot: a quiet partner beside me in Figma, giving thoughtful, professional UX feedback as I worked. No waiting for reviews. No endless loops. Just instant insight.
              </p>
              <p>
                At first, it was about solving my own pain. But the more I talked to other designers, the clearer it became: we all face the same struggle.
              </p>
              <p>
                That's how UX Buddy was born: an AI-powered Figma plugin that acts like a mentor, critic, and friend.
              </p>
              <p className="font-semibold text-white">
                It doesn't replace human feedback. It brings it closer.
              </p>
            </div>

            {/* Vision Image */}
            <div className="mt-12 bg-neutral-900/50 backdrop-blur-md rounded-xl border border-neutral-800 p-2">
              <OptimizedImage 
                src="/images/the-vision.png"
                alt="UX Buddy Vision: Figma workspace with analysis panel"
                className="rounded-lg"
                priority={true}
              />
            </div>
          </section>

          {/* The Design Journey */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">The Design Journey</h2>
            <p className="text-sm md:text-base text-purple-300 mb-8 italic">
              From blank canvas to beating heart.
            </p>
            
            <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
              <p>
                The early days were pure chaos, and pure excitement.
              </p>
              <p>
                After weeks of tinkering, I finally saw it: my first AI-generated review.
              </p>
              <blockquote className="text-xl text-white italic border-l-4 border-neutral-700 pl-6 py-6 my-8">
                "It was judging my design like a real UX professional. It wasn't perfect, but it was alive."
              </blockquote>
              <p>
                That tiny moment made every late night worth it.
              </p>
              <p>
                One of the earliest hurdles was color contrast. Calculating accessibility for transparent elements nearly broke me. When a button sat on a semi-transparent layer, the math fell apart.
              </p>
              <p>
                Eventually, I realized I had to factor in the background color beneath the transparency: a small change that unlocked much greater accuracy.
              </p>
              <p className="font-semibold text-white">
                Balancing AI complexity with UX simplicity became my guiding principle.
              </p>
              <p>
                I didn't want UX Buddy to feel like a cold audit tool. I wanted it to feel conversational, like a friendly expert who gives clear, balanced feedback.
              </p>
              <p>
                That's why every report follows a rhythm: <span className="text-purple-400 font-semibold">Strengths, Opportunities, and Recommendations</span>. Short, structured, human.
              </p>
              <p>
                I also learned something profound while building it:
              </p>
              <p className="font-semibold text-white">
                good UX isn't a static screen. It's an ongoing conversation between the designer, the user, and now, even the tools we create.
              </p>
              <p>
                And then came the breakthrough night.
              </p>
              <p>
                I ran a test, and for the first time, the plugin gave genuinely insightful feedback. It understood hierarchy, spacing, and tone.
              </p>
              <blockquote className="text-xl text-white italic border-l-4 border-neutral-700 pl-6 py-6 my-8">
                "This is it. This is what I've been chasing."
              </blockquote>
              <p>
                That was the moment UX Buddy stopped being an idea and started being a companion.
              </p>
            </div>

            {/* Image Placeholders */}
            <div className="mt-12 space-y-6">
              <img 
                src="/images/ux-buddy-chart.png"
                alt="UX Buddy Flow Diagram: Select → Analyze → Review → Iterate → Track"
                className="w-full h-auto rounded-[0.75rem]"
              />
        
            </div>
          </section>

          {/* The Challenges */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">The Challenges</h2>
            <p className="text-sm md:text-base text-purple-300 mb-8 italic">
              Taming the machine.
            </p>
            
            <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
              <p>
                Of course, nothing great ever comes easy.
              </p>
              <p>
                Building UX Buddy meant wrestling with Figma's plugin limitations and AI's unpredictable behavior: two wild horses pulling in opposite directions.
              </p>
              <p>
                Figma plugins live inside a sandbox: no direct web APIs, limited storage, strict communication between the UI and the core code.
              </p>
              <blockquote className="text-xl text-white italic border-l-4 border-neutral-700 pl-6 py-6 my-8">
                "It felt like trying to build a brain inside a bottle."
              </blockquote>
              <p>
                I had to rethink how the whole thing worked.
              </p>
              <p>
                Eventually, I split the plugin into two parts: one that handled the data (analyzing design layers and screenshots) and another that handled the interface. They communicated through lightweight messages, a kind of quiet telepathy inside Figma's walls.
              </p>
              <p>
                When storage became a bottleneck, I built a smart caching system using Figma's limited clientStorage, so UX Buddy could "remember" past analyses without breaking. Each obstacle forced me to engineer something smarter.
              </p>
              <p className="font-semibold text-white">
                There were nights when I wanted to quit.
              </p>
              <blockquote className="text-xl text-neutral-400 italic border-l-4 border-neutral-700 pl-6 py-6 my-8">
                "Maybe this is too big for me. I'm a designer, not an engineer."
              </blockquote>
              <p>
                But every time I reached that edge, I'd remember why I started: that vision of a designer getting real feedback before the meeting, saving hours of frustration. That thought pulled me back, again and again.
              </p>
              <p className="font-semibold text-white">
                Then came the AI rebellion.
              </p>
              <p>
                At one point, UX Buddy kept changing its mind. Designers would fix issues, re-run the analysis, and get an entirely new list of problems.
              </p>
              <p>
                It was chaos.
              </p>
              <p>
                So I taught it to remember. UX Buddy began comparing current feedback with previous runs, tagging issues as <span className="text-green-400">✅ Resolved</span>, <span className="text-purple-400">🆕 New</span>, or <span className="text-blue-400">🔁 Ongoing</span>.
              </p>
              <p className="font-semibold text-white">
                That one feature changed everything.
              </p>
              <p>
                The plugin stopped acting like a critic and started behaving like a mentor.
              </p>
              <p>
                It took about three months for UX Buddy to finally feel good to use: fast, reliable, and surprisingly empathetic.
              </p>
              <blockquote className="text-xl text-white italic border-l-4 border-neutral-700 pl-6 py-6 my-8">
                "It stopped feeling like I was fighting it. It started feeling like we were building together."
              </blockquote>
            </div>

            {/* Image Placeholders */}
            <div className="mt-12 space-y-6">
              <img 
                src="/images/analysis.png"
                alt="Before/after contrast image showing improved accessibility feedback"
                className="w-full h-auto rounded-[0.75rem]"
              />
            </div>
          </section>

          {/* The Reveal */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">The Reveal</h2>
            <p className="text-sm md:text-base text-purple-300 mb-8 italic">
              The first analysis that felt human.
            </p>
            
            <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
              <p>
                And then, one quiet evening, everything clicked.
              </p>
              <p>
                The plugin ran a full analysis, and the feedback felt... real. It noticed hierarchy, applauded clarity, and acknowledged improvements from before.
              </p>
              <blockquote className="text-xl text-white italic border-l-4 border-neutral-700 pl-6 py-6 my-8">
                "I just stared at the screen. It understood me."
              </blockquote>
              <p>
                I immediately called my friend Thompson Edolo, the developer who'd been helping me with the toughest bits.
              </p>
              <p>
                "It works," I said, laughing.
              </p>
              <p>
                "No way," he replied. "Send me proof."
              </p>
              <p className="font-semibold text-white">
                We both knew that moment changed everything.
              </p>
              <p>
                The next day, I showed UX Buddy to my coworkers.
              </p>
              <p>
                I ran it on one of our ongoing projects, and within seconds, it surfaced issues that usually took an entire review meeting to spot.
              </p>
              <p>
                Their reactions said it all: wide eyes, curious smiles, and the same question: "Can I get access?"
              </p>
              <p>
                A few weeks later, a junior designer messaged me:
              </p>
              <div className="bg-neutral-900/50 backdrop-blur-md rounded-xl border border-neutral-800 p-6 my-8">
                <p className="text-white italic">
                  "I ran UX Buddy before my review — it caught three things I would've missed. The meeting went so much smoother."
                </p>
              </div>
              <p className="font-semibold text-white">
                That message made every struggle worth it.
              </p>
              <p>
                I'm most proud of the tone UX Buddy uses: calm, clear, and kind. It doesn't shame; it guides.
              </p>
              <p>
                That was the moment I realized UX Buddy didn't just make design better. It made designers feel better about designing.
              </p>
              <p>
                It also shifted how I saw myself.
              </p>
              <p>
                I wasn't just a designer using someone else's tools anymore. I'd built one.
              </p>
              <blockquote className="text-xl text-white italic border-l-4 border-neutral-700 pl-6 py-6 my-8">
                "I stopped seeing design and development as separate worlds. They're just two ways of expressing creativity."
              </blockquote>
            </div>

            {/* Testimonial Cards */}
            <TestimonialCards />
          </section>

          {/* Reflection & Legacy */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Reflection & Legacy</h2>
            <p className="text-sm md:text-base text-purple-300 mb-8 italic">
              The future of feedback.
            </p>
            
            <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
              <p>
                When the dust settled, I finally had space to reflect.
              </p>
              <p>
                Through UX Buddy, I discovered that AI and human creativity aren't rivals. They're collaborators.
              </p>
              <p>
                AI can't imagine or empathize the way we do, but it can mirror our intent, analyze our patterns, and help us grow faster.
              </p>
              <blockquote className="text-xl text-white italic border-l-4 border-neutral-700 pl-6 py-6 my-8">
                "The best tools don't replace us. They reflect us."
              </blockquote>
              <p>
                If I could start again, I'd focus even more on how UX Buddy talks: the language, the tone, the timing of its feedback.
              </p>
              <p>
                Designers are emotional beings; the way we receive feedback changes how we create.
              </p>
              <p>
                I'd also involve more designers early. Some of the best insights came from tiny suggestions: someone saying, "What if it tracked progress?" or "Could it compare versions?"
              </p>
              <p>
                I've learned that collaboration always brings out better ideas.
              </p>
              <p className="font-semibold text-white">
                Looking ahead, I see UX Buddy evolving beyond Figma into a family of empathetic design tools that understand not just pixels, but intent.
              </p>
              <p>
                Tools that don't just check alignment, but understand why something was placed there.
              </p>
              <p>
                And for the next iteration, I'm building a new layer that will save every analysis to a database, allowing designers to track their progress across time.
              </p>
              <p>
                This means designers will be able to see their growth visually: how their accessibility scores improved, how their usability ratings evolved, and how each iteration made the product stronger.
              </p>
              <blockquote className="text-xl text-white italic border-l-4 border-neutral-700 pl-6 py-6 my-8">
                "I want UX Buddy to become not just a feedback tool, but a living record of a designer's growth."
              </blockquote>
              <p>
                If I had to describe UX Buddy in one sentence:
              </p>
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-md rounded-xl border border-purple-700/50 p-8 my-8">
                <p className="text-white text-xl font-semibold text-center">
                  "It feels like having a calm, honest mentor by your side: one who notices the details you miss and cheers when you improve."
                </p>
              </div>
              <p>
                I built it mostly alone, at home over several months, with Thompson always a message away.
              </p>
              <p>
                There were countless nights spent sketching ideas on paper, debugging till dawn, and moments of small joy when something finally clicked.
              </p>
              <p>
                One tester told me, half-jokingly:
              </p>
              <div className="bg-neutral-900/50 backdrop-blur-md rounded-xl border border-neutral-800 p-6 my-8">
                <p className="text-white italic">
                  "I wish UX Buddy could just apply the changes itself."
                </p>
              </div>
              <p>
                That made me laugh, and think. Because it meant the plugin had already become more than a tool; it had become a trusted part of their process.
              </p>
              <p>
                When I look at UX Buddy now, I don't just see lines of code or interface components.
              </p>
              <p>
                I see proof that frustration can spark creation, that curiosity can bridge design and engineering, and that empathy can be built into anything, even a plugin.
              </p>
              <blockquote className="text-xl text-white italic border-l-4 border-neutral-700 pl-6 py-6 my-8">
                "I built this because I was frustrated. But along the way, I built a better version of myself."
              </blockquote>
              <p className="font-semibold text-white text-xl">
                UX Buddy is more than an AI tool.
              </p>
              <p>
                It's a reflection of everything I believe about design: that feedback should empower, not intimidate, and that the tools we make can be just as human as the people who use them.
              </p>
            </div>

            {/* 3D Marquee Showcase */}
            <div className="mt-12 space-y-4">
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
                "Sometimes the best tools are born from frustration — and faith."
              </p>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Design Process?</h2>
              <p className="text-lg text-neutral-300 mb-8">
                Get instant, expert-level UX feedback directly in Figma. Start analyzing your designs today.
              </p>
              <div className="flex justify-center">
                <a
                  href="https://www.figma.com/community/plugin/1513874084032014970/ux-buddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9333EA_0%,#3B82F6_50%,#9333EA_100%)]" />
                  <span className="relative inline-flex items-center px-6 py-3 font-medium transition-all bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg group">
                    <img
                      src="/images/figma-logo.svg"
                      alt="Figma Logo"
                      className="mr-2 w-5 h-5 transition-opacity group-hover:opacity-70 brightness-0 invert"
                    />
                    <span className="text-white group-hover:text-neutral-100">
                      Try UX Buddy
                    </span>
                    <svg
                      className="ml-2 w-4 h-4 text-white group-hover:text-neutral-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
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
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Case Study Navigation */}
      <CaseStudyNav prevCase={prevCase} nextCase={nextCase} />
    </>
  );
}
