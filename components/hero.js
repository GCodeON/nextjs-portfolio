import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

// import { gsap } from "gsap/dist/gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);
export default class Hero extends React.Component  {

  constructor(props) {
    super(props);
    this.text    = 'Gerardo Soto',
    this.letters = this.text.split(""),
    this.hero    = null,
    this.quote   = null
  }
  componentDidMount() {

    this.hero  = document.querySelector('.hero');
    this.quote = document.querySelector('.quote');

    this.init();

  }


  init() {
    // console.log('gsap timeline');
  }

render() { 

  return (
    <div className="hero-component">
    <Head>
      <link rel="stylesheet" href="https://use.typekit.net/xjr3lgi.css" />
    </Head>
      <div className="hero">
          <div className="intro">
              <h2 className="title">
                { this.letters.map((letter, idx) => (
                  <span 
                    className={`letter-${ idx + 1}`}
                    key={`letter-'${ idx + 1 }`}>
                      { letter }
                  </span>
                ))}
              </h2>
              {/* <span className="subline">Software <br></br> Engineer</span> */}
            </div>
      <div className="quote container">
        {/* <p className="subline">Software Developer experienced building full stack web applications </p> */}
      </div>

    </div>

    <style jsx>{`
      .subline {
        -webkit-text-stroke: 1px white;
      }
      .description {
        color: white;
      }
    `}</style>

    <style jsx global>{`
      
    `}</style>
  </div>
  )}
}

// export async function getStaticProps(context) {
//   const res = await fetch(`https://stoicquotesapi.com/v1/api/quotes/random`)
//   const data = await res.json()

//   console.log("static props", data);

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//   }
// }