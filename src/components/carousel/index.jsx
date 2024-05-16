// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./index.scss";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";

//Props
//numberOfSlide
//

export default function Carousel({
  numberOfSlide,
  category,
  isUseNavigation = false,
  title,
}) {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const response = await axios.get(
      "https://6627a8dab625bf088c092f74.mockapi.io/Movie"
    );
    console.log(response.data);
    setMovies(response.data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className={`carousel ${numberOfSlide > 1 ? "multi-item" : ""}`}>
      {/* Chi show tittle khi va chi khi co title => neu tittle === nill => kh show tittle */}
      {title && <h1>{title}</h1>}
      <Swiper
        navigation={isUseNavigation}
        slidesPerView={numberOfSlide}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay, Navigation]}
      >
        {/* movie => swiperslide */}
        {/* cu moi movie trong movies => swiperslide */}
        {movies
          .filter((movie) => movie.category === category)
          .map((movie) => (
            <SwiperSlide key={movie.id}>
              <img src={movie.poster_path} alt="" />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
