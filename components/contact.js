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
    this.onContact       = this.onContact.bind(this);
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
    if(this.state.email) {
      console.log('send email', this.state.email, this.state.message);
      window.open(`mailto:${this.state.email}`, '_blank')
    }
  }
  render() {
    return (
      <div className="contact-component container">
        <h2 className="title">Contact</h2>

        <div className="fields">
          <input 
            className="email" 
            placeholder="example@email.com"
            value={this.state.email} 
            onChange={this.handleEmail}
          >
          </input>
          <textarea 
            placeholder="Reasons why you'd like to hire me!" 
            rows="6"
            value={this.state.message} 
            onChange={this.handleMessage}
          >
            </textarea>

            {/* <a href={`mailto:${this.state.email}`} target="_blank"> */}
              <div 
                className="primary button"
                onClick={this.onContact}
                >
                send
              </div>
            {/* </a> */}
        </div>
        
        <style jsx global>{`


      

        `}</style>
      </div>
    )
  }

}
