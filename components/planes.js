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
        <div >
          <div className="content">
            <div className="item">

              <span className="pretitle">Know</span>
              <h2 className="title">About</h2>
            </div>
            <div className="item">
              <span className="pretitle">Balance</span>
              <h2 className="title">Work</h2>
            </div>

            <div className="item">
              <span className="pretitle">Live Life</span>
              <h2 className="title">Experience</h2>
            </div>

            <div className="item">
              <span className="pretitle">Creative</span>
              <h2 className="title">Contact</h2>
            </div>
          </div>
        </div>
      <style jsx>{`


                  
      `}</style>

    </div>
    )
  }
}

