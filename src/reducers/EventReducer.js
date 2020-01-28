import { GET_EVENTS, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE } from '../constants'

const initialState = {
  events: [],
  interests: [],
}

export function eventsReducer(state = initialState, action){
	switch(action.type){
		case GET_EVENTS:
			return {
				...state,
				events: []
			}
		case GET_EVENTS_SUCCESS:
			return {
				...state,
				events: []
			}
		case GET_EVENTS_FAILURE:
			return {
				...state,
				events: [],
			}
		default:
			return state
	}
}