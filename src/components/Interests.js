import React from 'react'
import '../App.css';

export default class Interests extends React.Component{


	render(){
		return(
			<div style={styles.container}>
				<div className="subtleShadow" style={styles.header}>
					Choose your interests
				</div>
				<div style={{display: 'flex', margin: 'auto', padding: 10}}>
					<div className="subtleShadow pointer" style={styles.tag}>
						Fun
					</div>
					<div className="subtleShadow pointer" style={styles.tag}>
						Food
					</div>
					<div className="subtleShadow pointer" style={styles.tag}>
						Ball Sport
					</div>
					<div className="subtleShadow pointer" style={styles.tag}>
						Racket Sport
					</div>					
				</div>
				<div style={{display: 'flex', margin: 'auto', padding: 10}}>
					<div className="subtleShadow pointer" style={styles.tag}>
						Intellectual
					</div>
					<div className="subtleShadow pointer" style={styles.tag}>
						Holiday Event
					</div>
					<div className="subtleShadow pointer" style={styles.tag}>
						Healthy Lifestyles
					</div>				
				</div>				
			</div>
		)
	}
}

const styles = {
	container: {
		width: '100%',
		height: '100%',
		marginTop: 80,
		marginBottom: 50,
	},
	header: {
		margin: 'auto',
		width: '35%',
		backgroundColor: 'white',
		borderRadius: '8px',
		padding: 15
	},
	tag: {
		margin: 'auto',
		backgroundColor: 'white',
		borderRadius: 15,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
	}
}