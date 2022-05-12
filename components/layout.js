import Nav from './nav'
import Footer from './footer'
import Sidebar from './sidebar'

import { Curtains } from "react-curtains";

import styles from '../assets/scss/layout.module.scss'

export default function Layout({ children }) {
    return (
        <div className={styles.custom}>
            {/* <Nav></Nav> */}
            {/* <Sidebar></Sidebar> */}
            <Curtains>
            <div>{ children }</div>
            </Curtains>
            {/* <Footer></Footer> */}

            <style jsx>{`


            
            `}</style>
    
            <style jsx global>{`

            
        
            `}</style>
        </div>
    )
}