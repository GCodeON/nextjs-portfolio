import React, { useRef, useState } from "react";

// import AOS from 'aos';
// import 'aos/dist/aos.css';


export default class Timeline extends React.Component {

  super(props) {

  }

  componentDidMount() {
    // AOS.init({
    //   delay  : 100,
    //   mirror : true
    // });

  }

  render() {
    return (
      <div className="timeline-component container">
        <h2 className="title">Experience</h2>
        <div className="timeline">
          {this.props.exp.map((position, i) => (
            <a 
              href={position.link} 
              target="_blank" key={i}>
              <div 
                className={`position ${position.class}`} >
                <div className="copy-content" >
                  <h2 className="pretitle">
                    {position.company}
                  </h2>
                  <p className="pos" dangerouslySetInnerHTML={{__html: position.title}}></p>
                  <p className="type">
                    {position.type}
                  </p>
                  <p className="date">
                    {position.dates}
                  </p>
                </div>
            </div>
            </a>
          ))}
        </div>

        <style jsx global>{`

        `}</style>
      </div>
    )
  }

}
