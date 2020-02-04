import React from 'react';
import { logInFunc, getEventsFunc } from './actions'
import { connect } from 'react-redux'
import Interests from './components/Interests'
import AllEvents from './components/AllEvents'
import InterestingEvents from './components/InterestingEvents'
import Header from './components/Header'
import AuthCard from './components/AuthCard'
import WelcomeCard from './components/WelcomeCard'
import {
  withRouter
} from "react-router-dom";
import { BACKEND_API_URI }from './constants'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      coins: 0,
      events: [],
      interests: [],
      interestedEvents: [],
    }
    this.trash = this.trash.bind(this)
    this.join = this.join.bind(this)
    this.updateInterests = this.updateInterests.bind(this)
  }
  

  async componentDidMount(){
    await getEvents(this.props.auth)
    .then((res) => {
      return res.json()})
    .then((json) => this.setState({
        events: [...json['events']]
    }))
    .catch((err) => {
      alert('There was an error retrieving events. ERROR: ' + err)
    })
  }

  updateInterests(interest){
    if ( this.state.interests.includes(interest.toUpperCase()) ){
     this.setState({interests: [...this.state.interests.filter(item => item !== interest.toUpperCase())]},
       () => getEvents(this.props.auth, this.state.interests)
        .then((res) => res.json())
        .then((json) => {
          if (this.state.interests.length > 0){
            this.setState({
             interestedEvents: [...json['events']]
           })}else{
           this.setState({
             interestedEvents: []
           })
         }})
        .catch((err) => {
          alert('There was an error retrieving events. ERROR: ' + err)
        })       
       )
    }else{
     this.setState({interests: [...this.state.interests, interest.toUpperCase()]},
       () => getEvents(this.props.auth, this.state.interests)
        .then((res) => res.json())
        .then((json) => {
         if(this.state.interests.length > 0){
           this.setState({
             interestedEvents: [...json['events']]
          })}else{
           this.setState({
             interestedEvents: []
           })
         }})
        .catch((err) => {
          alert('There was an error retrieving events. ERROR: ' + err)
        })       
       )
    }
  }

  join(id){
    fetch(BACKEND_API_URI + 'event', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authToken': this.props.auth.token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },      
      body: JSON.stringify({
          userId: this.props.auth.userId,
          eventId: id,
        }),     
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        events: [...json['events']],       
      })
      alert('Event joined.')
    })
    .catch((err) => alert('Failed to join event.'))
  }

  trash(id){
    fetch(BACKEND_API_URI + 'event', {
      method: 'DELETE',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'authToken': this.props.auth.token
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },      
      body: JSON.stringify({
              userId: this.props.auth.userId,
              eventId: id,
            }),     
    })
    .then((res) => res.json())
    .then((json) => {
      alert('Event deleted.')
      this.setState({
        events: [...json['events']],        
      })
    })
    .catch((err) => alert('Failed to delete event. ERROR: ') + err)
  }



  render(){
    return (
      <div className="App">
        <Header authData={this.props.auth} events={(json) => this.setState({events: json})} />
        {!this.props.auth.authenticated && <WelcomeCard />}              
        {!this.props.auth.authenticated && <AuthCard authenticate={(email, password, phone) => this.props.login(email, password, phone)} />}              
        <Interests updateInterests={(interest) => this.updateInterests(interest)} />
        <InterestingEvents authData={this.props.auth} join={(id) => this.join(id)} events={this.state.interestedEvents}/>
        <AllEvents authData={this.props.auth} join={(id) => this.join(id)} events={this.state.events}/>
      </div>
    );
  }
}

async function getEvents(authData, tags = []){
  return fetch(BACKEND_API_URI + 'events', {
    method: 'POST',
    mode: 'cors',
    headers: {
    'Content-Type': 'application/json',
    'authToken': authData.token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      tags: tags
    })
  })
}

function mapStateToProps(state){
  return {
    auth: state.authReducer
  }
}

function mapDispatchToProps(dispatch){
  return {
    login: (email, password, phone) => dispatch(logInFunc(email, password, phone)),
    getEvents: (authData, tags = []) => dispatch(getEventsFunc(authData, tags = []))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
