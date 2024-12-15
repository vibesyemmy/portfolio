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
    <>
      <CaseStudyNav navigation={getNavigation()} className="absolute top-0 left-0 right-0 z-50" />
      <main className="min-h-screen bg-neutral-950 text-white">
        {/* Hero Section */}
        <BlurImageBackground
          imageSrc="/images/phonecash.webp"
          className="min-h-[60vh] flex items-center justify-center pt-24 md:pt-16"
          overlayClassName="bg-black/60"
        >
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
            {/* Hero Element 1: Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8">
              PhoneCash: A Fintech Solution for Cashless Transactions
            </h1>
            {/* Hero Element 2: Description */}
            <p className="text-white text-center max-w-2xl mx-auto text-lg md:text-xl mb-12">
              Revolutionizing Mobile Money Transfers in Africa
            </p>
            
            {/* Hero Element 3: Project Details Grid */}
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
                <p className="text-white font-medium">2 months</p>
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

        {/* Overview Section */}
        <section className="py-16 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg prose-invert">
              <p className="text-2xl text-neutral-300 font-normal mb-16 leading-relaxed">
              PhoneCash is a revolutionary mobile money transfer solution designed to address the unique challenges of financial transactions in Africa. The project aimed to create a secure, user-friendly platform that would make cashless transactions accessible to everyone, regardless of their technical expertise or banking status.
              </p>
              <p className="text-2xl text-neutral-300 font-normal mb-16 leading-relaxed">
                This case study demonstrates the UI/UX design process of PhoneCash, from research 
                to prototyping, testing and iteration. The main challenge was to create a 
                user-friendly and secure payment solution that can appeal to the Nigerian mobile 
                phone users.
              </p>
            </div>
          </div>
        </section>

        {/* Overview Image Section */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="w-full prose prose-lg prose-invert">
            <div className="w-full max-w-none">
              <div className="relative w-full pb-[66.76%] rounded-lg md:rounded-3xl overflow-hidden">
                <img
                  src="/images/phone_cash.png"
                  alt="PhoneCash Overview"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Problem Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">Problem</h2>
              </div>
              <div className="col-span-2 space-y-8">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  According to a report by 1, Nigeria has one of the lowest rates of financial inclusion in Africa, with only 40% of adults having access to formal financial services. This means that many people rely on cash for their daily transactions, which poses several challenges such as:
                </p>
                
                <ul className="space-y-6 text-lg text-neutral-300">
                  <li>
                    <span className="font-medium text-neutral-200">Insecurity:</span> Carrying large amounts of cash can expose people to theft, robbery or fraud.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Inefficiency:</span> Cash transactions can be time-consuming, inconvenient and costly due to fees or transportation costs.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Exclusion:</span> People who do not have bank accounts or access to digital platforms are left out of the formal economy and opportunities.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="w-full h-px bg-neutral-800"></div>
          </div>

          {/* Goal Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">Goal</h2>
              </div>
              <div className="col-span-2 space-y-8">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  The goal of PhoneCash is to provide a simple, secure and accessible way for people to make and receive payments without relying on cash or bank accounts. The product aims to:
                </p>
                
                <ul className="space-y-6 text-lg text-neutral-300">
                  <li>
                    <span className="font-medium text-neutral-200">Increase financial inclusion</span> by reaching out to unbanked and underbanked populations who have mobile phones but no access to formal financial services.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Improve transaction efficiency</span> by reducing the time, cost and hassle involved in cash transactions.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Enhance user experience</span> by providing a user-friendly interface that supports multiple languages, currencies and payment methods.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="w-full h-px bg-neutral-800"></div>
          </div>

          {/* Research Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">Research</h2>
                <div className="hidden md:block relative mt-24">
                  <img
                    src="/images/research_phone_cash.png"
                    alt="Research Decoration"
                    className="w-full object-contain opacity-80"
                  />
                </div>
              </div>
              <div className="col-span-2 space-y-6">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  To understand the needs and challenges of our target users, we conducted:
                </p>
                <ul className="space-y-6 text-lg text-neutral-300">
                  <li>
                    <span className="font-medium text-neutral-200">User Interviews:</span> We interviewed 20 people from different backgrounds and locations in Nigeria to learn about their payment habits, preferences and pain points.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Market Analysis:</span> We analyzed the existing mobile payment solutions in Nigeria and identified their strengths and weaknesses.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Competitive Research:</span> We studied successful mobile payment platforms in other African countries to learn from their best practices and innovations.
                  </li>
                </ul>

                <div className="col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl border border-emerald-500/20 bg-neutral-900/50">
                    <p className="text-emerald-400 leading-relaxed">
                      According to Statista, Nigeria had 99.05 million internet users in 2020, which is about 47.1% of the population.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border border-emerald-500/20 bg-neutral-900/50">
                    <p className="text-emerald-400 leading-relaxed">
                      According to McKinsey, Nigeria's fintech revenue is projected to reach $543 million by 2022, growing at a compound annual growth rate of 24.4%.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border border-emerald-500/20 bg-neutral-900/50">
                    <p className="text-emerald-400 leading-relaxed">
                      According to PwC, Nigeria's fintech adoption rate was 48% in 2019, higher than the global average of 33% and the African average of 32%.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border border-emerald-500/20 bg-neutral-900/50">
                    <p className="text-emerald-400 leading-relaxed">
                      According to Nairametrics, Paga was the most popular fintech platform in Nigeria in 2020, with over 17 million users and over $2 billion worth of transactions processed.
                    </p>
                  </div>
                </div>
              </div>



              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="w-full h-px bg-neutral-800"></div>
          </div>

          {/* User Personas Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <h2 className="text-xl font-semibold mb-12 text-neutral-200">
              User Personas
            </h2>
            
            <div className="space-y-16">
              {/* Persona 1 */}
              <div className="grid grid-cols-12 gap-8 border border-neutral-800 rounded-3xl p-8">
                {/* Profile Card */}
                <div className="col-span-4">
                  <img src="/images/persona1.png" alt="Aisha Alabi Persona" className="w-full h-auto rounded-3xl" />
                </div>

                {/* Details */}
                <div className="col-span-8 space-y-8">
                  <div>
                    <h4 className="text-base font-semibold mb-3">ABOUT</h4>
                    <p className="text-sm text-neutral-300">
                      Aisha is a 25-year-old fashion designer who runs her own online boutique. She lives in Abuja with her parents and younger sister. She earns N200,000 per month and has a bank account with Zenith Bank. She uses her smartphone for taking pictures of her products, posting them on Instagram and WhatsApp, and communicating with her customers.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold mb-3">NEEDS</h4>
                    <p className="text-sm text-neutral-300">
                      Aisha needs a flexible and efficient way to receive payments from her customers across Nigeria, pay her suppliers and vendors, and manage her cash flow. She also wants to grow her business by reaching more customers online.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold mb-3">FRUSTRATIONS</h4>
                    <p className="text-sm text-neutral-300">
                      Aisha is frustrated by the delays and errors in receiving bank transfers from her customers, the high fees charged by payment platforms like Paystack and Flutterwave, and the lack of transparency in tracking her transactions. She also struggles with keeping records of her income and expenses manually.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold mb-3">EXPECTATIONS</h4>
                    <p className="text-sm text-neutral-300">
                      Aisha expects PhoneCash to be seamless and secure. She wants to be able to receive payments instantly using her phone number without sharing her bank details. She also wants to access real-time reports of her transactions history on PhoneCash app.
                    </p>
                  </div>
                </div>
              </div>

              {/* Persona 2 */}
              <div className="grid grid-cols-12 gap-8 border border-neutral-800 rounded-3xl p-8">
                {/* Profile Card */}
                <div className="col-span-4">
                  <img src="/images/persona2.png" alt="Tunde Adamu Persona" className="w-full h-auto rounded-3xl" />
                </div>

                {/* Details */}
                <div className="col-span-8 space-y-8">
                  <div>
                    <h4 className="text-base font-semibold mb-3">ABOUT</h4>
                    <p className="text-sm text-neutral-300">
                      Tunde is a 40-year-old farmer who lives in Kano with his wife and four kids. He earns N50,000 per month and does not have a bank account. He uses a feature phone for making calls and sending SMS.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold mb-3">NEEDS</h4>
                    <p className="text-sm text-neutral-300">
                      Tunde needs a simple and accessible way to buy seeds, fertilizers and pesticides for his farm, sell his produce to buyers in other cities and states, and support his family's daily expenses. He also wants to join a cooperative society that can help him access loans and insurance for his farm.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold mb-3">FRUSTRATIONS</h4>
                    <p className="text-sm text-neutral-300">
                      Tunde is frustrated by the lack of cash availability in his rural area, the high cost and risk of transporting cash to distant markets, and the exploitation by middlemen who offer low prices for his produce. He also faces challenges in accessing formal financial services due to his low literacy level and lack of documentation.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold mb-3">EXPECTATIONS</h4>
                    <p className="text-sm text-neutral-300">
                      Tunde expects PhoneCash to be affordable and easy to use. He wants to be able to make payments using USSD codes on his feature phone without internet access. He also wants to receive financial education and guidance from PhoneCash agents on how to use the service effectively.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="w-full h-px bg-neutral-800"></div>
          </div>

          {/* Insights Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <h2 className="text-xl font-semibold mb-4 text-neutral-200">
              Insights
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed mb-12">
              From our research findings, we derived some key insights that informed our design decisions:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-lg border border-neutral-800">
                <p className="text-base text-neutral-200 leading-relaxed">
                  Users value simplicity, security and convenience when it comes to payment solutions. They want a solution that is easy to use.
                </p>
              </div>

              <div className="p-8 rounded-lg border border-neutral-800">
                <p className="text-base text-neutral-200 leading-relaxed">
                  Users have different preferences and needs depending on their context, location and income level. Some users prefer USSD codes because they are familiar and easy to remember, while others prefer phone numbers because they are more convenient and personal.
                </p>
              </div>

              <div className="p-8 rounded-lg border border-neutral-800">
                <p className="text-base text-neutral-200 leading-relaxed">
                  Users face various challenges and risks when using cash such as theft, fraud, counterfeit notes, lack of change, etc. They want a solution that can protect them from these issues and provide them with a record of their transactions.
                </p>
              </div>

              <div className="p-8 rounded-lg border border-neutral-800">
                <p className="text-base text-neutral-200 leading-relaxed">
                  Reliable and fast, and does not require internet connection or bank account details.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="w-full h-px bg-neutral-800"></div>
          </div>

          {/* Information Architecture Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-neutral-200">Information Architecture</h2>
              <img 
                src="/images/ia.png" 
                alt="Information Architecture Diagram" 
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="w-full h-px bg-neutral-800"></div>
          </div>

          {/* Design System Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-neutral-200">Design System</h2>
              <div className="space-y-8">
                <img 
                  src="/images/design-system.png" 
                  alt="Design System" 
                  className="w-full rounded-lg"
                />
                <img 
                  src="/images/design-system2.png" 
                  alt="Design System Components" 
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="w-full h-px bg-neutral-800"></div>
          </div>

          {/* Mockups Section */}
          <div className="max-w-7xl mx-auto mt-24">
            <div className="space-y-8">
              <div className="space-y-8">
                <img 
                  src="/images/phonecash-mock.png" 
                  alt="PhoneCash Mockup" 
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="w-full h-px bg-neutral-800"></div>
          </div>

          {/* Testing Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">Testing</h2>
              </div>
              <div className="col-span-2 space-y-8">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  The prototype was then tested with 5 potential users using Zoom. The testing methods included:
                </p>
                
                <ul className="space-y-6 text-lg text-neutral-300">
                  <li>
                    <span className="font-medium text-neutral-200">Task completion:</span> The users were asked to complete specific tasks using the prototype such as making a payment or checking transaction history.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Think aloud:</span> The users were asked to verbalize their thoughts while using the prototype such as what they liked or disliked or what confused them.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Post-test questionnaire:</span> The users were asked to rate and comment on the prototype's usability, functionality, and aesthetics.
                  </li>
                </ul>

                <p className="text-lg text-neutral-300 leading-relaxed">
                  The main findings from the testing were:
                </p>

                <ul className="space-y-6 text-lg text-neutral-300">
                  <li>
                    <span className="font-medium text-neutral-200">Simplicity:</span> Users liked the simplicity and convenience of PhoneCash, especially the USSD code option that works without internet connection.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Security:</span> Users appreciated the security features of PhoneCash, such as the transaction PIN and the verification code.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Clarity:</span> Users found some screens confusing or unclear, such as the topup wallet screen and the scan and pay screen. They suggested adding more instructions or labels.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Performance:</span> Users encountered some technical issues with the prototype, such as slow loading time or unresponsive buttons.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="w-full h-px bg-neutral-800"></div>
          </div>

          {/* Iteration Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">Iteration</h2>
              </div>
              <div className="col-span-2 space-y-8">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  Based on the feedback from the testing, the prototype was iterated to improve the user experience of PhoneCash. The main changes made were:
                </p>
                
                <ul className="space-y-6 text-lg text-neutral-300">
                  <li>
                    <span className="font-medium text-neutral-200">Instructions:</span> Added more instructions and labels to clarify some screens and actions.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Simplification:</span> Simplified some screens by removing unnecessary elements or steps.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Visual Enhancement:</span> Enhanced some visuals by adjusting colors, fonts, and icons.
                  </li>
                  <li>
                    <span className="font-medium text-neutral-200">Bug Fixes:</span> Fixed some bugs and errors that affected the functionality of PhoneCash.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="w-full h-px bg-neutral-800"></div>
          </div>

          {/* Competitive Analysis Section */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="grid grid-cols-1 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold text-neutral-200">Competitive Analysis (Supplementary information)</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Paga Card */}
                <div className="bg-neutral-900 rounded-xl p-8 space-y-6">
                  <div className="h-8">
                    <img src="/images/paga.png" alt="Paga Logo" className="h-full object-contain" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">Value Proposition</h3>
                      <p className="text-sm text-neutral-300">Paga provides financial freedom to customers by allowing them to send and receive money, pay bills, buy airtime and data, request money, access loans, receive foreign transfers and save money in a separate wallet. Paga also operates an agent network across Nigeria.</p>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">Market Share</h3>
                      <p className="text-sm text-neutral-300">According to its website, Paga has over 17 million customers and 27 thousand agents as of October 2021. It also claims to have processed over $9 billion in transactions since its launch in 2009.</p>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">User Feedback</h3>
                      <p className="text-sm text-neutral-300">According to Trustpilot, Paga has an average rating of 3.2 out of 5 stars based on 13 reviews. Some users praise Paga for its convenience, speed and reliability, while others complain about delays, poor customer service and technical issues.</p>
                    </div>
                  </div>
                </div>

                {/* Paystack Card */}
                <div className="bg-neutral-900 rounded-xl p-8 space-y-6">
                  <div className="h-8">
                    <img src="/images/paystack.png" alt="Paystack Logo" className="h-full object-contain" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">Value Proposition</h3>
                      <p className="text-sm text-neutral-300">Paystack enables businesses to accept payments from multiple channels including mobile money, cards and bank accounts. Paystack also provides APIs for developers to build custom payment solutions.</p>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">Market Share</h3>
                      <p className="text-sm text-neutral-300">According to its website, Paystack powers over 60% of online payments in Nigeria and serves over 60 thousand businesses across Africa. It also claims to have processed over $1 billion in transactions since its launch in 2016.</p>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">User Feedback</h3>
                      <p className="text-sm text-neutral-300">According to Trustpilot, Paystack has an average rating of 4 out of 5 stars based on 10 reviews. Some users commend Paystack for its ease of use, security and innovation, while others criticize it for high fees, poor customer service and technical issues.</p>
                    </div>
                  </div>
                </div>

                {/* MTN Card */}
                <div className="bg-neutral-900 rounded-xl p-8 space-y-6">
                  <div className="h-8">
                    <img src="/images/mtn.png" alt="MTN Logo" className="h-full object-contain" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">Value Proposition</h3>
                      <p className="text-sm text-neutral-300">MTN mobile money (Ghana) allows customers to send and receive money, pay bills, buy airtime and data, access loans and insurance products, pay merchants and withdraw cash at authorized agents. MTN mobile money (Ghana) also offers savings and investment products through partner banks.</p>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">Market Share</h3>
                      <p className="text-sm text-neutral-300">According to its website, MTN mobile money (Ghana) has over 18 million customers as of June 2020. It also claims to have processed over $52 billion in transactions since its launch in 2009.</p>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">User Feedback</h3>
                      <p className="text-sm text-neutral-300">According to Trustpilot, MTN mobile money (Ghana) has an average rating of 2 out of 5 stars based on one review. The user complains about poor customer service and fraudsters using the service.</p>
                    </div>
                  </div>
                </div>

                {/* PhoneCash Card */}
                <div className="bg-neutral-800 rounded-xl p-8 space-y-6 border border-neutral-700 relative pt-6">
                  <div className="absolute -top-3 -right-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">Our Solution</div>
                  <div className="h-8">
                    <img src="/images/phonecash.png" alt="PhoneCash Logo" className="h-full object-contain" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">Value Proposition</h3>
                      <p className="text-sm text-neutral-300">A simple and secure mobile wallet that allows users to send and receive money, pay bills using a mobile-friendly web interface and USSD codes.</p>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">Market Share</h3>
                      <p className="text-sm text-neutral-300">N/A (new entrant)</p>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-neutral-200 mb-2">User Feedback</h3>
                      <p className="text-sm text-neutral-300">N/A (new entrant)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="w-full h-px bg-neutral-800"></div>
          </div>

          {/* Case Study Navigation */}
          <div className="mt-32">
            <CaseStudyNav prevCase={prevCase} nextCase={nextCase} />
          </div>
        </div>
      </main>
    </>
  );
}
