import React from 'react'
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default class EventCard extends React.Component{
	constructor(props){
		super(props)
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
						<div style={{...styles.line, position: 'absolute', bottom: 27}}>
							See who's going | {this.props.ev.availability} spots left
						</div>
					</div>
					<div style={styles.right}>
						<div style={styles.icons}>
							<div style={styles.icon} className="pointer">
								<FontAwesomeIcon icon={faHeart} size="lg"/>
							</div>
							<div style={styles.icon} className="pointer">
								<FontAwesomeIcon onClick={() => this.props.join()} icon={faUserPlus} size="lg"/>
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
	let sub = v1.substring(v1.indexOf('@'), v1.length)
	let milTime = v1.split(':', 2).join(':').replace(v1.split(':', 2).join(':').substring(0,v1.split(':', 2).join(':').indexOf('@') + 1), "")
	let time = (parseInt(milTime.split(':')[0]) > 12 ? milTime.replace(milTime.substring(0,2), parseInt(milTime.split(':')[0]) - 12) + " PM" : milTime.replace(milTime.substring(0,2), parseInt(milTime.split(':')[0])) + " AM")
	return time
}

const styles = {
	card: {
		width: '95vw',
		height: '35vh',
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
	icons: {
		position: 'absolute',
		bottom: 27,
		display: 'flex',
		width: '100%',

	},
	icon: {
		width: '50%',
		margin: 'auto',
	}
}