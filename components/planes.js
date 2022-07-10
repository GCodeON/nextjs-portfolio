import React from 'react'
import Head from 'next/head'

import AOS from 'aos';
import 'aos/dist/aos.css';

export default class Planes extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    AOS.init({
      delay  : 200,
      mirror : true
    });
  }

  render() {
    return (
    <div className="planes-component">
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
      </Head>
        <div className='planes'>
          <div className="content">
            <div className="item" data-aos="zoom-out-left">
              <a href="/#about" className='link'>
                <span className="pretitle">About</span>
                {/* <h2 className="title">About</h2> */}
              </a>
            </div>
            <div className="item" data-aos="zoom-out-right">
              <a href="/#work" className='link'>
                <span className="pretitle">Projects</span>
                {/* <h2 className="title">Work</h2> */}
              </a>
            </div>
            <div className="item"  data-aos="zoom-out-left">
              <a href="/#" className='link'>
                <span className="pretitle">Experience</span>
                {/* <h2 className="title">Experience</h2> */}
              </a>
            </div>
            <div className="item" data-aos="zoom-out-right">
              <a href="/#" className='link'>
                <span className="pretitle">Contact</span>
                {/* <h2 className="title">Contact</h2> */}
              </a>
            </div>
          </div>
        </div>
      <style jsx>{`

      `}</style>

    </div>
    )
  }
}

