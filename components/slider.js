import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Pagination, Scrollbar, Navigation } from 'swiper/core';

import 'swiper/swiper.min.css'
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

SwiperCore.use([EffectCoverflow, Pagination, Scrollbar, Navigation]);
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
          className       = "slider"
          autoHeight      = {true}
          effect          = {"coverflow"}
          centeredSlides  = {true}
          grabCursor      = {true}
          spaceBetween    = {10}
          slidesPerView   = {2}
          initialSlide    = {2}
          observer        = {true}
          observeParents  = {true}
          autoplay        = {true}
          navigation      = {true}
          pagination      = {{ clickable: true }}
          scrollbar       = {{ draggable: true }}
          coverflowEffect = {{
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
              initialSlide   : 1,
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
              initialSlide   : 1,
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
