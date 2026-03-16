import React from 'react'
import styles from '../assets/scss/components/timeline.module.scss'

// import AOS from 'aos';
// import 'aos/dist/aos.css';


export default class Timeline extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // AOS.init({
    //   delay  : 100,
    //   mirror : true
    // });

  }

  render() {
    return (
      <div className={`${styles.timelineComponent} container`}>
        <h2 className="title">Experience</h2>
        <div className={styles.timeline}>
          {this.props.exp.map((position, i) => (
            <a 
              href={position.link} 
              target="_blank" key={i}>
              <div 
                className={`${styles.position} ${position.class === 'left' ? styles.left : styles.right}`} >
                <div className={styles.copyContent} >
                  <h2 className={styles.pretitle}>
                    {position.company}
                  </h2>
                  <p className={styles.pos} dangerouslySetInnerHTML={{__html: position.title}}></p>
                  <p className={styles.type}>
                    {position.type}
                  </p>
                  <p className={styles.date}>
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
