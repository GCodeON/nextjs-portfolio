import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
    const nav = [
        {
            name: 'Home',
            link: '/home',
            icon: ''
        },
        {
            name: 'Discover',
            link: '/discover',
            icon: ''
        },
        {
            name: 'Artists',
            link: '/artists',
            icon: ''
        },
        {
            name: 'Songs',
            link: '/',
            icon: ''
        },
    ]


    return (

        <div className="nav">
            <h3>TEST</h3>
            {/* <ul>
                {nav.map((item) => (
                    <li key={item.name}>
                    <Link href={item.link}>
                        <a>{item.name}</a>
                    </Link>
                    </li>
                ))}
            </ul> */}

                <div className="hamburger hamburger--demo-6 js-hover">
					<div className="hamburger__line hamburger__line--01">
						<div className="hamburger__line-in hamburger__line-in--01 hamburger__line-in--demo-5"></div>
					</div>
					<div className="hamburger__line hamburger__line--02">
						<div className="hamburger__line-in hamburger__line-in--02 hamburger__line-in--demo-5"></div>
					</div>
					<div className="hamburger__line hamburger__line--03">
						<div className="hamburger__line-in hamburger__line-in--03 hamburger__line-in--demo-5"></div>
					</div>
					<div className="hamburger__line hamburger__line--cross01">
						<div className="hamburger__line-in hamburger__line-in--cross01 hamburger__line-in--demo-5"></div>
					</div>
					<div className="hamburger__line hamburger__line--cross02">
						<div className="hamburger__line-in hamburger__line-in--cross02 hamburger__line-in--demo-5"></div>
					</div>
				</div>

                <div className="global-menu">
					<div className="global-menu__wrap">
						<a className="global-menu__item global-menu__item--demo-6" href="#">Data Science</a>
						<a className="global-menu__item global-menu__item--demo-6" href="#">Research</a>
						<a className="global-menu__item global-menu__item--demo-6" href="#">Case Studies</a>
						<a className="global-menu__item global-menu__item--demo-6" href="#">Contact</a>
					</div>
				</div>
				<svg className="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">
					<defs>
						<linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%"   stop-color="#00c99b"/>
							<stop offset="100%" stop-color="#ff0ea1"/>
						</linearGradient>
						<linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%"   stop-color="#ffd392"/>
							<stop offset="100%" stop-color="#ff3898"/>
						</linearGradient>
						<linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%"   stop-color="#110046"/>
							<stop offset="100%" stop-color="#32004a"/>
						</linearGradient>
					</defs>
					<path className="shape-overlays__path"></path>
					<path className="shape-overlays__path"></path>
					<path className="shape-overlays__path"></path>
				</svg>

            <style jsx>{`
            
            `}</style>

        </div>
    )
}

// export async function getStaticProps(context) {
//   const res = await fetch(`/api/spotify`)
//   const data = await res.json()

//   return {
//     props: { data }, // will be passed to the page component as props
//   }
// }