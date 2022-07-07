import React, { useRef, useState } from "react";

// Import Swiper React styles
import 'swiper/swiper.min.css'
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper/core';
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
          className      = "slider"
          effect         = {"coverflow"}
          centeredSlides = {true}
          grabCursor     = {true}
          pagination     = {false}
          spaceBetween   = {10}
          slidesPerView  = {2}
          initialSlide   = {2}
          coverflowEffect={{
            rotate       : 25,
            stretch      : 0,
            depth        : 100,
            modifier     : 1,
            slideShadows : true
          }}
          breakpoints={{
            320: {
              width         : 320,
              slidesPerView : 1,
              spaceBetween  : 10,
              initialSlide   : 1
            },
            1024: {
              width          : 1024,
              slidesPerView  : 2.7,
              spaceBetween   : 50,
              initialSlide   : 0,
              centeredSlides : false
            },
            1220: {
              width          : 1220,
              slidesPerView  : 3,
              spaceBetween   : 50,
              initialSlide   : 1,
              centeredSlides : false
            },
          }}
        >

        { this.props.slides.map((slide, idx) => (

          <SwiperSlide key={idx}>
            <a className="slide link" href={slide.link} target="_blank">
              <img src={slide.image} />
              {/* <p className="subtitle">
                {slide.link}
              </p> */}
            </a>
            <div className="tools">
              {slide.tools.map((tool, i) => (
                <img className="tool image" src={tool.image} />
              ))}
            </div>
          </SwiperSlide>
        ))}

        </Swiper>

        <style jsx global>{`

        .slider-component {
          background : black;
          padding    : 100px 0;
        }

        `}</style>

      </div>
    )
  }

}
