import React from 'react';
import { Ripple } from '../components/ui/ripple';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Component Test Page</h1>
        
        <div className="space-y-12">
          {/* Ripple Section */}
          <section className="bg-neutral-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Ripple Effect</h2>
            <div className="space-y-4">
              {/* Default Ripple */}
              <div className="bg-neutral-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-neutral-400 mb-3">Default Ripple</h3>
                <Ripple>
                  <div className="bg-neutral-700 hover:bg-neutral-600 rounded-lg p-4 text-center">
                    Click me for ripple effect
                  </div>
                </Ripple>
              </div>

              {/* Custom Color Ripple */}
              <div className="bg-neutral-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-neutral-400 mb-3">Custom Color</h3>
                <Ripple color="rgba(168, 85, 247, 0.4)"> {/* Purple ripple */}
                  <div className="bg-purple-900 hover:bg-purple-800 rounded-lg p-4 text-center">
                    Purple ripple effect
                  </div>
                </Ripple>
              </div>

              {/* Fast Ripple */}
              <div className="bg-neutral-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-neutral-400 mb-3">Fast Animation</h3>
                <Ripple duration={400}>
                  <div className="bg-neutral-700 hover:bg-neutral-600 rounded-lg p-4 text-center">
                    Fast ripple effect
                  </div>
                </Ripple>
              </div>

              {/* Button Example */}
              <div className="bg-neutral-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-neutral-400 mb-3">Button Example</h3>
                <div className="flex gap-4">
                  <Ripple>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">
                      Primary Button
                    </button>
                  </Ripple>
                  <Ripple color="rgba(239, 68, 68, 0.4)">
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md">
                      Danger Button
                    </button>
                  </Ripple>
                </div>
              </div>
            </div>
          </section>

          {/* Test Section 1 */}
          <section className="bg-neutral-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Section 1</h2>
            <div className="bg-neutral-800 rounded-lg p-4">
              {/* Add test components here */}
            </div>
          </section>

          {/* Test Section 2 */}
          <section className="bg-neutral-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Section 2</h2>
            <div className="bg-neutral-800 rounded-lg p-4">
              {/* Add test components here */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
