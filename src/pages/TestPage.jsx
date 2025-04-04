import React from 'react';
import { Link } from 'react-router-dom';
import { BackgroundBeamsDemo } from '../components/ui/background-beams-demo';

export default function TestPage() {
  return (
    <main className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Go Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Go Back</span>
        </Link>
      </div>
      
      {/* Background Beams Demo Section */}
      <BackgroundBeamsDemo />

      {/* Additional test components section */}
      <div className="w-full relative z-10">
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-10 border-t border-neutral-800">
          <h2 className="text-3xl font-bold mb-8 text-white">Test Components</h2>
          
          <div className="space-y-12">
            {/* Pennyworth Section */}
            <section className="p-6">
              <div className="max-w-4xl mx-auto space-y-16">
                <p className="text-2xl text-neutral-300 font-light mb-16 leading-relaxed">
                  Pennyworth provides users with tools to conveniently track, organise, and
                  control their various subscription expenses from one centralised platform.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-1">
                    <h2 className="text-xl font-semibold mb-4 text-neutral-200">
                      Research & Discovery
                    </h2>
                  </div>
                  <div className="col-span-2 space-y-6">
                    <p className="text-neutral-300 leading-relaxed">
                      Research reveals key frustrations like unexpected debits, difficulty
                      cancelling subscriptions, fragmented payment accounts, hidden
                      fees, and uncertainty about which subscriptions are worth keeping.
                    </p>
                    <p className="text-neutral-300 leading-relaxed">
                      This shows that people prefer optimising their subscriptions rather
                      than canceling them entirely.
                    </p>
                  </div>
                </div>

                <div className="border-t border-neutral-800"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-1">
                    <h2 className="text-xl font-semibold mb-4 text-neutral-200">
                      Research & Discovery
                    </h2>
                  </div>
                  <div className="col-span-2 space-y-6">
                    <p className="text-neutral-300 leading-relaxed">
                      Research reveals key frustrations like unexpected debits, difficulty
                      cancelling subscriptions, fragmented payment accounts, hidden
                      fees, and uncertainty about which subscriptions are worth keeping.
                    </p>
                    <p className="text-neutral-300 leading-relaxed">
                      This shows that people prefer optimising their subscriptions rather
                      than canceling them entirely.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
