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
            <ul>
                {nav.map((item) => (
                    <li key={item.name}>
                    <Link href={item.link}>
                        <a>{item.name}</a>
                    </Link>
                    </li>
                ))}
            </ul>

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