import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { BACKEND_API_URI }from '../constants'

class Dash extends React.Component{
	constructor(props){
		super(props)
		this.state = {
		}
    this.trash = this.trash.bind(this)
    this.join = this.join.bind(this)

	}

	trash(id){
		this.props.trash(id)
	}

	join(id){
		this.props.join(id)
	}
	render(){
		return (
			<div className='main' style={styles.main}>
				<div style={styles.header}>
					<h4>Community Dashboard</h4>
				</div>
				<div style={styles.body}>
					<table style={styles.table}>
					<col width='40%' />
					<col width='10%' />
					<col width='10%' />
					<col width='10%' />
					<col width='10%' />
					<col width='5%' />
					<col width='5%' />
						<thead style={styles.head}>
								<tr>
									<th>Event Title</th>
									<th>Host</th>
									<th className='hide-col'>Category</th>
									<th>Time</th>
									<th className='hide-col'>Availability</th>
								</tr>
						</thead>
						<tbody style={{width: '100%'}}>
						{this.props.events.map((ev, i) => {
							let today = new Date().getTime()
							let curr_ev_time = new Date(ev.time.replace(ev.time.substring(ev.time.indexOf('T'), ev.time.length), "")).getTime()
							let prev_ev_time = (this.props.events[i-1] ? new Date(this.props.events[i-1].time.replace(this.props.events[i-1].time.substring(this.props.events[i-1].time.indexOf('T'), this.props.events[i-1].time.length), "")).getTime() : 0)
							let diff_time = (curr_ev_time != prev_ev_time || prev_ev_time == 0 ? true : false)
							let date = new Date(curr_ev_time)
							let label = (!diff_time ? null : <tr><b>{
									(date.getUTCMonth() + 1).toString() + "/" + (date.getUTCDate()).toString() + "/" + (date.getUTCFullYear()).toString() + " " + (curr_ev_time == today ? "TODAY" : "")
								}</b></tr>);
							return (
								<>
								{label}
								<tr className='table-text' style={styles.tr} key={ev.id}>
									<td>{ev.title}</td>
									<td>{ev.host}</td>
									<td className='hide-col'>{ev.category}</td>
									<td>{parseDate(ev.time)}</td>
									<td className='hide-col'>{ev.availability}</td>
									{(this.props.authData.authToken.length > 0) && <td><button onClick={() => this.join(ev.id)}><FontAwesomeIcon icon={faCheckCircle} /></button></td>}
									{this.props.authData.userId == 69 ||  this.props.authData.userId == 46 && <td><button onClick={() => this.trash(ev.id)}>Remove</button></td>}
								</tr>
								</>
							)
						})}
						</tbody>
					</table>
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
	console.log(time)
	return time
}

const styles = {
  main:{
    margin: 'auto',
    backgroundColor: 'white',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    borderRadius: '15px',
    marginTop: '80px'
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
  table:{
  	width: '100%',
  	height: '100%',
  	marginTop: '2%',
  	marginBottom: '10%',
  },
  head:{
  	fontWeight: 'bold',
  },
   coins:{
  	left: 10,
  	top: 75,
  	position: 'absolute',
  	fontWeight: 'bold',
  	fontSize: '20px',
  }, 
  tr:{
  	width: '100%',
  },
  div:{
  	position: 'relative',
  },
}
export default Dash