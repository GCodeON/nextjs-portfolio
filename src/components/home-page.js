'use client'

import { useEffect } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import Layout from './layout'
import Loader from './loader'
import ThreeD from './threejs/3D'

import Hero from './hero'
import About from './about'
import Slider from './slider'
import Timeline from './timeline'
import Contact from './contact'
import Kinect from './threejs/kinect'
import { urlFor } from '@/sanity/sanityImageUrl'

const asLink = (value) => {
  if (typeof value === 'string') {
    return value
  }

  return value?.current || ''
}

const asImageUrl = (value, width, height, fitMode) => {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value?.url === 'string') {
    return value.url
  }

  try {
    let imageBuilder = urlFor(value).auto('format')

    if (width) {
      imageBuilder = imageBuilder.width(width)
    }

    if (height) {
      imageBuilder = imageBuilder.height(height)
    }

    if (fitMode) {
      imageBuilder = imageBuilder.fit(fitMode)
    }

    return imageBuilder.url()
  } catch {
    return ''
  }
}

const normalizeTool = (tool, index) => {
  const imageSource = tool?.image || tool?.icon || tool
  const image = asImageUrl(imageSource, 120, undefined, 'max')

  if (!image) {
    return null
  }

  return {
    image,
    alt: tool?.alt || tool?.name || `Tool ${index + 1}`
  }
}

const normalizeProjectTool = (tool) => {
  const imageSource = tool?.image || tool?.icon || tool
  const image = asImageUrl(imageSource, 80, undefined, 'max')

  if (!image) {
    return null
  }

  return {
    image,
    alt: tool?.alt || tool?.name || ''
  }
}

const normalizeGallery = (gallery) => {
  if (!Array.isArray(gallery)) {
    return []
  }

  return gallery
    .map((image) => {
      if (typeof image === 'string') {
        return image
      }

      return asImageUrl(image, 1800, 1200)
    })
    .filter(Boolean)
}

const normalizeProject = (project) => {
  const projectImage = asImageUrl(project?.image, 1800, 1200)

  if (!projectImage) {
    return null
  }

  return {
    ...project,
    title: project?.title || project?.name || 'Project',
    image: projectImage,
    link: asLink(project?.link),
    tools: Array.isArray(project?.tools)
      ? project.tools.map(normalizeProjectTool).filter(Boolean)
      : [],
    gallery: normalizeGallery(project?.gallery)
  }
}

