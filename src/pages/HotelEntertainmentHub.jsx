import React, { useState, useEffect, Suspense, lazy, memo } from 'react';
import { AnimatedTooltip } from '../components/ui/animated-tooltip';
import { BlurImageBackground } from '../components/ui/blur-image-background';
import { Skeleton } from '../components/ui/skeleton';
import CaseStudyNav from '../components/ui/case-study-nav';
import CaseStudyMeta from '../components/ui/case-study-meta';
import { getNavigation } from '../config/case-studies';
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from '@tabler/icons-react';
import ImageCarousel from '../components/ImageCarousel';

const Lottie = lazy(() => import('lottie-react'));

const teamMembers = [
  {
    name: "Opeyemi Ajagbe",
    designation: "Product Designer",
    image: "/images/avatar.png",
  },
  {
    name: "Joshua Zaporta Cruz",
    designation: "Product Designer",
    image: "/images/joshua.png",
  },
  {
    name: "Theodor",
    designation: "Product Designer",
    image: "/images/boy.png",
  },
];

const ModalImage = memo(({ src, alt }) => (
  <div className="p-4">
    <img
      src={src}
      alt={alt}
      className="max-w-full max-h-[80vh] object-contain mx-auto"
    />
  </div>
));

const ImageSection = memo(({ src, alt, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full aspect-[16/9]">
      {isLoading && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        onLoad={() => setIsLoading(false)}
        className={`w-full h-full object-cover rounded-xl cursor-pointer transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ minHeight: '300px' }}
      />
    </div>
  );
});

export default function HotelEntertainmentHub() {
  const [animationData, setAnimationData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { prevCase, nextCase } = getNavigation('hotel-hub');

  useEffect(() => {
    fetch('/animations/Hotel-Entertainment-Hub.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  const stayImages = [
    {
      src: '/images/stay-grid-1.png',
      alt: 'Stay section: spa booking screen with upfront pricing and folio confirmation.',
    },
    {
      src: '/images/stay-grid-2.png',
      alt: 'Stay section: tour reservation screen with upfront pricing and folio confirmation.',
    },
    {
      src: '/images/stay-grid-3.png',
      alt: 'Stay section: dining selection screen with upfront pricing and folio confirmation.',
    },
    {
      src: '/images/stay-grid-4.png',
      alt: 'Stay section: event ticket screen with upfront pricing and folio confirmation.',
    },
    {
      src: '/images/stay-grid-5.png',
      alt: 'Stay section: checkout screen with upfront pricing and folio confirmation.',
    },
  ];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedImage]);

  return (
    <>
      <CaseStudyNav navigation={getNavigation()} className="absolute top-0 left-0 right-0 z-50" />
      <main className="min-h-screen bg-neutral-950 text-white">
        {/* Hero */}
        <BlurImageBackground
          imageSrc="/images/hotel-entertainment-hub.png"
          className="min-h-[60vh] flex items-center justify-center pt-24 md:pt-16"
          overlayClassName="bg-black/60"
        >
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-4">
              Hotel Entertainment Hub
            </h1>
            <p className="text-white text-center max-w-3xl mx-auto text-2xl md:text-3xl mb-4 font-semibold">
              One Console, Whole Stay
            </p>
            <p className="text-neutral-200 text-center max-w-3xl mx-auto text-lg md:text-xl mb-12">
              A console app that turns the hotel room into the front desk.
            </p>

            <CaseStudyMeta
              items={[
                { label: "Role", value: "Product Designer" },
                { label: "Client", value: "ggCircuit" },
                { label: "Platform", value: "TV Console" },
                {
                  label: "Team",
                  value: (
                    <div className="flex justify-center">
                      <Suspense fallback={<Skeleton className="w-full h-full" />}>
                        <AnimatedTooltip items={teamMembers} />
                      </Suspense>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </BlurImageBackground>

        {/* Context */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">Context</h2>
            <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed">
              <p>
                Hotel Entertainment Hub is a TV-console app for ggCircuit, designed for hotel guests in their rooms — a single touchpoint that bundles entertainment (movies, music, games) with the hotel's bookable services (spa, tours, dining, checkout). Three product designers built it together; I led the research-to-IA work and the cross-section interaction patterns.
              </p>
              <p>
                Before the Hub existed, hotels had no clean way to surface their full catalog inside the room. A guest who wanted a spa appointment, a private tour, or an event ticket reached for the phone, the printed binder on the nightstand, or the front desk. Entertainment lived on a different remote and a different login.
              </p>
              <p>
                The trigger was ggCircuit's push to consolidate in-room experience onto a console-class device hotels were already deploying. The brief: one app, one input device, the whole stay.
              </p>
            </div>

            {/* Overview motion */}
            <div className="mt-12 w-full">
              <div className="relative w-full pb-[66.76%] rounded-lg md:rounded-3xl overflow-hidden bg-neutral-900/40">
                {animationData ? (
                  <Suspense fallback={<Skeleton className="absolute inset-0" />}>
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      autoplay={true}
                      className="absolute top-0 left-0 w-full h-full"
                      rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
                      aria-label="Animated overview of the Hub stitching the four sections together: Watch, Play, Listen, Stay."
                    />
                  </Suspense>
                ) : (
                  <Skeleton className="absolute inset-0" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-16 md:py-24 px-4 bg-neutral-900/40">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">Problem</h2>
            <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-8">
              Guests missed most of the hotel's catalog, and the hotel paid in concierge load and lost ancillary revenue.
            </p>
            <ul className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed mb-8 list-disc pl-6 marker:text-purple-400">
              <li>
                Research surfaced fragmented information as the top complaint: guests defaulted to the concierge or front desk for questions the room could have answered.
              </li>
              <li>
                Pricing was unclear across services — guests hesitated to book spa, tours, or dining because the cost showed up only at the desk.
              </li>
              <li>
                Awareness of seasonal tours and curated dining was low across business, couples, and family travelers.
              </li>
              <li>
                Entertainment and services lived on separate surfaces, so a guest never moved naturally from "watch a movie" to "book tomorrow's tour."
              </li>
            </ul>

            <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-6 italic">
              Pre-launch baselines for ancillary booking rate, concierge call volume on service questions, and a verbatim user quote from research are still being chased with the operator. Numbers and quote will replace this note once ggCircuit shares the figures.
            </p>

            <div className="rounded-lg border-l-4 border-purple-500 bg-neutral-900/60 p-6">
              <p className="text-neutral-200 text-base md:text-lg leading-relaxed">
                <span className="font-semibold text-white">Cost of inaction:</span> every booking the guest didn't make from the room was either a phone call to the concierge or revenue the hotel never captured.
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
                <h3 className="text-lg font-semibold text-white mb-3">TV-console hardware</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Ten-foot UI, remote-only input, no touch, no hover, no keyboard. Every interaction had to survive a five-button remote.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-3">Mixed-audience scope</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Same surface for business travelers, couples, and families — three jobs, one IA. No personalization layer at launch.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-3">Folio + catalog coupling</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Catalog (rooms, spa, tours, dining, events) lived in the hotel's PMS, and charges had to land on the room folio cleanly — no guest-side login, no second checkout, no card re-entry.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-3">Accessibility for a transient audience</h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Guests use this for one or two nights; affordances had to be legible without a tutorial.
                </p>
              </div>
            </div>
            <div className="mt-10 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 p-6">
              <p className="text-neutral-200 text-base md:text-lg leading-relaxed">
                When constraints collided, the lens was{" "}
                <span className="font-semibold text-white">recognition over recall, every time</span> — guests should never have to remember where something lives. A hotel app the guest learns once and never sees again has to lead with cues, not memory.
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
                    Research before IA.
                  </h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    Surveys and interviews across business, couples, and families surfaced one shape: guests wanted one place to see everything, upfront pricing, and recommendations tuned to their segment.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Jobs-to-Be-Done:</span> the job was not "find a movie," it was "spend the evening without calling the front desk." That reframed the home from content grid to hub of intents.
                  </p>
                </div>
              </li>

              {/* Beat 2 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">02</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    Sorted the catalog into four verbs.
                  </h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    Entertainment plus services sorted cleanly into Watch, Play, Listen, Stay — one verb, one job.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Hick's Law + Chunking:</span> four top-level choices kept the d-pad sane; Stay absorbed every bookable service so operator complexity stayed hidden from the guest.
                  </p>
                </div>

                {/* Watch */}
                <div className="mt-10">
                  <h4 className="text-lg font-semibold text-white mb-4">Watch</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                      onClick={() => setSelectedImage({ src: '/images/watch-grid.gif', alt: 'Watch section: curated movie grid with d-pad focus state.' })}
                    >
                      <img
                        src="/images/watch-grid.gif"
                        alt="Watch section: curated movie grid with d-pad focus state."
                        className="object-contain w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                      onClick={() => setSelectedImage({ src: '/images/watch-detail.png', alt: 'Watch section: a movie detail screen with synopsis and play button.' })}
                    >
                      <img
                        src="/images/watch-detail.png"
                        alt="Watch section: a movie detail screen with synopsis and play button."
                        className="object-contain w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Play */}
                <div className="mt-10">
                  <h4 className="text-lg font-semibold text-white mb-4">Play</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                      onClick={() => setSelectedImage({ src: '/images/game-grid.gif', alt: 'Play section: in-room games grid.' })}
                    >
                      <img
                        src="/images/game-grid.gif"
                        alt="Play section: in-room games grid."
                        className="object-contain w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                      onClick={() => setSelectedImage({ src: '/images/game-detail.png', alt: 'Play section: a game detail screen showing controls and players supported.' })}
                    >
                      <img
                        src="/images/game-detail.png"
                        alt="Play section: a game detail screen showing controls and players supported."
                        className="object-contain w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Listen */}
                <div className="mt-10">
                  <h4 className="text-lg font-semibold text-white mb-4">Listen</h4>
                  <div className="max-w-3xl">
                    <div
                      className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                      onClick={() => setSelectedImage({ src: '/images/Listen_Detail.png', alt: 'Listen section: curated playlist detail with track list and remote-friendly playback controls.' })}
                    >
                      <img
                        src="/images/Listen_Detail.png"
                        alt="Listen section: curated playlist detail with track list and remote-friendly playback controls."
                        className="object-contain w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Stay */}
                <div className="mt-10">
                  <h4 className="text-lg font-semibold text-white mb-4">Stay</h4>
                  <ImageCarousel images={stayImages} />
                </div>
              </li>

              {/* Beat 3 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">03</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    Designed for the remote, not the mouse.
                  </h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    Every grid reworked for d-pad traversal: predictable focus order, generous focus rings, no controls nested deeper than two.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Fitts's Law (ten-foot):</span> press-count became the design metric.
                  </p>
                  <p className="text-neutral-500 italic text-sm">
                    Average presses-to-action target and the post-launch number are still being chased — will replace this note if ggCircuit shared instrumentation. A 16:9 user-flow diagram (Home → Stay → Spa booking → Folio confirmation, annotated with remote presses per step) is also pending and will land before this case study moves into the portfolio rotation.
                  </p>
                </div>
              </li>

              {/* Beat 4 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">04</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    Made pricing legible upfront.
                  </h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    Every bookable card carried the price on the tile; totals surfaced before confirmation, not at the desk.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Plain Language + Loss-aversion (honest variant):</span> hesitation moved earlier — where guests could still say yes.
                  </p>
                </div>
              </li>

              {/* Beat 5 */}
              <li>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-purple-400 font-bold text-xl md:text-2xl">05</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    Folio-only checkout.
                  </h3>
                </div>
                <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                  <p>
                    Booking a spa session, a tour, or a dining reservation charged the room directly — one confirmation screen, no card entry, no second auth.
                  </p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-purple-300">Lens — Doherty Threshold + Recognition over Recall:</span> sub-second confirmation, with the room number echoed back so guests trusted the charge had gone to the right place.
                  </p>
                </div>
              </li>
            </ol>

            {/* Discarded direction */}
            <div className="mt-16 rounded-lg border-l-4 border-neutral-600 bg-neutral-900/60 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Discarded direction: a personalization-led home screen</h3>
              <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                An early version led with segment-aware recommendations — kid-friendly tiles for families, business-lounge prompts for solo travelers. Without a guest profile beyond room number, the segmentation guessed wrong often enough that the home felt mistuned, not personalized. Killed it for a flat, recognizable hub anchored on the four verbs. Lesson: in a one-or-two-night surface, <em>legibility beats personalization</em> — guests don't stay long enough to forgive a wrong guess.
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
                Headline: <span className="font-semibold text-white">the room became the front desk for things guests never used to ask for.</span> In prototype rounds, ggCircuit and partner-hotel reviewers completed full booking flows — spa, time slot, folio confirmation — without leaving the couch.
              </p>

              <blockquote className="border-l-4 border-purple-500 bg-neutral-900/60 rounded-r-lg p-6">
                <p className="text-white text-base md:text-lg italic leading-relaxed">
                  "So this just charges the room?" — followed by the booking going through.
                </p>
                <footer className="mt-2 text-neutral-400 text-sm not-italic">
                  — Peak-End reviewer reaction
                </footer>
              </blockquote>

              <p className="font-semibold text-white">Supporting signals:</p>
              <ul className="space-y-3 list-disc pl-6 marker:text-purple-400">
                <li>
                  Four-verb IA tested cleanly across all three traveler segments — no segment needed a different home, which validated killing the personalization-led direction.
                </li>
                <li>
                  Upfront pricing on every bookable card shifted the question from <em>"how much is this?"</em> to <em>"which time slot?"</em>.
                </li>
                <li>
                  Folio-only checkout collapsed booking to one confirmation — the moment reviewers cited as the app no longer feeling like a hotel system.
                </li>
              </ul>

              <p className="text-neutral-400 italic">
                Post-launch ancillary booking lift, concierge call deflection, guest CSAT, and any operator or guest quote from rollout are still being chased with ggCircuit. This section will swap to a numeric headline once those land — same posture as Poseidon.
              </p>
            </div>

            <div className="mt-12 rounded-lg bg-neutral-900/50 border border-neutral-800 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-white mb-3">Residual risks &amp; follow-ups</h3>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                Personalization is the next investment, earned with profile data the hotel can responsibly collect — guessing from room number alone is what killed the first attempt. No formal WCAG-equivalent audit for TV-console UI was run; that is the next quality bar.
              </p>
            </div>

            {/* Feature grid */}
            <div className="mt-16">
              <ImageSection
                src="/images/feature-grid.png"
                alt="Feature grid: composite of every primary surface across Watch, Play, Listen, and Stay."
                onClick={() => setSelectedImage({
                  src: '/images/feature-grid.png',
                  alt: 'Feature grid: composite of every primary surface across Watch, Play, Listen, and Stay.',
                })}
              />
            </div>

            {/* Prototype */}
            <div className="mt-16">
              <p className="text-neutral-400 text-lg text-center mb-6">Check the full prototype below</p>
              <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '500px' }}>
                <Suspense fallback={
                  <div className="absolute inset-0">
                    <Skeleton className="w-full h-full rounded-xl" />
                  </div>
                }>
                  <iframe
                    src="https://cloud.protopie.io/p/efd2a0e232?ui=false&scaleToFit=true&enableHotspotHints=true&cursorType=touch&mockup=true&bgColor=%23F5F5F5&bgImage=undefined&playSpeed=1"
                    title="Interactive ProtoPie prototype of the Hotel Entertainment Hub — guests can navigate the four sections via on-screen remote."
                    className="absolute inset-0 w-full h-full border-0 rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        <CaseStudyNav prevCase={prevCase} nextCase={nextCase} className="py-16" />

        {/* Full Screen Modal */}
        <AnimatePresence>
          {selectedImage && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[5000]"
              />
              <div className="fixed inset-0 overflow-y-auto z-[5001]">
                <div className="flex min-h-full items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative bg-neutral-900 rounded-2xl shadow-xl max-w-[90vw] max-h-[90vh] overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(null);
                        }}
                        className="rounded-full p-2 hover:bg-white/10 transition-colors"
                      >
                        <IconX className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    <Suspense fallback={<Skeleton className="w-full h-full" />}>
                      <ModalImage
                        src={selectedImage?.src}
                        alt={selectedImage?.alt}
                      />
                    </Suspense>
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
