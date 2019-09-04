import React from 'react';
import './App.css';
import ls from 'local-storage'
import LoginCard from './components/Login'
import Dashboard from './components/Dash'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      authenticated: false,
      authToken: '',
      userId: 0,
    }
    this.authenticate = this.authenticate.bind(this)
  }
  authenticate(obj){
    ls.set('hartley_email', obj.email)
    this.setState({
      authenticated: true,
      authToken: obj.access_token,
      userId: obj.user_id,
    })
  }


  render(){
    return (
      <div className="App">
          {!this.state.authenticated && <LoginCard authenticate={this.authenticate} />}
          <Dashboard authData={this.state} />
      </div>
    );
  }
}

export default App;
