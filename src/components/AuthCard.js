import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'


import { BACKEND_API_URI }from '../constants'

class AuthCard extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      signingIn: false,
      newUser: false,
      signUpError: false,
		}
    this.sendRequest = this.sendRequest.bind(this);
    this.signUp = this.signUp.bind(this);
	}

  sendRequest(){
   this.setState({
     signing_in: true
   }, () => {
    fetch(BACKEND_API_URI + 'sign_up', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },      
        body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                phone: this.state.phone,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
              }),
      })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        this.props.authenticate(json.email, this.state.password, json.phone)
      })
      .catch((err) => {
        alert('Log in failed. ERROR: ' + err)
        document.location.reload()
      })   
   }) 
  }

  async signUp(){
    if(this.state.password == this.state.confirmPassword)
    {fetch(BACKEND_API_URI + 'sign_up', {
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
        firstName: this.state.firstName,
        lastName: this.state.lastName,        
      })
    })
    .then(() => this.props.authenticate(this.state.email, this.state.password, this.state.phone))
    .catch(() => alert('failed to log in.'))}
  }

	render(){
		return(
			<div className='main-lg' style={styles.main}>
        <div style={{flexDisplay: 'row', display: 'flex'}}>
          <div onClick={() => this.setState({newUser: false})} style={{...styles.banner, borderBottom: (!this.state.newUser ? '2px solid rgb(110,125,132)' : '2px solid rgb(219,240,250)')}}>
            Log In
          </div>
          <div onClick={() => this.setState({newUser: true})} style={{...styles.banner, borderBottom: (this.state.newUser ? '2px solid rgb(110,125,132)' : '2px solid rgb(219,240,250)')}}>
            Sign Up
          </div>
        </div>
				{this.state.signUpError &&
          <div style={styles.header}>
					<h3 style={{backgroundColor: "red"}}>Sign Up Failed</h3>
				</div>}
				<div style={styles.body}>
          {(this.state.newUser
            ?<NewUserComponent
              this={this}
             />
            :<ExistingUserComponent 
              this={this}
             />
          )}
          <div style={{display: 'flex', flexDirection: 'row', padding: 10, width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
            <div style={{flex:5}}>
            </div>
            <div style={{flex:1}}>
              <div onMouseDown={(ev) => this.setState({button_text: 'Signing In...'})} onMouseUp={async () => {
                if (this.state.newUser){await this.signUp()}
                this.props.authenticate(this.state.email, this.state.password, this.state.phone)
              }} style={styles.button} className='noselect'>
                {this.state.signingIn ? 'Sign In' : <FontAwesomeIcon icon={faSignInAlt} style={{padding: 6}}/>}
              </div>
            </div>
					</div>          
				</div>
			</div>
		)
	}
}

function ExistingUserComponent(props){
  return(
    <form style={styles.form} onSubmit={e => { e.preventDefault() }}>
      <div style={styles.input_div}>
        <input onChange={(ev) => props.this.setState({email: ev.target.value})} value={props.this.state.email} placeholder='Email' />
      </div>
      <div style={styles.input_div}>
        <input onChange={(ev) => props.this.setState({password: ev.target.value})} value={props.this.state.password} placeholder='Password' type="password" />
      </div>                   
    </form>
  )
}

function NewUserComponent(props){
  return(
    <form style={styles.form} onSubmit={e => { e.preventDefault() }}>
      <div style={styles.input_div}>
        <input onChange={(ev) => props.this.setState({email: ev.target.value})} value={props.this.state.email} placeholder='Email' />
      </div>
      <div style={styles.input_div}>
        <input onChange={(ev) => props.this.setState({phone: ev.target.value})} value={props.this.state.phone} placeholder='Phone' />
      </div>
      <div style={styles.input_div}>
        <input onChange={(ev) => props.this.setState({firstName: ev.target.value})} value={props.this.state.firstName} placeholder='First Name' />
      </div>
      <div style={styles.input_div}>
        <input onChange={(ev) => props.this.setState({lastName: ev.target.value})} value={props.this.state.lastName} placeholder='Last Name' />
      </div>
      <div style={styles.input_div}>
        <input onChange={(ev) => props.this.setState({password: ev.target.value})} value={props.this.state.password} placeholder='Password' type="password" />
      </div> 
      <div style={styles.input_div}>
        <input onChange={(ev) => props.this.setState({confirmPassword: ev.target.value})} value={props.this.state.confirmPassword} placeholder='Confirm Password' type="password" />
      </div>
      <div style={styles.input_div}>
        <span style={styles.updateText} onClick={() => props.this.sendRequest()}>or update account</span>
      </div>                                 
    </form>    
  )
}


const styles = { 
  main:{
    height: 'auto',
    backgroundColor: 'white',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    borderRadius: '15px', 
    margin: 'auto',
    width: '95vw',
    marginTop: 20,
  },
  header:{
    margin: 'auto',
    padding: 5
  },
  body:{
    margin: 'auto',
    top: '10%',
    position: 'relative',
  },
  form:{
    width: '80%',
    margin: 'auto',
    padding: 20,
  },
  button:{
    width: '7vw',
    height: '4vh',
    borderRadius: '20px',
    backgroundColor: '#47b8e0',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    padding: '5px',
  },
  input_div:{
    paddingTop: 15,
    paddingBottom: 15,
  },
  link: {
    verticalAlign: 'middle',
    float: 'left',
    color: '#47b8e0', 
    marginTop: 7,
  },
  banner: {
    flex: 1,
    padding: 10,
  },
  updateText:{
    textDecoration: 'underline',
    color: '#47b8e0',
    cursor: 'pointer',
  }
}

export default AuthCard;