export default function HomePage({ data }) {
  console.log('image', data?.tools || 'no image');
  useEffect(() => {
    let cancelled = false

    const waitForWindowLoad = () => {
      if (document.readyState === 'complete') {
        return Promise.resolve()
      }

      return new Promise((resolve) => {
        window.addEventListener('load', resolve, { once: true })
      })
    }

    const waitForFonts = () => {
      if (!document.fonts || !document.fonts.ready) {
        return Promise.resolve()
      }

      return document.fonts.ready.catch(() => Promise.resolve())
    }

    const waitForImages = () => {
      const images = Array.from(document.images || [])

      if (!images.length) {
        return Promise.resolve()
      }

      return Promise.all(
        images.map((image) => {
          if (image.complete) {
            return Promise.resolve()
          }

          return new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true })
            image.addEventListener('error', resolve, { once: true })
          })
        })
      )
    }

    const waitForPaint = () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve)
        })
      })

    ;(async () => {
      await Promise.all([waitForWindowLoad(), waitForFonts(), waitForImages()])
      await waitForPaint()

      if (!cancelled) {
        document.body.classList.remove('app-loading')
        document.body.classList.add('app-ready')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  // const about = data?.about || [
  //   'Transforming static<br> design comps <br>into pixel perfect <br>interactive <br>applications',
  //   'Using NUXTjs, VUE, <br>NEXTjs, React, <br>NODE, AWS,<br> Laravel',
  //   'Designing, Building,<br> and scaling <br>cloud hosted <br>software'
  // ]
  const fallbackTools = [
    { image: '/tools/vue.png' },
    { image: '/tools/nuxtjs.svg' },
    { image: '/tools/react.png' },
    { image: '/tools/nextjs-white.svg' },
    { image: '/tools/nodejs.svg' },
    { image: '/tools/typescript.svg' },
    { image: '/tools/gql.svg' },
    { image: '/tools/Threejs.svg' },
    { image: '/tools/python.png' },
    { image: '/tools/sass.png' },
    { image: '/tools/mysql.png' },
    { image: '/tools/mongodb.png' },
    { image: '/tools/wordpress.png' },
    { image: '/tools/laravel.png' },
    { image: '/tools/php.svg' },
    { image: '/tools/drupal.png' },
    { image: '/tools/strapi.svg' },
    { image: '/tools/html5.png' },
    { image: '/tools/js.png' },
    { image: '/tools/css3.png' },
    { image: '/tools/contentful.webp' },
    { image: '/tools/aws.png' }
  ]

  const fallbackSlider = [
    {
      title: 'T Palmer Agency Website',
      role: 'Full Stack Web Developer',
      image: '/images/tpalmeragency.png',
      link: 'https://tpalmeragency.com/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/wordpress.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      title: 'Rescue Agency Website',
      role: 'Full Stack Web Developer',
      image: '/images/rescue.png',
      link: 'https://rescueagency.com/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/laravel.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      title: 'Up2SD Website',
      role: 'Full Stack Web Developer',
      image: '/images/up2sd.png',
      link: 'https://up2sd.org/',
      tools: [
        { image: '/tools/nuxtjs.svg' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/nodejs.svg' },
        { image: '/tools/strapi.svg' }
      ]
    },
    {
      image: '/images/hartleygroup.png',
      link: 'https://harteygroup.co/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/wordpress.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      image: '/images/hustle&strive.png',
      link: 'https://hustlestrive.com/',
      tools: [
        { image: '/tools/nextjs-white.svg' },
        { image: '/tools/react.png' },
        { image: '/tools/js.png' },
        { image: '/tools/aws.png' }
      ]
    },
    {
      image: '/images/sta.png',
      link: 'https://sharetheairva.com/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/laravel.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      image: '/images/aocs.png',
      link: 'https://agentsofchangesummit.org/',
      tools: [
        { image: '/tools/nuxtjs.svg' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/aws.png' },
        { image: '/tools/contentful.webp' }
      ]
    },
    {
      image: '/images/yahlok.png',
      link: 'https://yahlok.org/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/wordpress.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      image: '/images/methfree.png',
      link: 'https://methfreelacounty.org/',
      tools: [
        { image: '/tools/html5.png' },
        { image: '/tools/js.png' },
        { image: '/tools/css3.png' }
      ]
    },
    {
      image: '/images/fof.png',
      link: 'https://futureoffounders.com/',
      tools: [
        { image: '/tools/php.svg' },
        { image: '/tools/wordpress.png' },
        { image: '/tools/vue.png' },
        { image: '/tools/js.png' },
        { image: '/tools/mysql.png' }
      ]
    },
    {
      image: '',
      link: '',
      tools: []
    }
  ]

  const tools = Array.isArray(data?.tools)
    ? data.tools.map(normalizeTool).filter(Boolean)
    : []

  const slider = Array.isArray(data?.projects)
    ? data.projects.map(normalizeProject).filter(Boolean)
    : []

  const skillsList = tools.length ? tools : fallbackTools
  const projectsList = slider.length ? slider : fallbackSlider

  const linkedInUrl = asLink(data?.linkedIn || data?.linkedin)
  const gitHubUrl = asLink(data?.GitHub || data?.github || data?.gitHub)

  const timeline = [
    {
      dates: '2024-Present',
      company: 'T Palmer Agency',
      title: 'Web Developer',
      type: 'Full-time',
      class: 'left',
      link: 'https://www.tpalmeragency.com/'
    },
    {
      dates: '2022-2023',
      company: 'Cortica',
      title: 'Full Stack<br>Software Engineer',
      type: 'Full-time',
      class: 'right',
      link: 'https://www.corticacare.com/'
    },
    {
      dates: '2018-2022',
      company: 'Rescue Agency',
      title: 'Web Developer',
      type: 'Full-time',
      class: 'left',
      link: 'https://rescueagency.com/'
    },
    {
      dates: '2018-2019',
      company: 'SoftStack Factory',
      title: 'Programming <br>Instructor',
      type: 'Part-time',
      class: 'right',
      link: 'https://www.softstackfactory.com/'
    },
    {
      dates: '2017-2018',
      company: 'Learning Equality',
      title: 'Software Intern',
      type: 'Internship',
      class: 'left',
      link: 'https://learningequality.org/'
    },
    {
      dates: '2017-2018',
      company: 'Rescue Agency',
      title: 'Web Intern',
      type: 'Internship',
      class: 'right',
      link: 'https://rescueagency.com/'
    },
    {
      dates: '2013-2015',
      company: "Porter's Pub",
      title: 'Graphic Designer',
      type: 'Part-time',
      class: 'left',
      link: 'https://www.porterspublodica.com/'
    }
  ]

  return (
    <div className="app-shell">
      <Layout>
        <ThreeD />
        <Loader strings={[]}>
          <Hero />
          <section id="about">
            <About skills={skillsList} title="About" description={data?.description} />
          </section>

          <section id="projects">
            <Slider slides={projectsList} />
          </section>

          <section id="experience">
            <Timeline exp={timeline} />
          </section>
          <section id="contact">
            <Contact />
            <Kinect />
          </section>
        </Loader>

        <div className="links">
          <a href={linkedInUrl} target="_blank" rel="noreferrer">
            <FaLinkedin className="linkedin icon" />
          </a>
          <a href={gitHubUrl} target="_blank" rel="noreferrer">
            <FaGithub className="github icon" />
          </a>
        </div>

        <style jsx>{`
          .links {
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            display: inline-flex;
            justify-content: center;
            z-index: 2;
          }

          .container {
            position: relative;
            margin: 0 auto;
            padding: 0;
            cursor: pointer;
          }
        `}</style>

        <style jsx global>{``}</style>
      </Layout>
    </div>
  )
}
