
import Image from 'next/image'

export default function Footer() {
    return (
        <div className="footer">
            <h1>Footer</h1>
            {/* <Image src='/images/logo.png' layout='fill' width={100} height={100} alt="logo" />     */}
            <Image
                src="/images/logo.png"
                alt="logo"
                width={300}
                height={300}/>

            <style jsx>{`

                .footer {
                    background-color: black;
                }
            `}</style>

        </div>
    )
}