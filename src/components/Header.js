import React from 'react'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons'

import { persistor } from '../configureStore'

import { BACKEND_API_URI }from '../constants'

class Header extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			title:'',
			category: '',
			host: '',
			time: '',
			availability: '',
			button_text: 'Submit Event',
			modal_display: 'none'
		}
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.sendRequest = this.sendRequest.bind(this)
	}


	sendRequest(){
    fetch(BACKEND_API_URI + 'event', {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
          'authToken': this.props.authData.token
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },      
      body: JSON.stringify({
        userId: this.props.authData.userId,
        authToken: this.props.authData.token,
				title: this.state.title,
				category: this.state.category,
				host: this.state.host,
				time: this.state.time,
				availability: this.state.availability,
            }),
    })
    .then((res) => {
    	console.log(res)
    	return res.json()
    })
    .then((json) => {
    	this.setState({
					title: '',
					category: '',
					host: '',
					time: '',
					availability: 0,
					loadText: false,
					modal_display: 'none',        	
        })
    	console.log('json')
    	this.props.events(json.events)
    })
    .catch((err) => alert('FAILED: ' + err))	
	}	
	openModal(){
		this.setState({
			modal_display: 'block'
		})
	}
	closeModal(){
		this.setState({
			title:'',
			category: '',
			host: '',
			time: '',
			availability: 0,
			modal_display: 'none',
			loadText: false,
		})
	}	

	render(){
		return(
			<div style={styles.main}>
				<Modal display={this.state.modal_display}>
					<div style={styles.div}>
						<h3 style={styles.formHead}>Have an Event Idea?</h3>
						<span onClick={this.closeModal} style={styles.span}><FontAwesomeIcon icon={faTimes} size="lg"/></span>
					</div>
					<div >
						<form style={styles.form}>
							<div>
								<input placeholder="What is the event?" onChange={(ev) => this.setState({title: ev.target.value})} value={this.state.title} />
								<input placeholder="Who's hosting?" onChange={(ev) => this.setState({host: ev.target.value})} value={this.state.host} />
								<input placeholder="When is it?" type="datetime-local" onChange={(ev) => this.setState({time: ev.target.value})} value={this.state.time} />
								<input placeholder="Add tags (seperated by a comma)" onChange={(ev) => this.setState({category: ev.target.value})} value={this.state.category} />
								<input placeholder="How many people can come?" onChange={(ev) => this.setState({availability: ev.target.value})}/>
									{this.state.loadText ? 
										<div style={{float: 'right', marginTop: 15}}>
											<div className="loader"></div>
										</div> 
										:
										<div onMouseDown={(ev) => {
											this.setState({loadText: true})
											this.sendRequest()
										}} style={{...styles.button, float: 'right'}}>
										 <FontAwesomeIcon icon={faArrowRight} />
										</div>
										}
							</div>
						</form>
					</div>
				</Modal>

				<div>
					<div className="pointer" style={{position: 'absolute', top: 3, left: 10, zIndex: 2}}>
						<span onClick={() => {
							persistor.purge()
							document.location.reload()
						}}>log out</span>
					</div>
					<div style={styles.div}>
						<span style={styles.headerText}>Coins: {this.props.authData.coins}</span>
					</div>
					<div style={styles.div}>
						<span style={styles.headerText}>Hartley 6</span>
					</div>
					<div style={styles.div}>
						{this.props.authData.admin &&
						<span onClick={this.openModal} style={styles.newEventBtn} className='noselect newEventBtn'>+</span>}
					</div>
				</div>
			</div>
		)
	}
}


const styles = {
	main: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'white',
		height: '45px',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    zIndex: 8
	},
	div: {
		display: 'inline-block',
		align: 'center',
		width: '33%'
	},
  form:{
  	width: '80%',
  	margin: 'auto',
  	paddingBottom: '20px',
  },
  formHead:{
  	padding: '20px',
  },
  button:{
    width: '5vw',
    height: '4vh',
    borderRadius: '30px',
    backgroundColor: '#47b8e0',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '15px',
    padding: '5px',
    borderBottom: '1px solid black',
  },
  newEventBtn:{
    right: 15,
    top: 0,
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: '30px',
    cursor: 'pointer',
  },
  span:{
  	color: 'red',
  	position: 'absolute',
  	top: 20,
  	right: 30,
  	cursor: 'pointer',
  },
  headerText: {
   	position: 'absolute',
  	top: 15,
  }

}

export default Header