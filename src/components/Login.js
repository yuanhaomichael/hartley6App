import React from 'react'
import '../App.css';
import ls from 'local-storage'

import { BACKEND_API_URI }from '../constants'

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			email: '',
			password: 'foobar',
			button_text: 'Log In'
		}
		this.sendRequest = this.sendRequest.bind(this)
	}

	componentWillMount(){
		if (ls.get('hartely_email') !== '' || ls.get('hartely_email') !== null || ls.get('hartely_email') !== undefined ){
			console.log(ls.get('hartely_email'))
			this.setState({
				email: ls.get('hartley_email')
			})
		}
	}
  sendRequest(){
   return fetch(BACKEND_API_URI + 'login', {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },      
      body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
            }),
    })
    .then((res) => res.json())
    .then((json) => {
      this.props.authenticate(json)
    })
    .catch((err) => {
      alert('Log in failed. ERROR: ' + err)
      document.location.reload()
    })
  }

	render(){
		return(
			<div class='main-lg' style={styles.main}>
				<div style={styles.header}>
					<h3>Welcome Hartley 6 Resident</h3>
				</div>
				<div style={styles.body}>
					<form style={styles.form}>
						<div style={styles.input_div}>
							<input onChange={(ev) => this.setState({email: ev.target.value})} value={this.state.email} placeholder='email' />
						</div>
						<div>
							<div onMouseDown={(ev) => this.setState({button_text: 'Signing In...'})} onMouseUp={this.sendRequest} style={styles.button} className='noselect'>
								{this.state.button_text}
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
    height: '40vh',
    margin: 'auto',
    backgroundColor: 'white',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    borderRadius: '15px',
    marginTop: '30px'
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
    width: '70%',
    margin: 'auto',
  },
  button:{
    width: '10vw',
    height: '4vh',
    borderRadius: '10px',
    backgroundColor: '#47b8e0',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    cursor: 'pointer',
    margin: 'auto',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '15px',
    padding: '5px',
  },
  input_div:{
    paddingTop: '10px',
    paddingBottom: '10px',
  },
}

export default Login