import React from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { BlurImageBackground } from "../components/ui/blur-image-background";
import { BoltIcon, SwatchIcon, HeartIcon } from "@heroicons/react/24/outline/index.js";
import { useState, useEffect } from "react";
import CaseStudyNav from '../components/ui/case-study-nav';
import { getNavigation } from '../config/case-studies';

const teamMembers = [
  {
    name: "Opeyemi Ajagbe",
    designation: "Product Designer",
    image: "/images/avatar.png",
  },
  {
    name: "Tobi Okedeji",
    designation: "Backend Engineer",
    image: "/images/boy.png",
  },
  {
    name: "Chioma",
    designation: "UX Researcher",
    image: "/images/girl.png",
  },
];

export default function PhoneCash() {
  const { prevCase, nextCase } = getNavigation('phonecash');

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <BlurImageBackground
        imageSrc="/images/phonecash.webp"
        className="min-h-[60vh] flex items-center justify-center pt-24 md:pt-16"
        overlayClassName="bg-black/60"
      >
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8">
            PhoneCash: A Fintech Solution for Cashless Transactions
          </h1>
          <p className="text-white text-center max-w-2xl mx-auto text-lg md:text-xl mb-12">
            Revolutionizing Mobile Money Transfers in Africa
          </p>
          
          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Role</h3>
              <p className="text-white font-medium">Lead Product Designer</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Client</h3>
              <p className="text-white font-medium">PhoneCash</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Timeline</h3>
              <p className="text-white font-medium">6 months</p>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Overview</h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            PhoneCash is a revolutionary mobile money transfer solution designed to address the unique challenges of financial transactions in Africa. The project aimed to create a secure, user-friendly platform that would make cashless transactions accessible to everyone, regardless of their technical expertise or banking status.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-neutral-900">
              <BoltIcon className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Challenge</h3>
              <p className="text-neutral-400">
                Create an inclusive financial platform that overcomes infrastructure limitations and serves both banked and unbanked populations.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-neutral-900">
              <SwatchIcon className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Approach</h3>
              <p className="text-neutral-400">
                Human-centered design with extensive field research and iterative testing with diverse user groups.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-neutral-900">
              <HeartIcon className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Outcome</h3>
              <p className="text-neutral-400">
                A robust platform processing over 1 million transactions daily with 98% success rate.
              </p>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">The Challenge</h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            In Africa, traditional banking infrastructure often falls short of meeting the needs of the population. We identified several key challenges:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-neutral-200">User Challenges</h3>
              <ul className="list-disc list-inside text-neutral-400 space-y-3">
                <li>Limited access to traditional banking services</li>
                <li>High transaction costs</li>
                <li>Complex user interfaces</li>
                <li>Security concerns</li>
              </ul>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-neutral-200">Technical Challenges</h3>
              <ul className="list-disc list-inside text-neutral-400 space-y-3">
                <li>Unreliable internet connectivity</li>
                <li>Device compatibility issues</li>
                <li>Integration with existing systems</li>
                <li>Regulatory compliance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Solution Design */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Solution</h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            We designed PhoneCash to be intuitive, reliable, and accessible to users across different technological literacy levels.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-neutral-200">Key Features</h3>
              <ul className="list-disc list-inside text-neutral-400 space-y-3">
                <li>USSD and app-based transactions</li>
                <li>Offline transaction capability</li>
                <li>Multi-language support</li>
                <li>Biometric authentication</li>
              </ul>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-neutral-200">User Benefits</h3>
              <ul className="list-disc list-inside text-neutral-400 space-y-3">
                <li>90% lower transaction fees</li>
                <li>24/7 availability</li>
                <li>Instant transfers</li>
                <li>Enhanced security</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Impact & Results */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Impact & Results</h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            PhoneCash has transformed how people handle money in Africa, achieving significant milestones:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-blue-500 mb-2">5M+</h3>
              <p className="text-neutral-400">Active Users</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-green-500 mb-2">$2B+</h3>
              <p className="text-neutral-400">Monthly Transactions</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-purple-500 mb-2">98%</h3>
              <p className="text-neutral-400">User Satisfaction</p>
            </div>
          </div>
        </section>

        {/* Case Study Navigation */}
        <CaseStudyNav prevCase={prevCase} nextCase={nextCase} />
      </div>
    </div>
  );
}
