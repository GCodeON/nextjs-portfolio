import React, { useRef, useState } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';


export default class Timeline extends React.Component {

  super(props) {
    // this.timeline = props.timeline ? props.timeline : []
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

        <div class="timeline">

          {this.props.exp.map((position, i) => (
          <div className={`position ${position.class}`} key={i}>
            <div className="copy-content" >
              <h2 className="pretitle">{position.title}</h2>
              <p className="date">{position.dates}</p>
            </div>
          </div>
          ))}
        
         
        </div>

        <style jsx global>{`

        
        `}</style>

      </div>
    )
  }

}
