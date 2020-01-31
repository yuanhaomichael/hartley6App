import React from 'react'
import classes from '../App.css';
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faUserPlus, faShare, faTimes, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

import {BACKEND_API_URI} from '../constants'

export default class EventCard extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			likes: false,
			likesCount: null,
			groupModal: 'none',
			shareModal: 'none',
			members: []
		}
		this.sendLike = this.sendLike.bind(this)
		this.sendUnlike = this.sendUnlike.bind(this)
	}

	componentDidMount(){
		if (this.props.authData.token.length > 0){		
	//Get likes
		fetch(encodeURI(BACKEND_API_URI + 'event/event_like'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'authToken': this.props.authData.token
			},
			body: JSON.stringify({
				event_id: this.props.ev.id
			})
		})
		.then((res) => {
			return res.json()
		})
		.then((json) => {
			this.setState({
				likes: true,
				likesCount: json.events.length
			})
		})
		.catch((err) => console.log(err))

		//Get Members
		fetch(encodeURI(BACKEND_API_URI + 'event/group'),{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'authToken': this.props.authData.token
			},
			body: JSON.stringify({
				event_id: this.props.ev.id
			})
		})
		.then((res) => res.json())
		.then((json) => {
			this.setState({
				members: json['events']
			})
		})
		.catch((err) => console.log(err))}
	}

	sendLike(){
		fetch(encodeURI(BACKEND_API_URI + 'event/like'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
		      	'Content-Type': 'application/json',
		      	'authToken': this.props.authData.token
		     	 //'Content-Type':'application/x-www-form-urlencoded',
		    },
		    body: JSON.stringify({
          event_id: this.props.ev.id,
		    })
		})
		.then((res) => res.json())
		.then((json) => {
			this.setState({
				likes: true,
				likesCount: json.events.length
			})
		})
		.catch((err) => err)
	}

	sendUnlike(){
		fetch(encodeURI(BACKEND_API_URI + 'event/unlike'), {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
      	'Content-Type': 'application/json',
      	'authToken': this.props.authData.token
     	 //'Content-Type':'application/x-www-form-urlencoded',
		    },
		    body: JSON.stringify({
		    	event_id: this.props.ev.id
		    })
		})
		.then((res) => res.json())
		.then((json) => {
			this.setState({
				likes: false,
				likesCount: null
			})
		})
		.catch((err) => err)
	}

	render(){
		return(
			<div className={classes.black} style={styles.card}>
				<Modal display={this.state.groupModal} headerLabel={'People Attending'}>
					<div>
						<FontAwesomeIcon style={{color: 'red', cursor: 'pointer', float: 'right', padding: 20}} onClick={() => this.setState({groupModal: 'none'})} icon={faTimes} />
					</div>
					{this.state.members.map((member, i) => {
						return(
							<div key={member + "-" + i} style={{padding: 20}}>{member.first_name + " " + member.last_name}</div>
						)
					})}
				</Modal>
				<Modal display={this.state.shareModal} headerLabel={'Share (Coming Soon)'} >
					<div>
						<FontAwesomeIcon style={{color: 'red', cursor: 'pointer', float: 'right', padding: 20}} onClick={() => this.setState({shareModal: 'none'})} icon={faTimes} />
					</div>				
				</Modal>
				<div style={styles.body}>
					<div style={styles.left}>
						<div style={{...styles.line, color: 'grey', fontWeight: 'bold'}}>
							{this.props.ev.host}
						</div>				
						<div style={{...styles.line, fontWeight: 'bold'}}>
							{this.props.ev.title}
						</div>
						<div style={styles.line}>
							{getDay(this.props.ev.time)}, {this.props.ev.time.replace(this.props.ev.time.substring(this.props.ev.time.indexOf('T'), this.props.ev.time.length), "").replace('T', '@').replace('2019-', '').replace('-', '/')} at {parseDate(this.props.ev.time)} 
						</div>
						<div style={{...styles.line, marginBottom: 25,}}>
							{this.props.ev.location} 
						</div>            
						<div style={{...styles.line, position: 'absolute', bottom: 10,}}>
							<span onClick={() => this.setState({groupModal: 'block'})} style={{textDecoration: 'underline', cursor: 'pointer'}}>See who's going</span> &nbsp;| {this.props.ev.availability} spots left
						</div>
					</div>
					<div style={styles.right}>
						<div style={styles.top_icon}>
							<div style={{...styles.icon, float:'right'}} className="pointer">
								<FontAwesomeIcon onClick={() => this.props.join()} icon={faUserPlus} size="lg"/>
							</div>
						</div>
						<div style={styles.bottom_icons}>
							<div style={styles.icon} className="pointer">
								{(this.state.likes ? 
									<FontAwesomeIcon icon={faHeartSolid} size="lg" onClick={() => this.sendUnlike()} />  
									: <FontAwesomeIcon icon={faHeart} size="lg" onClick={() => this.sendLike()}/> )
								}
								<span style={styles.likes}>{this.state.likesCount}</span>
							</div>
							<div style={styles.icon} className="pointer">
								<FontAwesomeIcon onClick={() => this.setState({shareModal: 'block'})} icon={faShare} size="lg"/>
							</div>
						</div>
					</div>						
				</div>											
			</div>
		)
	}
}
function getDay(date){
	let d = new Date(date)
	let day = (() =>{
		switch(d.getDay()){
			case 0:
				return 'Sunday' 
			case 1:
				return 'Monday'
			case 2:
				return 'Tuesday' 
			case 3:
				return 'Wednesday' 
			case 4:
				return 'Thursday' 
			case 5:
				return 'Friday'
			case 6:
				return 'Saturday' 				 																
		}
	})()
	return day
}
function parseDate(date){
	let v1 = date.replace('T', '@').replace('2019-', '')
	let milTime = v1.split(':', 2).join(':').replace(v1.split(':', 2).join(':').substring(0,v1.split(':', 2).join(':').indexOf('@') + 1), "")
	let time = (parseInt(milTime.split(':')[0]) >= 12 ? milTime.replace(milTime.substring(0,2), parseInt(milTime.split(':')[0]) - 12) + " PM" : milTime.replace(milTime.substring(0,2), parseInt(milTime.split(':')[0])) + " AM")
	time = (time[0] == 0 ? time.replace(time.substring(0,1), '12') : time)
	return time
}

const styles = {
	card: {
		width: '95%',
		height: 'auto',
		backgroundColor: 'white',
		borderRadius: 12,
		margin: 'auto',
		marginBottom: 25,
	},
	body: {
		width: '100%',
		height: '100%',
		position: 'relative',
		padding: 12,
		display: 'flex'
	},
	line: {
		display: 'flex',
		align: 'left',
		padding: 3,
    textAlign: 'left',
    height: 'auto',
	},
	left: {
    width: '75%',
    height: 'auto'
	},
	right: {
		width: '22%',
		height: 'auto',
		position: 'relative',
	},
	bottom_icons: {
		position: 'absolute',
		bottom: 1,
		display: 'flex',
		right: 10,
		width: '100%',
	},
	top_icon: {
		position: 'absolute',
		top: 5,
		right: 10,
		width: '100%',
	},
	icon: {
		width: '50%',
		margin: 'auto',
	},
	likes: {
		fontSize: 10,
		verticalAlign: 'sub',
		fontWeight: 'bold',
	},
}