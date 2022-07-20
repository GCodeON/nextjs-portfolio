
import {React, useEffect } from 'react';
import Typed from 'typed.js';


export default function Typewriter(props) {

    useEffect(() => {
        const { strings } = this.props;
        // You can pass other options here, such as typing speed, back speed, etc.
        const options = {
        strings   : strings,
        typeSpeed : 100,
        backSpeed : 120,
        loop: true
        };
        // this.el refers to the <span> in the render() method
        this.typed = new Typed(this.el, options);
    })



    return (
        <div className="typewriter">
          <span 
              className='typed'
              style={{ whiteSpace: 'pre' }} 
              ref={(el) => { this.el = el; }}
            />
          
          
            <style jsx>{`
            
            `}</style>

        </div>
    )
}