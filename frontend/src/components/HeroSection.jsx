import React from 'react'

function HeroSection() {
    return (
      <div className="relative h-[80vh] flex items-center justify-center bg-hero bg-cover bg-center">
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  
        {/* Text Content (On Top of Overlay) */}
        <div className="relative text-center text-white">
          <h1 className="font-poppins text-5xl font-extrabold mb-6">
            Farming Made Easy, Growth Made Possible!
          </h1>
          <p className="font-poppins text-3xl font-semibold">
            From fertilizers, animal feeds to farm tools, <br /> get everything you need to boost productivity and maximize.
          </p>   
        </div>
      </div>
    );
  }
  
  export default HeroSection;
  