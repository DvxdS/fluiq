import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

interface Country {
  code: string;
  name: string;
  flagUrl: string;
}

const countries: Country[] = [
  { code: 'CI', name: "Côte d'Ivoire", flagUrl: 'https://flagcdn.com/ci.svg' },
  { code: 'SN', name: 'Sénégal', flagUrl: 'https://flagcdn.com/sn.svg' },
  { code: 'BF', name: 'Burkina Faso', flagUrl: 'https://flagcdn.com/bf.svg' },
  { code: 'TG', name: 'Togo', flagUrl: 'https://flagcdn.com/tg.svg' },
  { code: 'BJ', name: 'Bénin', flagUrl: 'https://flagcdn.com/bj.svg' },
];

export const FlagSlider = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative w-full max-w-md mx-auto py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        className="flag-swiper"
      >
        {countries.map((country) => (
          <SwiperSlide key={country.code} className="flex flex-col items-center justify-center">
            {({ isActive }: { isActive: boolean }) => (
              <div className="flex flex-col items-center transition-all duration-500">
                {/* Flag Image */}
                <div
                  className={`
                    rounded-lg overflow-hidden transition-all duration-500 border-2
                    ${
                      isActive
                        ? 'w-24 h-16 shadow-xl shadow-orange-500/40 border-orange-400 scale-110'
                        : 'w-16 h-12 shadow-md opacity-60 border-gray-300 scale-90'
                    }
                  `}
                >
                  <img
                    src={country.flagUrl}
                    alt={`${country.name} flag`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Country Name (only show for active slide) */}
                <div
                  className={`
                    mt-3 text-sm font-medium text-gray-700 text-center transition-all duration-500
                    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                  `}
                >
                  {country.name}
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute top-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm">
          Pause
        </div>
      )}
    </div>
  );
};
