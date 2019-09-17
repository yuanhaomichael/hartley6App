import React from 'react';
import './App.css';
import ls from 'local-storage'
import Header from './components/Header'
import LoginCard from './components/Login'
import Dashboard from './components/Dash'
import { BACKEND_API_URI }from './constants'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      authenticated: false,
      authToken: '',
      userId: 0,
      admin: false,
      coins: 0,
      events: [],
    }

    this.trash = this.trash.bind(this)
    this.join = this.join.bind(this)
    this.authenticate = this.authenticate.bind(this)
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

  authenticate(obj){
    ls.set('hartley_email', obj.email)
    this.setState({
      authenticated: true,
      authToken: obj.access_token,
      userId: obj.user_id,
      admin: obj.admin,
      coins: obj.coins,
    })
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
              userId: this.state.userId,
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
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },      
      body: JSON.stringify({
              userId: this.state.userId,
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
    return (
      <div className="App">
          {this.state.authenticated && <Header authData={this.state} events={(json) => this.setState({events: json})}/>}
          {!this.state.authenticated && <LoginCard authenticate={this.authenticate} />}
          <Dashboard events={this.state.events} authData={this.state} join={(id) => this.join(id)} trash={(id) => this.trash(id)}/>
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
export default App;
