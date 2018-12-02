import {RECENT_FILE, RECENT_FOLDER} from '../actions/types';

export default function(state = [], action){
	switch(action.type){
		case RECENT_FOLDER:
			[...state, {doc:'folder', name:action.name,path:action.path}]
		case RECENT_FILE:
			[...state, {doc:'file', name:action.name,path:action.path}]
		default:
			return state;
	}
}

