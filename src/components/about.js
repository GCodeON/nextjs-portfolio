import React from 'react'
import Image from 'next/image'
import { isSanityImageUrl } from '@/sanity/sanityImageUrl'

import { ReactTyped } from 'react-typed'

import * as THREE from 'three'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js'

import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

import AOS from 'aos'
import 'aos/dist/aos.css'

gsap.registerPlugin(ScrollTrigger)

export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()

    this.scene = null
    this.camera = null
    this.renderer = null
    this.model = null

    this.animationFrameId = null
    this.pageX = 0.5
    this.pageY = 0.5

    this.animate = this.animate.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.scheduleAosRefresh = this.scheduleAosRefresh.bind(this)

    this.aosRefreshTimer = null
  }

  componentDidMount() {
    AOS.init({
      delay: 100,
      mirror: true
    })

    this.init()
    this.onWindowResize()
    this.scheduleAosRefresh()
  }

  componentDidUpdate(prevProps) {
    const prevSkillsCount = Array.isArray(prevProps.skills) ? prevProps.skills.length : 0
    const skillsCount = Array.isArray(this.props.skills) ? this.props.skills.length : 0

    if (prevSkillsCount !== skillsCount || prevProps.description !== this.props.description) {
      this.scheduleAosRefresh()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
    document.removeEventListener('mousemove', this.onDocumentMouseMove)
    document.removeEventListener('scroll', this.onScroll)

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }

    if (this.model) {
      if (this.model.geometry) {
        this.model.geometry.dispose()
      }

      if (this.model.material) {
        this.model.material.dispose()
      }
    }

    if (this.renderer) {
      this.renderer.dispose()
      this.renderer = null
    }

    this.scene = null
    this.camera = null
    this.model = null

    if (this.aosRefreshTimer) {
      clearTimeout(this.aosRefreshTimer)
      this.aosRefreshTimer = null
    }
  }

  scheduleAosRefresh() {
    if (this.aosRefreshTimer) {
      clearTimeout(this.aosRefreshTimer)
    }

    this.aosRefreshTimer = setTimeout(() => {
      AOS.refreshHard()
    }, 80)
  }

  init() {
    const canvas = this.canvasRef.current

    if (!canvas) {
      return
    }

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
      alpha: true
    })

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 12)

    this.scene = new THREE.Scene()
    this.scene.add(this.camera)

    this.loadModel()

    window.addEventListener('resize', this.onWindowResize)
    document.addEventListener('mousemove', this.onDocumentMouseMove)
    document.addEventListener('scroll', this.onScroll)
  }

  animate() {
    if (!this.renderer || !this.scene || !this.camera) {
      return
    }

    this.animationFrameId = requestAnimationFrame(this.animate)

    if (this.model) {
      this.model.rotation.x = (this.pageY - 0.5) * 0.2
      this.model.rotation.y = (this.pageX - 0.5) * 2
    }

    this.renderer.render(this.scene, this.camera)
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) {
      return
    }

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  onDocumentMouseMove(event) {
    this.pageX = event.pageX / window.innerWidth
    this.pageY = event.pageY / window.innerHeight
  }

  onScroll() {
    const elem = this.canvasRef.current

    if (!elem || !this.model) {
      return
    }

    const rect = elem.getBoundingClientRect()
    const top = rect.top

    this.pageY = -top * 0.01
  }

  loadModel() {
    const loader = new PCDLoader()

    loader.load('/models/Zaghetto.pcd', (points) => {
      this.model = points
      this.model.geometry.center()
      this.model.geometry.rotateX(Math.PI)
      this.model.geometry.computeBoundingBox()

      const box = this.model.geometry.boundingBox

      if (box) {
        const size = new THREE.Vector3()
        box.getSize(size)
        const maxDimension = Math.max(size.x, size.y, size.z) || 1
        const targetSize = 7
        const scale = targetSize / maxDimension
        this.model.scale.setScalar(scale)
      }

      this.model.material.color.setHex(4310673.115896333)

      this.scene.add(this.model)
      this.animate()
    })
  }

  render() {
    return (
      <div className='about-component'>
        <div
          className="about container"
          ref={(mount) => { this.mount = mount }}>
          <canvas className="canvas" ref={this.canvasRef} />
          <div className="media left">
            <h2
              className="title"
            >
              {this.props.title}
            </h2>
            <p className="description pretitle">
              Full stack developer<br />highly experienced
            </p>
            <ReactTyped
              strings={this.props.description}
              typeSpeed={60}
              backSpeed={200}
              fadeOut={true}
              fadeOutDelay={500}
              loopCount={2}
              loop
            >
              <p
                className="description pretitle"
                dangerouslySetInnerHTML={{ __html: this.props.description }}
              >
              </p>
            </ReactTyped>
          </div>
          <div className="media right">
            <div className='skills'>
              {this.props.skills ? this.props.skills.map((skill, index) => (
                <Image
                  src={skill.image}
                  alt={skill.alt || 'Skill icon'}
                  width={55}
                  height={55}
                  className="skill-image"
                  sizes="55px"
                  unoptimized={isSanityImageUrl(skill.image)}
                  data-aos="zoom-out"
                  data-aos-offset="-100"
                  data-aos-delay={`${index * 50}`}
                  onLoad={this.scheduleAosRefresh}
                  key={index}
                />
              )) : <p></p>
              }
            </div>
          </div>
        </div>

        <style jsx>{`
 
            
        `}</style>

      </div>
    )
  }
}
