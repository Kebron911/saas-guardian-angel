import React from "react";

const HomeHowItWorksSection = () => (
  <section id="how-it-works" className="how-it-works bg-white py-24">
    <div className="container max-w-[1200px] mx-auto px-5">
      <div className="section-header text-center mb-20">
        <h2 className="text-3xl font-bold text-[#1A237E] mb-5">How Your AI Phone Receptionist Works</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">Getting started is simple and takes less than a day to implement.</p>
      </div>
      <div className="steps flex justify-between flex-wrap mt-15">
        <div className="step flex-1 min-w-[250px] text-center px-5 mb-10">
          <div className="step-number w-12 h-12 rounded-full bg-[#1A237E] text-white font-bold text-xl flex items-center justify-center mx-auto mb-5">1</div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Sign Up</h3>
          <p className="text-gray-700">Complete our simple sign-up process and select your AI receptionist's voice, name, and personality traits.</p>
        </div>
        <div className="step flex-1 min-w-[250px] text-center px-5 mb-10">
          <div className="step-number w-12 h-12 rounded-full bg-[#1A237E] text-white font-bold text-xl flex items-center justify-center mx-auto mb-5">2</div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Configure Settings</h3>
          <p className="text-gray-700">Define your business hours, customize greetings, and set up call routing rules through our intuitive dashboard.</p>
        </div>
        <div className="step flex-1 min-w-[250px] text-center px-5 mb-10">
          <div className="step-number w-12 h-12 rounded-full bg-[#1A237E] text-white font-bold text-xl flex items-center justify-center mx-auto mb-5">3</div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Forward Your Number</h3>
          <p className="text-gray-700">Simply forward your existing business line to your new AI receptionist number, or integrate directly with your VoIP system.</p>
        </div>
        <div className="step flex-1 min-w-[250px] text-center px-5 mb-10">
          <div className="step-number w-12 h-12 rounded-full bg-[#1A237E] text-white font-bold text-xl flex items-center justify-center mx-auto mb-5">4</div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-3">Go Live</h3>
          <p className="text-gray-700">Your AI receptionist is now ready to answer calls 24/7, providing professional service to your customers.</p>
        </div>
      </div>
    </div>
  </section>
);
export default HomeHowItWorksSection;
