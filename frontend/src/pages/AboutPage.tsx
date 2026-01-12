import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Users, Star, ChevronDown } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const carouselImages = [
    { url: 'https://static.toiimg.com/thumb/imgsize-23456,msid-121105324,width-600,resizemode-4/box-cricket-is-hugely-popular-in-urban-gujarat.jpg', alt: 'Box Cricket Action' },
    { url: 'https://i0.wp.com/scoutlife.org/wp-content/uploads/2017/03/chess-1.jpg?resize=620%2C465&ssl=1', alt: 'Chess' },
    { url: 'https://i.ytimg.com/vi/b1OnBNAA3IA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBi_AtHEMeRKYOA_TZvRnMEkyEQyw', alt: 'Table Tennis Smash' },
  ];

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  }, [carouselImages.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFBEB] via-[#FFF7ED] to-[#FFEDD5] text-gray-800 font-sans pb-20 relative">
      
      {/* Logo in Top Left */}
      <div className="absolute top-6 left-6 z-20">
        <img 
          src="./ghs_carnival_logo.png" 
          alt="GHS Carnival Logo" 
          className="h-16 w-auto object-contain drop-shadow-md"
        />
      </div>

      {/* 1. Header & Description Section */}
      <section className="max-w-4xl mx-auto pt-24 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-[#D97706] mb-6 tracking-tight drop-shadow-sm">
          About GHS Carnival
        </h1>
        <p className="text-xl leading-relaxed text-gray-700">
          The <span className="font-bold text-[#D97706]">GHS Carnival</span> is the ultimate celebration of sportsmanship, grit, and hostel brotherhood. 
          More than just a tournament, it’s where legends are born on the box cricket pitch and 
          rivalries are settled. Our platform provides <span className="font-bold text-orange-600 underline decoration-orange-400 decoration-2 underline-offset-4">real-time live scores</span> and updates to ensure you never miss a single run, goal, or point—no matter where you are in the hostel.
        </p>
      </section>

      {/* 2. Stats/Highlights Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm flex flex-col items-center text-center hover:bg-white/60 transition-colors">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-2xl mb-4 shadow-lg shadow-orange-200">
            <Trophy className="text-white" size={28} />
          </div>
          <h3 className="font-black text-2xl text-gray-900">5+ Sports</h3>
          <p className="text-gray-600 mt-1 font-medium">Cricket to Table Tennis</p>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm flex flex-col items-center text-center hover:bg-white/60 transition-colors">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-2xl mb-4 shadow-lg shadow-orange-200">
            <Users className="text-white" size={28} />
          </div>
          <h3 className="font-black text-2xl text-gray-900">10+ Blocks</h3>
          <p className="text-gray-600 mt-1 font-medium">Inter-Hostel Rivalry</p>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm flex flex-col items-center text-center hover:bg-white/60 transition-colors">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-2xl mb-4 shadow-lg shadow-orange-200">
            <Star className="text-white" size={28} />
          </div>
          <h3 className="font-black text-2xl text-gray-900">Live Engine</h3>
          <p className="text-gray-600 mt-1 font-medium">Instant Ball-by-Ball Updates</p>
        </div>
      </section>

      {/* 3. Interactive Carousel Section */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div 
          onClick={nextSlide}
          className="relative overflow-hidden rounded-[2.5rem] border-[8px] border-white shadow-2xl aspect-video cursor-pointer group"
        >
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-10 left-10">
                 <p className="text-white font-bold text-2xl md:text-3xl drop-shadow-lg italic">
                    {image.alt}
                 </p>
                 {/* RESTORED: Click to see next hint */}
                 <p className="text-orange-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                   Click to see next →
                 </p>
              </div>
            </div>
          ))}

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide(index);
                }}
                className={`h-2.5 transition-all duration-500 rounded-full ${
                  index === activeSlide 
                    ? 'bg-orange-500 w-12' 
                    : 'bg-white/60 w-2.5 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQs Section */}
      <section className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#92400E] mb-8">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How do I register my block team?", a: "Registrations are handled by your respective Block Sports Representative. Contact them with your roster." },
            { q: "Where can I see the live standings?", a: "The 'Live Scores' tab on the homepage updates instantly after every match." },
            { q: "Is there a prize for the overall champion?", a: "Yes! The block with the highest cumulative points across all sports wins the GHS Carnival Trophy." }
          ].map((faq, i) => (
            <div key={i} className="bg-white/50 rounded-2xl overflow-hidden border border-orange-100">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-5 text-left flex justify-between items-center font-bold text-gray-800"
              >
                {faq.q}
                <ChevronDown className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-orange-50/50 mt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;