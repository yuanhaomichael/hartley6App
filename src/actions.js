import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE, GET_EVENTS, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE, BACKEND_API_URI } from './constants'

// Master Actions
export function logInFunc(email, password, phone = null){
	return (dispatch) => {
		dispatch(getAuth());
		fetch(encodeURI(BACKEND_API_URI + 'login'),
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
		      	'Content-Type': 'application/json',
		     	 //'Content-Type':'application/x-www-form-urlencoded',
		    },
		body: JSON.stringify({
			username: email,
			password: password,
			phone: phone,
		}),
		})
		.then((res) => {
			return res.json()
		})
		.then(json => {
			dispatch(getAuthSuccess(json))
		})
		.catch(err => {
			dispatch(getAuthFailure(err))
		})
	}
}

export function getEventsFunc(authData, tags = []){
	return (dispatch) => {
		dispatch(getEvents());
		fetch(BACKEND_API_URI + 'events', {
      method: 'POST',
      mode: 'cors',
      headers: {
      'Content-Type': 'application/json',
      'authToken': authData.authToken,
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        tags: tags
      })
    })
		.then((res) => {
			return res.json()
		})
		.then(json => {
			dispatch(getEventsSuccess(json))
		})
		.catch(err => {
			dispatch(getEventsFailure(err))
		})
	}
}

// Action Creators
// Auth
function getAuth(){
	return {
		type: LOG_IN,
	}
}

function getAuthSuccess(data){
	return {
		type: LOG_IN_SUCCESS,
		data
	}
}

function getAuthFailure(){
	return {
		type: LOG_IN_FAILURE
	}
}

// Events
function getEvents(){
	return {
		type: GET_EVENTS,
	}
}

function getEventsSuccess(data){
	return {
		type: GET_EVENTS_SUCCESS,
		data
	}
}

function getEventsFailure(){
	return {
		type: GET_EVENTS_FAILURE,
	}
}