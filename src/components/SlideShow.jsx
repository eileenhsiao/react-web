import { useEffect, useState } from "react";

const Slideshow = ({ images = [], interval = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // 自動切換圖片
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
      {/* 圖片 */}
      <div className="w-full h-[30vh] md:h-[60vh]">
        <img
          src={images[current]}
          alt={`slide-${current}`}
          className="w-full h-full object-cover transition duration-500"
        />
      </div>

      {/* 點點指示器 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "header scale-110" : "header opacity-40"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
