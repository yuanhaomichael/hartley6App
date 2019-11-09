import React from 'react'
import '../App.css';

export default function Interests(props){
		const interests = [
			'Fun',
			'Fo'
		]
		return(
			<div style={styles.container}>
				<div className="subtleShadow" style={styles.header}>
					Choose your interests
				</div>
				<div style={{width: '500px', margin: 'auto'}}>
					<div style={{display: 'flex', margin: 'auto', padding: 10}}>
						<Interest updateInterests={() => props.updateInterests('Fun')} content='Fun'/>
						<Interest updateInterests={() => props.updateInterests('Food')} content='Food'/>
						<Interest updateInterests={() => props.updateInterests('Ball Sport')} content='Ball Sport'/>
						<Interest updateInterests={() => props.updateInterests('Racket Sport')} content='Racket Sport'/>					
					</div>
					<div style={{display: 'flex', margin: 'auto', padding: 10}}>
						<Interest updateInterests={() => props.updateInterests('Intellectual')} content='Intellectual'/>
						<Interest updateInterests={() => props.updateInterests('Holiday Event')} content='Holiday Event'/>
						<Interest updateInterests={() => props.updateInterests('Healthy Lifestyle')} content='Healthy Lifestyle'/>				
					</div>	
				</div>			
			</div>
		)	
} 


class Interest extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			active: false,
		}
	}

	render(){
		return(
			<div onClick={() => {
					this.props.updateInterests()
					this.setState({active: !this.state.active})}
				} className="subtleShadow pointer" style={this.state.active ?  {...styles.tag, backgroundColor: '#94CBEA'} : {...styles.tag, backgroundColor: 'white'}}>
				{this.props.content}
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
		borderRadius: 15,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
	}
}