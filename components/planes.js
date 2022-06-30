import React from 'react'
import Head from 'next/head'
export default class Planes extends React.Component {
  constructor(props) {
    super(props);
    this.planes = null,
    this.smooth = null
  }
  
  async componentDidMount() {

  }

  render() {
    return (
    <div className="planes-component">
      <Head>
     
      </Head>
        <div className='planes'>
          <div className="content">
            <div className="item">
              <a href="" target="_blank" className='link'>
                <span className="pretitle">Know</span>
                {/* <h2 className="title">About</h2> */}
              </a>
            </div>
            <div className="item">
              <a href="" target="_blank" className='link'>
                <span className="pretitle">Balance</span>
                {/* <h2 className="title">Work</h2> */}
              </a>
            </div>
            <div className="item">
              <a href="" target="_blank" className='link'>
                <span className="pretitle">Live</span>
                {/* <h2 className="title">Experience</h2> */}
              </a>
            </div>
            <div className="item">
              <a href="" target="_blank" className='link'>
                <span className="pretitle">Creative</span>
                {/* <h2 className="title">Contact</h2> */}
              </a>
            </div>
          </div>
        </div>
      <style jsx>{`

      .planes {
        position: absolute;
        left: 0;
        right: 0;
        background: rgba(0,0,0, 0.3);
      }

      `}</style>

    </div>
    )
  }
}

