import { useEffect, useState } from "react";

const Slideshow = ({ images = [], interval = 6000 }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, interval);

    return () => clearInterval(timer);
  }, [length, interval]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* 設定為 3.07:1 比例容器 */}
      <div className="relative w-full aspect-[307/100]">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out
              ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
          />
        ))}
      </div>

      {/* 點點指示器 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-white scale-110" : "bg-white opacity-40"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
