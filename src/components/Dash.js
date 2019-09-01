import React from 'react'
import Modal from './Modal'

class Dash extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			events: [],
			title:'',
			category: '',
			host: '',
			time: '',
			availability: 0,
			button_text: 'Submit Event',
			modal_display: 'none'
		}

		this.sendRequest = this.sendRequest.bind(this)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}

	sendRequest(){
		console.log(this.props.authData)
    fetch('http://localhost:3090/v1/event', {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },      
      body: JSON.stringify({
              userId: this.props.authData.userId,
              authToken: this.props.authData.authToken,
							title: this.state.title,
							category: this.state.category,
							host: this.state.host,
							time: this.state.time,
							availability: this.state.availability,
            }),
    })
    .then((res) => res.json())
    .then((json) => {
    	this.setState({
        	events: [...this.state.events, json],
					title:'',
					category: '',
					host: '',
					time: '',
					availability: 0,
					button_text: 'Submit Event',
					modal_display: 'none',        	
        })
    	console.log(this.state)
    })
    .catch((err) => {
    	alert('Failed to create event. ERROR: ' + err)
    })	
	}
	componentWillMount(){
		getEvents(this.props.authData)
		.then((res) => res.json())
		.then((json) => this.setState({
				events: [...json['events']]
		}))
		.catch((err) => {
			alert('There was an error retrieving events. ERROR: ' + err)
		})
	}
	openModal(){
		this.setState({
			modal_display: 'block'
		})
	}
	closeModal(){
		this.setState({
			modal_display: 'none'
		})
	}	

	render(){
		console.log(this.state.modal_display)
		return (
			<div style={styles.main}>
				<Modal display={this.state.modal_display}>
					<div style={styles.div}>
						<h3 style={styles.formHead}>Have an Event Idea?</h3>
						<span onClick={this.closeModal} style={styles.span}>close</span>
					</div>
					<form style={styles.form}>
						<input placeholder="What is the event?" onChange={(ev) => this.setState({title: ev.target.value})} value={this.state.title} />
						<input placeholder="Who's hosting?" onChange={(ev) => this.setState({host: ev.target.value})} value={this.state.host} />
						<input placeholder="When is it?" onChange={(ev) => this.setState({time: ev.target.value})} value={this.state.time} />
						<input placeholder="What kind of event is it?" onChange={(ev) => this.setState({category: ev.target.value})} value={this.state.category} />
						<input placeholder="How many people can come?" onChange={(ev) => this.setState({availability: ev.target.value})} value={this.state.availability} />
						<div onMouseDown={(ev) => this.setState({button_text: 'Creating Event...'})}  onMouseUp={this.sendRequest} style={styles.button}>
							{this.state.button_text}
						</div>
					</form>
				</Modal>
				<div style={styles.header}>
					<span style={styles.coins}>Coins: 0</span>
					<h2>Welcome to the Hartley 6 Community Dashboard</h2>
					<span onClick={this.openModal} style={styles.newEventBtn} className='noselect'>+</span>
				</div>
				<div style={styles.body}>
					<table style={styles.table}>
					<col width='40%' />
					<col width='15%' />
					<col width='15%' />
					<col width='10%' />
					<col width='10%' />
					<col width='5%' />
					<col width='5%' />
						<thead style={styles.head}>
								<tr>
									<td>Event Title</td>
									<td>Host</td>
									<td>Category</td>
									<td>Time</td>
									<td>Availability</td>
								</tr>
						</thead>
						<tbody>
						{this.state.events.map((ev) => {
							return (
								<tr style={styles.tr} key={ev.id}>
									<td>{ev.title}</td>
									<td>{ev.host}</td>
									<td>{ev.category}</td>
									<td>{ev.time}</td>
									<td>{ev.availability}</td>
									<td><button>Like</button></td>
									<td><button>Trash</button></td>
								</tr>
											)
						})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

function getEvents(authData){
	return fetch('http://localhost:3090/v1/events', {
	  method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        'authToken': authData.authToken,
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
	})
}

const styles = {
  main:{
    width: '70%',
    margin: 'auto',
    backgroundColor: 'white',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    borderRadius: '15px',
    marginTop: '30px'
  },
  header: {
  	backgroundColor: '#E3E4E5',
    borderRadius: '15px 15px 0px 0px',
  	padding: '10px',
  	position: 'relative'
  },
   body:{
    margin: 'auto',
    top: '10%',
    position: 'relative',
  },
  form:{
  	width: '75%',
  	margin: 'auto',
  	paddingBottom: '20px'
  },
  formHead:{
  	padding: '20px',
  },
  table:{
  	width: '90%',
  	height: '100vh',
  	marginTop: '2%',
  },
  head:{
  	fontWeight: 'bold',
  },
  newEventBtn:{
  	right: 50,
  	top: 12,
  	position: 'absolute',
  	fontWeight: 'bold',
  	fontSize: '50px',
  	cursor: 'pointer',
  },
   coins:{
  	left: 50,
  	top: 33,
  	position: 'absolute',
  	fontWeight: 'bold',
  	fontSize: '20px',
  }, 
  tr:{
  	paddingBottom: '15px',
  },
  button:{
    width: '10vw',
    height: '4vh',
    borderRadius: '10px',
    backgroundColor: '#47b8e0',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    cursor: 'pointer',
    margin: 'auto',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '15px',
    padding: '5px',
  },
  div:{
  	position: 'relative',
  },
  span:{
  	color: 'red',
  	position: 'absolute',
  	top: 20,
  	right: 20,
  	cursor: 'pointer',
  },
}
export default Dash