import React from 'react'

import {
	Link,
	withRouter
  } from "react-router-dom";

function DrawerMenu(props){
	return (
		<div style={{display: props.display}}>
			<div style={styles.overlay}>
				<div style={styles.menu}>
					<div style={styles.body}>
						<div style={{position: 'absolute', borderBottom: '1px solid black', width: '100%'}}>
							<h2 style={styles.menuText}>Coins: {props.coins}</h2>
						</div>
						<div style={{left: 10, top: '15%', position: 'absolute',}}>
							<Link to="/privacy" style={{textDecoration: 'none'}}><h2 style={styles.menuText}>Privacy</h2></Link>
						</div>
						{props.authData.token.length > 0 &&
            <div style={{bottom: 5, left: 10, position: 'absolute',}}>
							<h2 onClick={() => props.logOut()} style={styles.menuText}>Log Out</h2>
						</div>}
					</div>
				</div>
				<div onClick={() => props.toggle()} style={{height: '100%', width: '40%', position: 'absolute', right: 0}}>
				</div>
			</div>
		</div>
	)
}

export default withRouter(DrawerMenu)

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
		width: '60%',		
	},
	menuText:{
    color: 'black',
	},
	body:{
		backgroundColor: 'white',
		width: '100%',
		height: '100%'
	},
}