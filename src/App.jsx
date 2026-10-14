import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhatWeOfferSection from './components/WhatWeOfferSection';
import HowItWorksSection from './components/HowItWorksSection';
import ServicesSection from './components/ServicesSection';
import ShowcaseMarquee from './components/ShowcaseMarquee';
import ValuePropositionSection from './components/ValuePropositionSection';
import TestimonialsMarquee from './components/TestimonialsMarquee';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import BottomCtaSection from './components/BottomCtaSection';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import CreateVideoModal from './components/CreateVideoModal';

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const handleOpenInquiryModal = () => {
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiryModal = () => {
    setIsInquiryModalOpen(false);
  };

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideoModal = () => {
    setSelectedVideo(null);
  };

  // Scroll to the AI Showcase section where the 5 user videos are presented
  const handleOpenShowreel = () => {
    const el = document.getElementById('ai-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-800">
      
      {/* 1. Header / Navbar */}
      <Navbar 
        onOpenInquiryModal={handleOpenInquiryModal} 
        onOpenShowreel={handleOpenShowreel}
      />

      <main>
        {/* 1. Hero Section */}
        <HeroSection 
          onOpenShowreel={handleOpenShowreel}
          onOpenInquiryModal={handleOpenInquiryModal}
        />

        {/* 2. What We Offer / See What We Can Create Section */}
        <WhatWeOfferSection onOpenInquiryModal={handleOpenInquiryModal} />

        {/* 4. Video Production Services: What Can We Create for Your Business? */}
        <ServicesSection 
          onOpenInquiryModal={handleOpenInquiryModal}
        />

        {/* 3-Step "How It Works" Section: Content & Script, Generate Storyboard, Watch Socials Grow */}
        <HowItWorksSection />

        {/* Interactive Showreel Marquee Showcase */}
        <ShowcaseMarquee 
          onSelectVideo={handleSelectVideo} 
        />

        {/* 3. Value Proposition Section: 5 AI Videos Showcase */}
        <ValuePropositionSection onOpenVideoModal={handleSelectVideo} />

        {/* Testimonials Section: "Hear what they say about us" */}
        <TestimonialsMarquee />

        {/* 5. Pricing Section: Complete Video Production. One Simple Price. Just €69 per finished minute. */}
        <PricingSection 
          onOpenInquiryModal={handleOpenInquiryModal}
        />

        {/* FAQ Section */}
        <FaqSection />

        {/* 6. Final Call to Action Section */}
        <BottomCtaSection 
          onOpenInquiryModal={handleOpenInquiryModal}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenInquiryModal={handleOpenInquiryModal}
      />

      {/* Full Vertical Reel Video Player Modal */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={handleCloseVideoModal}
          onOpenInquiryModal={handleOpenInquiryModal}
        />
      )}

      {/* Interactive Video Inquiry & €69/min Calculator Modal */}
      <CreateVideoModal 
        isOpen={isInquiryModalOpen} 
        onClose={handleCloseInquiryModal} 
      />

    </div>
  );
}
