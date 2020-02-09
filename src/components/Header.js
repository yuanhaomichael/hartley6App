import React from 'react'
import Modal from './Modal'
import Drawer from './Drawer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faTimes, faBars } from '@fortawesome/free-solid-svg-icons'

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
			modal_display: 'none',
			drawer_display: 'none',
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
					tags: [],
					availability: '',
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
			availability: '',
			modal_display: 'none',
			loadText: false,
		})
	}	

	addTag(ev){
		if (ev.key === 'Enter'){
			if (!this.state.tags.includes(this.state.category.toUpperCase())){
				this.setState({
					tags: [...this.state.tags, this.state.category.toUpperCase()],
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
					<div style={{height: 'auto'}} >
						<form style={styles.form}>
							<div style={{height: 'auto'}} >
								<div style={{marginBottom: 10, display: 'flex'}}>
									<input placeholder="Event Name" onChange={(ev) => this.setState({title: ev.target.value})} value={this.state.title} />
								</div>
								<div style={{display: 'flex', marginBottom: 10}}>
									<input style={{width: '60%'}} placeholder="Hosted by" onChange={(ev) => this.setState({host: ev.target.value})} value={this.state.host} />
									<input style={{width: '35%', marginLeft: "5%"}} placeholder="Attendance" onChange={(ev) => this.setState({availability: ev.target.value})} value={this.state.availability}/>
								</div>
								<div style={{marginBottom: 10}}>
									<input style={{width: '100%'}} placeholder="When is it?" type="datetime-local" onChange={(ev) => this.setState({time: ev.target.value})} value={this.state.time} />
								</div>
								<div style={{marginBottom: 10, display: 'flex'}}>
									<input style={{width: '100%'}} placeholder="Location" onChange={(ev) => this.setState({where: ev.target.value})} value={this.state.where} />
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
                <div style={{height: '5vh'}}>
									{this.state.loadText ? 
										<div style={{float: 'right', marginTop: 8}}>
											<div className="loader"></div>
										</div> 
										:
										<div onMouseDown={(ev) => {
											this.setState({loadText: true})
											this.sendRequest()
										}} style={{...styles.button, float: 'right'}}>
										 <FontAwesomeIcon style={{verticalAlign: 'top'}} icon={faArrowRight} />
										</div>
										}
                  </div>
							</div>
						</form>
					</div>
				</Modal>
				<div style={{display: 'flex'}}>
					<div style={styles.div}>
						<FontAwesomeIcon onClick={() => this.setState({drawer_display: 'block'})} style={{...styles.headerText, fontSize: 20, left: 10, top: 12}} icon={faBars} />
					</div>
					<div style={styles.div}>
						<span onClick={this.openModal} style={styles.newEventBtn} className='noselect newEventBtn'>+</span>
					</div>
				</div>
        <Drawer 
          display={this.state.drawer_display} 
          toggle={() => this.setState({drawer_display: 'none'})} 
          coins={this.props.authData.coins} 
          logOut={() => {
            persistor.purge()
            document.location.reload()
          }}
          authData={this.props.authData}
        />				
			</div>
		)
	}
}


const styles = {
	main: {
		position: 'fixed',
		top: 0,
		width: '100vw',
		backgroundColor: 'white',
		height: '45px',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    zIndex: 8
	},
	div: {
		width: '33%'
	},
  form:{
  	width: '85%',
  	margin: 'auto',
  	height: '100%',
    padding: 20,
  },
  formHead:{
  	padding: '20px',
  },
  button:{
    width: '5vw',
    height: '3vh',
    borderRadius: '30px',
    backgroundColor: '#47b8e0',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    padding: '6px',
    borderBottom: '1px solid black',
    margin: 5,
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
  	position: 'fixed',
  	top: 15,
  	right: 20,
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