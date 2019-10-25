import React from 'react'
import EventCard from './EventCard'

export default class InterestingEvents extends React.Component{

	render(){
		return(
			<div style={styles.container}>
				<div className="subtleShadow" style={styles.header}>
					Recommended
				</div>
				<div>
				    {this.props.events.map((ev, i)=>{
				      let today = new Date().getTime()
			        let curr_ev_time = new Date(ev.time.replace(ev.time.substring(ev.time.indexOf('T'), ev.time.length), "")).getTime()
			        let prev_ev_time = (this.props.events[i-1] ? new Date(this.props.events[i-1].time.replace(this.props.events[i-1].time.substring(this.props.events[i-1].time.indexOf('T'), this.props.events[i-1].time.length), "")).getTime() : 0)
			        let diff_time = (curr_ev_time != prev_ev_time || prev_ev_time == 0 ? true : false)
			        let date = new Date(curr_ev_time)
			        let label = (!diff_time ? null : <div style={{width: '35vw', backgroundColor: 'white', borderRadius: 12, margin: 12, padding: 10}}><b>{
			            (date.getUTCMonth() + 1).toString() + "/" + (date.getUTCDate()).toString() + "/" + (date.getUTCFullYear()).toString() + " " + (curr_ev_time == today ? "TODAY" : "")
			          }</b></div>)            
				      return(
				        <React.Fragment>
				          {label}
				          <EventCard ev={ev} />
				        </React.Fragment>
				      )
				    })}
				 </div>				
			</div>
		)
	}
}

const styles = {
	container: {
		width: '100%',
		height: '100%',
		marginTop: 50,
		marginBottom: 50,
	},
	header: {
		margin: 'auto',
		width: '35%',
		backgroundColor: 'white',
		borderRadius: '8px',
		padding: 15
	},
}