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

	componentDidMount(){
		if (ls.get('hartley_email') !== '' || ls.get('hartley_email') !== null || ls.get('hartley_email') !== undefined ){
			this.setState({
				email: (ls.get('hartley_email') == undefined ? "" : ls.get('hartley_email'))
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
    	console.log(json)
      this.props.authenticate(json)
    })
    .catch((err) => {
      alert('Log in failed. ERROR: ' + err)
      document.location.reload()
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
    height: '30vh',
    backgroundColor: 'white',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    borderRadius: '15px', 
    margin: 'auto'
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
    width: '20vw',
    height: '4vh',
    borderRadius: '10px',
    backgroundColor: '#47b8e0',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    cursor: 'pointer',
    margin: 'auto',
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