import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper/core';
// Import Swiper React styles
import 'swiper/swiper.min.css'
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([EffectCoverflow,Pagination]);

export default class Slider extends React.Component {

  super(props) {
    this.slides = props.slides
  }
  
  componentDidMount() {

  }

  render() {
    return (
      <div className="slider-component">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={20}
          slidesPerView={2}
          coverflowEffect={{
            rotate       : 60,
            stretch      : 0,
            depth        : 100,
            modifier     : 1,
            slideShadows : true
          }}
          pagination={false}
          className="slider"
        >

        { this.props.slides.map((slide, idx) => (

          <SwiperSlide key={idx}>
            <a className="slide link" href={slide.link} target="_blank">
              <img src={slide.image} />
              {/* <p className="subtitle">
                {slide.link}
              </p> */}
            </a>
          </SwiperSlide>
        ))}

        </Swiper>

        <style jsx global>{`

        .slider-component {
          background: black;
          padding: 100px 0;
        }
        .swiper {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 50px;
        }

        .swiper-slide {
          background-position: center;
          background-size: cover;
          max-width: 768px !important;
          max-height: 768px !important;
        }

        .swiper-slide img {
          display: block;
          width: 100%;
        }
        `}</style>

      </div>
    )
  }

}
