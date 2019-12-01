import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './configureStore'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

const ReduxWrapper = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route path="/">
							<App />
            </Route>
            <Route path="/terms">
              <div>
                terms
              </div>
            </Route>
          </Switch>
        </Router>		
			</PersistGate>
		</Provider>       
		)
}

withRouter(ReduxWrapper)

ReactDOM.render(<ReduxWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
