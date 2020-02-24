import React from 'react'
import '../App.css';

export default function Interests(props){
		const interests = [
			'Food',
			'Campus Events',
			'Ball Sport',
			'Racket Sport',
			'Intellectual',
			'Movie',
			'Modern Music',
			'Fun',
			'Healthy Lifestyle',
			'Dessert',
			'Chess',
			'Holiday Event',
			'Social Justice',
			'NYC Event',
			'Excursion',
			'Multicultural',
			'Games',
      'Western Food',
      'Hartley 6',
      'John Jay 7',
      'Hartley 9',
		]
		return(
			<div style={styles.container}>
				<div className="subtleShadow" style={styles.header}>
					Choose your interests
				</div>
				<div style={{display: 'flex', padding: 10, flexWrap: 'wrap', justifyContent: 'center'}}>
					{interests.map((int, i) => {
						return (
							<Interest key={`${int}-${i} `} updateInterests={() => props.updateInterests(int)} content={int}/>
						)
					})}					
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
		width: '100vw',
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
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: 17,
		margin: 5,
	},
}