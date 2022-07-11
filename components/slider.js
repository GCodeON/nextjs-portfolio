import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper/core';

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
        <h2 className="title">Projects</h2>
        <Swiper
          className      = "slider"
          effect         = {"coverflow"}
          centeredSlides = {true}
          grabCursor     = {true}
          pagination     = {false}
          spaceBetween   = {10}
          slidesPerView  = {2}
          initialSlide   = {2}
          observer       = {true}
          observeParents = {true}
          autoplay       = {true}
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
            767: {
              width         : 767,
              slidesPerView : 1.5,
              spaceBetween  : 10,
              initialSlide   : 3
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
            1660: {
              width          : 1660,
              slidesPerView  : 2,
              spaceBetween   : 50,
              initialSlide   : 0,
              centeredSlides : false
            },
          }}
        >

        { this.props.slides.map((slide, idx) => (

          <SwiperSlide key={idx}>
            <a 
              className="slide link" 
              href={slide.link} 
              target="_blank">
              <img src={slide.image} />
            </a>
            {/* <hr className="seperator"/> */}
            <div className="tools">
              {slide.tools.map((tool, i) => (
                <img 
                  className="tool image" 
                  src={tool.image} 
                  key={i} />
              ))}
            </div>
          </SwiperSlide>
        ))}

        </Swiper>

        <style jsx global>{`


        `}</style>

      </div>
    )
  }

}
