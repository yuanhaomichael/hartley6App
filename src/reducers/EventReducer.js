import { GET_EVENTS, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE } from '../constants'

const initialState = {
	events: []
}

export function eventsReducer(state = initialState, action){
	switch(action.type){
		case LOG_IN:
			return {
				...state,
				events: []
			}
		case LOG_IN_SUCCESS:
			return {
				...state,
				events: []
			}
		case LOG_IN_FAILURE:
			return {
				...state,
				authenticated: false,
				error: true,
				token: '',
			}
		default:
			return state
	}
}