import Image from 'next/image'

import Nav from './nav'

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h1>Sidebar</h1>
            <div className="search">
                <input placeholder="Search"></input>
            </div>

            <Nav></Nav>
            <style jsx>{`
            
            `}</style>

        </div>
    )
}