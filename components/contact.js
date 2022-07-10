import React, { useRef, useState } from "react";


export default class Timeline extends React.Component {

  super(props) {

  }

  componentDidMount() {


  }

  render() {
    return (
      <div className="contact-component container">
        <h2 className="title">Contact</h2>

        <div className="fields">
          <input placeholder="example@email.com"></input>
          <textarea placeholder="hire me!" rows="6"></textarea>
          <div className="primary button">
            contact
          </div>
        </div>
        
        <style jsx global>{`


      

        `}</style>
      </div>
    )
  }

}
