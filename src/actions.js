import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE, BACKEND_API_URI } from './constants'

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
			console.log(res)
			return res.json()
		})
		.then(json => {
			console.log(json)
			dispatch(getAuthSuccess(json))
		})
		.catch(err => {
			console.log(err)
			dispatch(getAuthFailure(err))
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