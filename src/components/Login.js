import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'


import { BACKEND_API_URI }from '../constants'

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			email: '',
      phone: '',
			password: 'foobar',
      signing_in: false
		}
		this.sendRequest = this.sendRequest.bind(this)
	}

  sendRequest(){
   this.setState({
     signing_in: true
   }, () => {
    fetch(BACKEND_API_URI + 'login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },      
        body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
              }),
      })
      .then((json) => {
        console.log(json)
        this.props.authenticate(json)
      })
      .catch((err) => {
        alert('Log in failed. ERROR: ' + err)
        document.location.reload()
      })   
   }) 
  }

	render(){
		return(
			<div className='main-lg' style={styles.main}>
				<div style={styles.header}>
					<h3>Welcome Hartley 6 Resident</h3>
				</div>
				<div style={styles.body}>
					<form style={styles.form} onSubmit={e => { e.preventDefault() }}>
						<div style={styles.input_div}>
							<input onChange={(ev) => this.setState({email: ev.target.value})} value={this.state.email} placeholder='email' />
						</div>
            <div style={styles.input_div}>
              <input onChange={(ev) => this.setState({phone: ev.target.value})} value={this.state.phone} placeholder='Phone' />
            </div>           
						<div>
							<div onMouseDown={(ev) => this.setState({button_text: 'Signing In...'})} onMouseUp={() => {
                this.props.authenticate(this.state.email, this.state.password, this.state.phone)
              }} style={styles.button} className='noselect'>
								{this.state.signing_in ? 'Sign In' : <FontAwesomeIcon icon={faSignInAlt} style={{padding: 6}}/>}
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}
const styles = { 
  main:{
    height: '30vh',
    backgroundColor: 'white',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    borderRadius: '15px', 
    margin: 'auto',
    width: '95vw'
  },
  header:{
  	margin: 'auto',
  },
  body:{
    margin: 'auto',
    top: '10%',
    position: 'relative',
  },
  form:{
    width: '80%',
    margin: 'auto',
  },
  button:{
    width: '9vw',
    height: '4vh',
    borderRadius: '20px',
    backgroundColor: '#47b8e0',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    cursor: 'pointer',
    float: 'right',
    color: 'white',
    fontWeight: 'bold',
    padding: '5px',
  },
  input_div:{
    paddingTop: '10px',
    paddingBottom: '10px',
  },
}

export default Login