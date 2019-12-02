import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export default function DrawerMenu(props){
	return (
		<div style={{display: props.display}}>
			<div style={styles.overlay}>
				<div style={styles.menu}>
					<div style={styles.header}>
						<FontAwesomeIcon icon={faUser} style={{fontSize: 150, color: 'black', marginTop: 15}}/>
					</div>
					<div style={styles.body}>
						<div style={{left: 10, position: 'absolute'}}>
							<h2 style={styles.menuText}>Coins: {props.coins}</h2>
						</div>
						<div style={{bottom: 5, left: 10, position: 'absolute',}}>
							<h2 onClick={() => props.logOut()} style={styles.menuText}>Log Out</h2>
						</div>
					</div>
				</div>
				<div onClick={() => props.toggle()} style={{height: '100%', width: '17%', position: 'absolute', right: 0}}>
				</div>
			</div>
		</div>
	)
}

const styles = {
	overlay:{
		backgroundColor: 'rgba(0,0,0,0.5)',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		position: 'fixed',
		zIndex: 10,
		display: 'flex-row'
	},
	menu:{
		backgroundColor: 'white',
		top: 0,
		bottom: 0,
		position: 'absolute',
		width: '83%',		
	},
	menuText:{
		textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
		color: 'white',
	},
	header: {
		width: '100%',
		height: '25%',
		borderBottom: '3px solid black'
	},
	body:{
		backgroundColor: 'rgb(158,209,237)',
		width: '100%',
		height: '75%'
	},
}