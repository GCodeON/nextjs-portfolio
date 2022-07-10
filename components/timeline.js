import React, { useRef, useState } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';


export default class Timeline extends React.Component {

  super(props) {
    this.timeline = props.info
  }
  
  componentDidMount() {
    AOS.init({
      delay  : 100,
      mirror : true,
      // duration: 1000
    });
  }

  render() {
    return (
      <div className="timeline-component">
        <h2 className="title">Experience</h2>


        <style jsx global>{`


        `}</style>

      </div>
    )
  }

}
