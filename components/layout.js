

import styles from '../assets/scss/layout.module.scss'

export default function Layout({ children }) {
    return (
        <div className={styles.custom}>

            <div>{ children }</div>

            <style jsx>{`


            
            `}</style>
    
            <style jsx global>{`

            
        
            `}</style>
        </div>
    )
}