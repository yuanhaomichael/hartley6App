import React from 'react'
import Modal from './Modal'

import { BACKEND_API_URI }from '../constants'

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
		this.trash = this.trash.bind(this)
		this.join = this.join.bind(this)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}

	sendRequest(){
    fetch(BACKEND_API_URI + 'event', {
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
					title: '',
					category: '',
					host: '',
					time: '',
					availability: 0,
					button_text: 'Submit Event',
					modal_display: 'none',        	
        })
    })
    .catch((err) => alert('Failed to create event. ERROR: ' + err))	
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
	trash(id){
		fetch(BACKEND_API_URI + 'event', {
      method: 'DELETE',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },      
      body: JSON.stringify({
              userId: this.props.authData.userId,
              eventId: id,
            }),			
		})
		.then((res) => res.json())
		.then((json) => {
			alert('Event deleted.')
		  this.setState({
      	events: [...json['events']],
				title: '',
				category: '',
				host: '',
				time: '',
				availability: 0,
				button_text: 'Submit Event',
				modal_display: 'none',        	
      })
		})
		.catch((err) => alert('Failed to delete event. ERROR: ') + err)
	}
	join(id){
		fetch(BACKEND_API_URI + 'event', {
      method: 'PUT',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },      
      body: JSON.stringify({
              userId: this.props.authData.userId,
              eventId: id,
            }),			
		})
		.then((res) => res.json())
		.then((json) => {
			alert('Event joined.')
		  this.setState({
      	events: [...json['events']],
				title: '',
				category: '',
				host: '',
				time: '',
				availability: 0,
				button_text: 'Submit Event',
				modal_display: 'none',        	
      })
		})
		.catch((err) => alert('Failed to join event. ERROR: ') + err)
	}
	openModal(){
		this.setState({
			modal_display: 'block'
		})
	}
	closeModal(){
		this.setState({
			title:'',
			category: '',
			host: '',
			time: '',
			availability: 0,
			modal_display: 'none',
			button_text: 'Submit Event',
		})
	}	

	render(){
		return (
			<div class='main' style={styles.main}>
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
						<input placeholder="How many people can come?" onChange={(ev) => this.setState({availability: ev.target.value})} value={this.state.availability}/>
						<div onMouseDown={(ev) => this.setState({button_text: 'Creating Event...'})}  onMouseUp={this.sendRequest} style={styles.button}>
							{this.state.button_text}
						</div>
					</form>
				</Modal>
				<div style={styles.header}>
					<span style={styles.coins}>Coins: 100</span>
					<h2>Welcome to the Hartley 6 Community Dashboard</h2>
					<span onClick={this.openModal} style={styles.newEventBtn} className='noselect newEventBtn'>+</span>
				</div>
				<div style={styles.body}>
					<table style={styles.table}>
					<col width='40%' />
					<col width='15%' />
					<col class='hide-col' width='15%' />
					<col width='10%' />
					<col width='10%' />
					<col width='5%' />
					<col width='5%' />
						<thead style={styles.head}>
								<tr>
									<td>Event Title</td>
									<td>Host</td>
									<td class='hide-col'>Category</td>
									<td>Time</td>
									<td>Availability</td>
								</tr>
						</thead>
						<tbody>
						{this.state.events.map((ev) => {
							return (
								<tr class='table-text' style={styles.tr} key={ev.id}>
									<td>{ev.title}</td>
									<td>{ev.host}</td>
									<td class='hide-col'>{ev.category}</td>
									<td>{ev.time}</td>
									<td>{ev.availability}</td>
									<td><button onClick={() => this.join(ev.id)}>Join</button></td>
									<td><button onClick={() => this.trash(ev.id)}>Remove</button></td>
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
	return fetch(BACKEND_API_URI+'events', {
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
    margin: 'auto',
    backgroundColor: 'white',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    borderRadius: '15px',
    marginTop: '30px'
  },
  header: {
  	backgroundColor: '#E3E4E5',
    borderRadius: '15px 15px 0px 0px',
  	padding: '5px',
  	position: 'relative'
  },
   body:{
    margin: 'auto',
    top: '10%',
    position: 'relative',
    width: '100%'
  },
  form:{
  	width: '80%',
  	margin: 'auto',
  	paddingBottom: '20px',
  },
  formHead:{
  	padding: '20px',
  },
  table:{
  	width: '90%',
  	height: '100%',
  	marginTop: '2%',
  	marginBottom: '10%',
  },
  head:{
  	fontWeight: 'bold',
  },
  newEventBtn:{
    right: 50,
    top: 60,
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: '50px',
    cursor: 'pointer',
  },
   coins:{
  	left: 50,
  	top: 75,
  	position: 'absolute',
  	fontWeight: 'bold',
  	fontSize: '20px',
  }, 
  tr:{
  	backgroundColor: 'red',
  	width: '100%'
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
    borderBottom: '1px solid black',
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