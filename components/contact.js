import React from "react";


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

  onContact(e) {
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
              placeholder = "type subject here"
              value       = {this.state.email}
              onChange    = {this.handleEmail}
            />
            <textarea 
              placeholder = "Reasons why you'd like to hire me!"
              rows        = "6"
              value       = {this.state.message}
              onChange    = {this.handleMessage}
            />
            <input className="button" type="submit" value="Send"/>
          </form>
        </div>
        
        <style jsx global>{`


      

        `}</style>
      </div>
    )
  }

}
