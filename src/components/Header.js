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
			where: '',
			time: '',
			availability: '',
			tags: [],
			button_text: 'Submit Event',
			modal_display: 'none'
		}
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.sendRequest = this.sendRequest.bind(this)
		this.addTag = this.addTag.bind(this)
		this.removeTag = this.removeTag.bind(this)
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
				where: this.state.where,
				tags: this.state.tags,
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
					where: '',
					host: '',
					time: '',
					tag: [],
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
			where: '',
			time: '',
			tags: [],
			availability: 0,
			modal_display: 'none',
			loadText: false,
		})
	}	

	addTag(ev){
		if (ev.key === 'Enter'){
			if (!this.state.tags.includes(this.state.category)){
				this.setState({
					tags: [...this.state.tags, this.state.category],
					category: ''
				})
			}else{
				this.setState({category: ''})
			}
		}
	}

	removeTag(rmTag){
		this.setState({
			tags: [...this.state.tags.filter((tag) => tag != rmTag)]
		})
	}

	render(){
		return(
			<div style={styles.main}>
				<Modal display={this.state.modal_display} headerLabel={'New Event'}>
					<div style={styles.div}>
						<span onClick={this.closeModal} style={styles.span}><FontAwesomeIcon icon={faTimes} size="lg"/></span>
					</div>
					<div style={{height: '100%', marginTop: 20}} >
						<form style={styles.form}>
							<div style={{height: '100%'}} >
								<div style={{marginBottom: 10}}>
									<input placeholder="Event Name" onChange={(ev) => this.setState({title: ev.target.value})} value={this.state.title} />
								</div>
								<div style={{display: 'flex', marginBottom: 10}}>
									<input style={{width: '60%'}} placeholder="Hosted by" onChange={(ev) => this.setState({host: ev.target.value})} value={this.state.host} />
									<input style={{width: '35%', marginLeft: "5%"}} placeholder="Attendance" onChange={(ev) => this.setState({availability: ev.target.value})}/>
								</div>
								<div style={{marginBottom: 10}}>
									<input placeholder="When is it?" type="datetime-local" onChange={(ev) => this.setState({time: ev.target.value})} value={this.state.time} />
								</div>
								<div style={{marginBottom: 10}}>
									<input placeholder="Location" onChange={(ev) => this.setState({where: ev.target.value})} value={this.state.where} />
								</div>								
								<div style={{marginBottom: 10, display: 'flex'}}>
									{this.state.tags.map((tag,i) => {
										return(
											<div key={tag + "-" + i} style={styles.tag}>
												{tag}
												<FontAwesomeIcon onClick={() => this.removeTag(tag)} icon={faTimes} style={{padding: 3, cursor: 'pointer'}}/>
											</div>
										)
									})}

									<input placeholder="Add tags [ENTER to Add]" onKeyPress={(ev) => this.addTag(ev)} onChange={(ev) => this.setState({category: ev.target.value})} value={this.state.category} />
								</div>
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
  	width: '90%',
  	margin: 'auto',
  	height: '100%'
  },
  formHead:{
  	padding: '20px',
  },
  button:{
    width: '5vw',
    height: '2vh',
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
  },
  tag: {
  	backgroundColor: '#47b8e0',
  	color: 'white',
  	padding: 10,
  	borderRadius: 10,
  	display: 'flex'
  }
}

export default Header