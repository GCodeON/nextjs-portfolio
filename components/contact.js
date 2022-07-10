import React from "react";


export default class Contact extends React.Component {

  // super(props) {
  //   this.state = {
  //     email   : '',
  //     message : ''
  //   }
  // }
  state = {
    email   : '',
    message : ''
  };

  componentDidMount() {

  }

  updateEmail = () => this.setState({email: this.state.email});

  updateMessage = () => this.setState({message: this.state.message});

  contact() {
    console.log('send email', this.state.email, this.state.message);
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
            onChange={this.updateEmail}
          >
          </input>
          <textarea 
            placeholder="hire me!" 
            rows="6"
            value={this.state.message} 
            onChange={this.updateMessage}
          >
            </textarea>
          <div 
            className="primary button"
            onClick={this.contact.bind(this)}
          >
            contact
          </div>
        </div>
        
        <style jsx global>{`


      

        `}</style>
      </div>
    )
  }

}
