import React from 'react';

interface Sponsor {
  name: string;
  imageUrl: string;
}

const SponsorsPage: React.FC = () => {
  const sponsors: Sponsor[] = [
    { name: 'A-one Mart', imageUrl: '/sponsors/2.jpeg' },
    { name: 'Amul', imageUrl: '/sponsors/3.jpeg' },
    { name: 'Chatkara', imageUrl: '/sponsors/4.jpeg' },
    { name: '', imageUrl: '/sponsors/5.jpeg' },
    { name: 'The Garrison Co', imageUrl: '/sponsors/6.jpeg' },
    { name: 'Cook House', imageUrl: '/sponsors/7.jpeg' },
    { name: 'The Crazy Chef', imageUrl: '/sponsors/8.jpeg' },
    { name: 'Dev Sweets', imageUrl: '/sponsors/9.jpeg' },
    { name: 'Havmor', imageUrl: '/sponsors/10.jpeg' },
    { name: 'Dialog', imageUrl: '/sponsors/11.jpeg' },
    { name: 'Jaipur Bakers', imageUrl: '/sponsors/12.jpeg' },
    { name: 'Lets Go Live', imageUrl: '/sponsors/13.jpeg' },
    { name: 'Nescafe', imageUrl: '/sponsors/14.jpeg' },
    { name: 'Parth', imageUrl: '/sponsors/15.jpeg' },
    { name: 'Pizza Bakers', imageUrl: '/sponsors/16.jpeg' },
    { name: 'Pushpak Couriers & Stationers', imageUrl: '/sponsors/17.jpeg' },
    { name: 'Sanchay', imageUrl: '/sponsors/18.jpeg' },
    { name: 'Saras', imageUrl: '/sponsors/19.jpeg' },
    { name: 'KVR Stationers', imageUrl: '/sponsors/20.jpeg' },
    { name: 'Stardom', imageUrl: '/sponsors/21.jpeg' },
    { name: 'Sunny Mart', imageUrl: '/sponsors/22.jpeg' },
    { name: 'Tandoor', imageUrl: '/sponsors/23.jpeg' },
    { name: 'Taste Of India', imageUrl: '/sponsors/24.jpeg' },
    { name: 'Tea Post', imageUrl: '/sponsors/25.jpeg' },
    { name: 'Tea Tradition', imageUrl: '/sponsors/26.jpeg' },
    { name: 'Italian Over', imageUrl: '/sponsors/27.jpeg' },
    { name: 'Kitchen and Curry', imageUrl: '/sponsors/28.jpeg' },
    { name: 'Selective', imageUrl: '/sponsors/29.jpeg' },
    { name: 'Trendz', imageUrl: '/sponsors/30.jpeg' },
    { name: 'Dhaabe-da-Zaika', imageUrl: '/sponsors/31.jpeg' },
    { name: 'Zero Degree Cafe', imageUrl: '/sponsors/32.jpeg' },
    { name: 'The South Street Cafe', imageUrl: '/sponsors/33.jpeg' },
    { name: 'Best Care Pharmacy', imageUrl: '/sponsors/34.jpeg' },
    { name: 'Kavin Enterprises', imageUrl: '/sponsors/35.jpeg' },
    { name: 'Tech Care Hygenic Solutions', imageUrl: '/sponsors/36.jpeg' },
    { name: 'DAS Solutions', imageUrl: '/sponsors/37.jpeg' },
    { name: 'The Waffle Co', imageUrl: '/sponsors/38.jpeg' },
    { name: 'Shrinath Tours and Travels', imageUrl: '/sponsors/39.jpeg' },
    { name: 'Mini Meals', imageUrl: '/sponsors/40.jpeg' },
    { name: 'Fit n Fresh', imageUrl: '/sponsors/41.jpeg' },
    { name: 'Soya Chaap Corner', imageUrl: '/sponsors/42.jpeg' },
    { name: 'Munch Box', imageUrl: '/sponsors/43.jpeg' },
    { name: 'Punjabi Tadka', imageUrl: '/sponsors/44.jpeg' },
    { name: 'Elite Salon', imageUrl: '/sponsors/45.jpeg' },
    { name: 'The Food Court Co', imageUrl: '/sponsors/47.jpeg' },
    { name: 'All Mart', imageUrl: '/sponsors/48.jpeg' },
    { name: 'Suraj', imageUrl: '/sponsors/49.jpeg' },
    { name: 'AquaCare Solutions EnviroEngineers', imageUrl: '/sponsors/50.jpeg' },
    { name: 'Venus Trading Co', imageUrl: '/sponsors/52.jpeg' },
    { name: 'Subway', imageUrl: '/sponsors/212.jpeg' },
  ];

  const SponsorCard: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300 border border-gray-100 h-full">
      <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gray-50 rounded-full p-2">
        <img
          alt={sponsor.name}
          className="object-contain w-full h-full"
          src={sponsor.imageUrl}
        />
      </div>
      <h3 className="text-sm font-bold text-center text-gray-800 line-clamp-2">
        {sponsor.name}
      </h3>
    </div>
  );

  return (
    <div className="min-h-screen text-gray-800 relative">
      {/* Background Layer - Same as other pages */}
      <div 
        className="fixed inset-0 -z-10 bg-no-repeat 
                   bg-[url('./Background.png')] 
                   bg-center bg-cover md:bg-fixed"
      />

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-6 pb-32">
        {/* Header with Logo */}
        <header className="text-center mb-12">
          <img 
            src="/ghs_carnival_logo.png" 
            alt="GHS Carnival Logo" 
            className="h-14 md:h-16 w-auto object-contain drop-shadow-lg mx-auto mb-0"
          />
          <p className="text-[#3B3B58] font-semibold text-lg md:text-xl tracking-wide uppercase">
            Our Generous Sponsors
          </p>
          <div className="w-24 h-1 bg-[#FF8736] mx-auto mt-2 rounded-full"></div>
        </header>

        {/* Unified Sponsors Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sponsors.map((sponsor, index) => (
              <SponsorCard key={index} sponsor={sponsor} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SponsorsPage;
