import React from 'react';
import './App.css';
import { logInFunc } from './actions'
import { connect } from 'react-redux'
import Interests from './components/Interests'
import AllEvents from './components/AllEvents'
import InterestingEvents from './components/InterestingEvents'
import Header from './components/Header'
import LoginCard from './components/Login'

import Dashboard from './components/Dash'
import { BACKEND_API_URI }from './constants'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      refresh: true,
      coins: 0,
      events: [],
    }

    this.trash = this.trash.bind(this)
    this.join = this.join.bind(this)
  }



  componentDidMount(){
    getEvents(this.state)
    .then((res) => res.json())
    .then((json) => this.setState({
        events: [...json['events']]
    }))
    .catch((err) => {
      alert('There was an error retrieving events. ERROR: ' + err)
    })
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



  render(){
    console.log(this.props.auth)
    return (
      <div className="App">
          {this.props.auth.authenticated && <Header authData={this.props.auth} events={(json) => this.setState({events: json})} />}
          {!this.props.auth.authenticated && <LoginCard authenticate={(email, password, phone) => this.props.login(email, password, phone)} />}
          <Interests />
          <InterestingEvents join={this.join} events={[]}/>
          <AllEvents join={(id) => this.join(id)} events={this.state.events}/>
      </div>
    );
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
function mapStateToProps(state){
  return {
    auth: state.authReducer
  }
}

function mapDispatchToProps(dispatch){
  return {
    login: (email, password) => dispatch(logInFunc(email, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
