import React from "react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email   : '',
      message : ''
    }
    this.handleEmail   = this.handleEmail.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.onContact     = this.onContact.bind(this);
  }

  componentDidMount() {

  }

  handleEmail(event) {
    this.setState({email: event.target.value})
  }

  handleMessage(event) {
    this.setState({message: event.target.value})
  }

  onContact() {
    if(this.state.message) {
      window.open(`mailto:gcodeondev@gmail.com?subject=${this.state.email}&body=${this.state.message}`, '_blank')
    }
  }
  render() {
    return (
      <div className="contact-component container">
        <h2 className="title">Contact</h2>
        <div className="fields">
          <form onSubmit={this.onContact}>
            <input 
              className   = "email"
              value       = {this.state.email}
              onChange    = {this.handleEmail}
              placeholder = "type subject here"
            />
            <textarea 
              placeholder = "Reasons why you'd like to hire me!"
              value       = {this.state.message}
              onChange    = {this.handleMessage}
              rows        = "6"
            />
            <input className="button" type="submit" value="Send"/>
          </form>
        </div>

        <div className="links">
          <a href="https://www.linkedin.com/in/gerardo-soto-becerra/" target="_blank">
            <FaLinkedin className="linkedin icon"/>
          </a>
          <a href="https://github.com/GCodeON" target="_blank">
            <FaGithub className="github icon"/>
          </a>
        </div>
        
        <style jsx global>{`

        `}</style>
      </div>
    )
  }

}
