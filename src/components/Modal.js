import React from 'react'

class Modal extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			display: this.props.display
		}
	}


	render(){
		return(
			<div style={{display: this.props.display}}>
				<div style={styles.overlay}>
					<div className='subtleShadow' style={styles.label}>
						<h4 style={styles.labelText}>{this.props.headerLabel}</h4>
					</div>
					<div className='modal' style={styles.modal}>
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
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
	},
	modal:{
		margin: 'auto',
		backgroundColor: 'white',
		borderRadius: '15px',
		top: 10,
		height: 'auto',
		position: 'relative'
	},
	label: {
		backgroundColor: 'white', 
		height: 'auto', 
		width: '20vh', 
		borderRadius: '15px', 
		margin: 'auto', 
		marginTop: 15, 
    fontWeight: 'bold',
	},
	labelText: {
		padding: 8,
	}
}

export default Modal