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
              <a href="" target="_blank" className='link'>
                <span className="pretitle">Know</span>
                {/* <h2 className="title">About</h2> */}
              </a>
            </div>
            <div className="item" data-aos="zoom-out-right">
              <a href="" target="_blank" className='link'>
                <span className="pretitle">Balance</span>
                {/* <h2 className="title">Work</h2> */}
              </a>
            </div>
            <div className="item"  data-aos="zoom-out-left">
              <a href="" target="_blank" className='link'>
                <span className="pretitle">Live</span>
                {/* <h2 className="title">Experience</h2> */}
              </a>
            </div>
            <div className="item" data-aos="zoom-out-right">
              <a href="" target="_blank" className='link'>
                <span className="pretitle">Creative</span>
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

