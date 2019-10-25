import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../constants'

// CHANGE BACK
const initialState = {
	authenticated: false,
	error: false,
	token: '',
	admin: false,
	userId: '',
	coins: 0
}

export function authReducer(state = initialState, action){
	switch(action.type){
		case LOG_IN:
			return {
				...state,
				authenticated: false,
				token: '',
			}
		case LOG_IN_SUCCESS:
			return {
				...state,
				authenticated: true,
				token: action.data.access_token,
				admin: action.data.admin,
				userId: action.data.access_token[0],
				coins: action.data.coins
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