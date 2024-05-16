// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./index.scss";

// import required modules
import { Pagination } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";
//Props
//numberOfSlide
//

export default function Carousel({ numberOfSlide, category }) {
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
    <>
      <Swiper
        slidesPerView={numberOfSlide}
        autoplay={{
          
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination]}
        className="carousel"
      >
        {/* movie => swiperslide */}
        {/* cu moi movie trong movies => swiperslide */}
        {movies.filter(movie => movie.category === category).map(movie =><SwiperSlide key={movie.id}>
          <img
            src={movie.poster_path}
            alt=""
          />
        </SwiperSlide>)}
        

        
      </Swiper>
    </>
  );
}
