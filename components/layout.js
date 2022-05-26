import Nav from './nav'
import Footer from './footer'
import Sidebar from './sidebar'

import styles from '../assets/scss/layout.module.scss'

export default function Layout({ children }) {
    return (
        <div className={styles.custom}>
            {/* <Nav></Nav> */}
            {/* <Sidebar></Sidebar> */}

            <div>{ children }</div>
            {/* <Footer></Footer> */}

            <style jsx>{`


            
            `}</style>
    
            <style jsx global>{`

            
        
            `}</style>
        </div>
    )
}