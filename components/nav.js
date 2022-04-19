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

.demo-6 {
	--color-text: #120047;
	--color-bg: #333;
	--color-link: #110046;
	--color-link-hover: #e83779;
	--color-info: #fff;
	--color-main-bg: #7115d8;
	--path-fill-1: url(#gradient1);
	--path-fill-2: url(#gradient2);
	--path-fill-3: url(#gradient3);
	--color-title: inherit;
	--font-family-title: 'Rozha One', serif;
	--font-size-title: 8vmax;
	--font-weight-title: 400;
	--color-menu: #ffffff;
	--color-menu-hover: #c14343;
	--font-family-menu: var(--font-family-title);
	--font-size-menu: 3.5vmax;
	--font-weight-menu: 400;
	--button-bg: #120047;
	--button-circle: #9236f7;
	--button-line: #ffffff;
}

.global-menu {
	width: 100vw;
	height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	pointer-events: none;
	z-index: 100;
}

.global-menu__item {
	color: var(--color-menu);
	font-family: var(--font-family-menu);
	font-size: var(--font-size-menu);
	font-weight: var(--font-weight-menu);
	opacity: 0;
	transform: translateY(-100%);
	pointer-events: none;
	display: block;
	margin: 0.25em 0;
	transition: transform 0.3s, opacity 0.3s;
	transition-timing-function: ease-in;
}

/* demo 6 */
.global-menu__item--demo-6.is-opened {
	transition-duration: 0.8s;
}

.global-menu__item--demo-6:nth-of-type(1) {
	transition-delay: 0.25s;
}

.global-menu__item--demo-6.is-opened:nth-of-type(1) {
	transition-delay: 1s;
}

.global-menu__item--demo-6:nth-of-type(2) {
	transition-delay: 0.2s;
}

.global-menu__item--demo-6.is-opened:nth-of-type(2) {
	transition-delay: 1.1s;
}

.global-menu__item--demo-6:nth-of-type(3) {
	transition-delay: 0.15s;
}

.global-menu__item--demo-6.is-opened:nth-of-type(3) {
	transition-delay: 1.2s;
}

.global-menu__item--demo-6:nth-of-type(4) {
	transition-delay: 0.1s;
}

.global-menu__item--demo-6.is-opened:nth-of-type(4) {
	transition-delay: 1.3s;
}

.shape-overlays {
	width: 100vw;
	height: 100vh;
	pointer-events: none;
	position: fixed;
	top: 0;
	left: 0;
}

.shape-overlays.is-opened {
	pointer-events: auto;
}

.shape-overlays__path:nth-of-type(1) {
	fill: var(--path-fill-1);
}

.shape-overlays__path:nth-of-type(2) {
	fill: var(--path-fill-2);
}

.shape-overlays__path:nth-of-type(3) {
	fill: var(--path-fill-3);
}

.shape-overlays__path:nth-of-type(4) {
	fill: var(--path-fill-4);
}

@-webkit-keyframes intervalHamburgerBorder {
	0% {
		opacity: 1;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	80% {
		-webkit-transform: scale(1.6);
		transform: scale(1.6);
	}
	100% {
		opacity: 0;
		-webkit-transform: scale(1.6);
		transform: scale(1.6);
	}
}

@keyframes intervalHamburgerBorder {
	0% {
		opacity: 1;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	80% {
		-webkit-transform: scale(1.6);
		transform: scale(1.6);
	}
	100% {
		opacity: 0;
		-webkit-transform: scale(1.6);
		transform: scale(1.6);
	}
}

.hamburger {
	width: 64px;
	height: 64px;
	display: block;
	position: relative;
	cursor: pointer;
	position: absolute;
	top: 2.25em;
	right: 2.25em;
	z-index: 110;
	border-radius: 50%;
	background-color: var(--button-bg);
	pointer-events: auto;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
}

.hamburger::after {
	width: 64px;
	height: 64px;
	box-sizing: border-box;
	content: '';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	border: 4px solid var(--button-circle);
	border-radius: 50%;
	-webkit-animation-duration: 1.2s;
	animation-duration: 1.2s;
	-webkit-animation-name: intervalHamburgerBorder;
	animation-name: intervalHamburgerBorder;
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
}

.hamburger__line {
	width: 28px;
	height: 2px;
	overflow: hidden;
	position: absolute;
	z-index: 10;
}

.hamburger__line-in {
	width: 84px;
	height: 2px;
	position: absolute;
	top: 0;
	left: 0;
}

.hamburger__line-in::before,
.hamburger__line-in::after {
	width: 28px;
	height: 2px;
	content: '';
	display: block;
	position: absolute;
	top: 0;
	background-color: var(--button-line);
}

.hamburger__line-in::before {
	left: -56px;
}

.hamburger__line-in::after {
	left: 0;
}

.hamburger__line--01,
.hamburger__line--02,
.hamburger__line--03,
.hamburger__line--cross01,
.hamburger__line--cross02 {
	left: 18px;
}

.hamburger__line--01 {
	top: 24.6px;
}

.hamburger__line--02,
.hamburger__line--cross01,
.hamburger__line--cross02 {
	top: 31px;
}

.hamburger__line--03 {
	top: 37.4px;
}

.hamburger__line--cross01 {
	-webkit-transform: rotate(45deg);
	transform: rotate(45deg);
}

.hamburger__line--cross02 {
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
}

.hamburger__line {
	-webkit-transition-duration: 0.6s;
	transition-duration: 0.6s;
	-webkit-transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
	transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}

.hamburger__line-in {
	-webkit-transition-duration: 0.6s;
	transition-duration: 0.6s;
	-webkit-transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
	transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}

.hamburger__line-in::before,
.hamburger__line-in::after {
	-webkit-transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
	transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
	-webkit-transition-property: -webkit-transform;
	transition-property: -webkit-transform;
	transition-property: transform;
	transition-property: transform, -webkit-transform;
}

.hamburger__line-in--cross01,
.hamburger__line-in--cross02 {
	-webkit-transform: translateX(-33.3%);
	transform: translateX(-33.3%);
}

.hamburger__line-in--01 {
	-webkit-transition-delay: 0.2s;
	transition-delay: 0.2s;
}

.hamburger__line-in--02 {
	-webkit-transition-delay: 0.25s;
	transition-delay: 0.25s;
}

.hamburger__line-in--02::before,
.hamburger__line-in--02::after {
	-webkit-transition-delay: 0.05s;
	transition-delay: 0.05s;
}

.hamburger__line-in--03 {
	-webkit-transition-delay: 0.3s;
	transition-delay: 0.3s;
}

.hamburger__line-in--03::before,
.hamburger__line-in--03::after {
	-webkit-transition-delay: 0.1s;
	transition-delay: 0.1s;
}

.hamburger__line-in--cross01 {
	-webkit-transition-delay: 0.0s;
	transition-delay: 0.0s;
}

.hamburger__line-in--cross02 {
	-webkit-transition-delay: 0.05s;
	transition-delay: 0.05s;
}

.hamburger__line-in--cross02::before,
.hamburger__line-in--cross02::after {
	-webkit-transition-delay: 0.1s;
	transition-delay: 0.1s;
}

.hamburger.is-opened-navi .hamburger__line-in--01,
.hamburger.is-opened-navi .hamburger__line-in--02,
.hamburger.is-opened-navi .hamburger__line-in--03 {
	-webkit-transform: translateX(33.3%);
	transform: translateX(33.3%);
}

.hamburger.is-opened-navi .hamburger__line-in--cross01,
.hamburger.is-opened-navi .hamburger__line-in--cross02 {
	-webkit-transform: translateX(0);
	transform: translateX(0);
}

.hamburger.is-opened-navi .hamburger__line-in--01 {
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
}

.hamburger.is-opened-navi .hamburger__line-in--02 {
	-webkit-transition-delay: 0.05s;
	transition-delay: 0.05s;
}

.hamburger.is-opened-navi .hamburger__line-in--03 {
	-webkit-transition-delay: 0.1s;
	transition-delay: 0.1s;
}

.hamburger.is-opened-navi .hamburger__line-in--cross01 {
	-webkit-transition-delay: 0.25s;
	transition-delay: 0.25s;
}

.hamburger.is-opened-navi .hamburger__line-in--cross02 {
	-webkit-transition-delay: 0.3s;
	transition-delay: 0.3s;
}

.hamburger:hover .hamburger__line-in::before,
.hamburger:hover .hamburger__line-in::after {
	-webkit-transform: translateX(200%);
	transform: translateX(200%);
}

.hamburger:hover .hamburger__line-in--01::before,
.hamburger:hover .hamburger__line-in--01::after,
.hamburger:hover .hamburger__line-in--02::before,
.hamburger:hover .hamburger__line-in--02::after,
.hamburger:hover .hamburger__line-in--03::before,
.hamburger:hover .hamburger__line-in--03::after {
	-webkit-transition-duration: 1s;
	transition-duration: 1s;
}

.hamburger:hover .hamburger__line-in--cross01::before,
.hamburger:hover .hamburger__line-in--cross01::after,
.hamburger:hover .hamburger__line-in--cross02::before,
.hamburger:hover .hamburger__line-in--cross02::after {
	-webkit-transition-duration: 0s;
	transition-duration: 0s;
}

.hamburger.is-opened-navi:hover .hamburger__line-in--cross01::before,
.hamburger.is-opened-navi:hover .hamburger__line-in--cross01::after,
.hamburger.is-opened-navi:hover .hamburger__line-in--cross02::before,
.hamburger.is-opened-navi:hover .hamburger__line-in--cross02::after {
	-webkit-transition-duration: 1s;
	transition-duration: 1s;
}

.hamburger.is-opened-navi:hover .hamburger__line-in--01::before,
.hamburger.is-opened-navi:hover .hamburger__line-in--01::after,
.hamburger.is-opened-navi:hover .hamburger__line-in--02::before,
.hamburger.is-opened-navi:hover .hamburger__line-in--02::after,
.hamburger.is-opened-navi:hover .hamburger__line-in--03::before,
.hamburger.is-opened-navi:hover .hamburger__line-in--03::after {
	-webkit-transition-duration: 0s;
	transition-duration: 0s;
}


@media screen and (min-width: 55em) {
	.icon--keyboard {
		position: absolute;
		right: 0.55em;
		bottom: -30%;
		display: block;
		width: 54px;
		height: 46px;
		fill: var(--color-link);
	}
	.demos {
		display: flex;
		padding-right: 80px;
		justify-self: end;
	}
	.demo {
		display: block;
		width: 17px;
		height: 17px;
		margin: 0 4px;
		border-radius: 50%;
		background: var(--color-link);
	}
	a.demo--current {
		background: var(--color-link-hover);
	}
	.demo span {
		position: absolute;
		line-height: 1;
		right: 100%;
		display: none;
		margin: 0 1em 0 0;
	}
	.demo--current span {
		display: block;
	}
}

@media screen and (max-width: 55em) {
	html,
	body {
		overflow-x: hidden;
		width: 100vw;
		height: 100%;
	}
	.hamburger {
		position: fixed;
		top: 0.5em;
		right: 0.5em;
		transform: scale(0.75);
	}
	.content {
		height: auto;
		min-height: 0;
		padding-bottom: 10em;
		flex-direction: column;
	}
	.content--fixed {
		position: relative;
		z-index: 0;
		display: block;
		padding: 0.85em;
	}
	.codrops-header {
		flex-direction: column;
		align-items: center;
	}
	.codrops-header__title {
		font-weight: bold;
		padding-bottom: 0.25em;
		text-align: center;
	}
	.github {
		display: block;
		margin: 1em auto;
	}
	.codrops-links {
		margin: 0;
	}
}

            
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