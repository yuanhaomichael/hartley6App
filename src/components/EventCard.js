import React from 'react'
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faUserPlus, faShare, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

import {BACKEND_API_URI} from '../constants'

export default class EventCard extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			likes: false,
			likesCount: null
		}
		this.sendLike = this.sendLike.bind(this)
		this.sendUnlike = this.sendUnlike.bind(this)
	}

	componentDidMount(){
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
		    	event_id: this.props.ev.id
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
			<div className="subtleShadow" style={styles.card}>
				<div style={styles.body}>
					<div style={styles.left}>
						<div style={{...styles.line, color: 'grey', fontWeight: 'bold'}}>
							{this.props.ev.host}
						</div>				
						<div style={{...styles.line, fontWeight: 'bold'}}>
							{this.props.ev.title}
						</div>
						<div style={styles.line}>
							{parseDate(this.props.ev.time)}
						</div>
						<div style={{...styles.line, position: 'absolute', bottom: 35,}}>
							<span style={{textDecoration: 'underline', cursor: 'pointer'}}>See who's going</span> | {this.props.ev.availability} spots left
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
								<FontAwesomeIcon icon={faShare} size="lg"/>
							</div>
						</div>
					</div>						
				</div>											
			</div>
		)
	}
}

function parseDate(date){
	let v1 = date.replace('T', '@').replace('2019-', '')
	let milTime = v1.split(':', 2).join(':').replace(v1.split(':', 2).join(':').substring(0,v1.split(':', 2).join(':').indexOf('@') + 1), "")
	let time = (parseInt(milTime.split(':')[0]) > 12 ? milTime.replace(milTime.substring(0,2), parseInt(milTime.split(':')[0]) - 12) + " PM" : milTime.replace(milTime.substring(0,2), parseInt(milTime.split(':')[0])) + " AM")
	return time
}

const styles = {
	card: {
		width: '95vw',
		height: '30vh',
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
	},
	left: {
		width: '75%',
	},
	right: {
		width: '22%',
		height: '100%',
		position: 'relative',
	},
	bottom_icons: {
		position: 'absolute',
		bottom: 28,
		display: 'flex',
		width: '100%',
	},
	top_icon: {
		position: 'absolute',
		top: 5,
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