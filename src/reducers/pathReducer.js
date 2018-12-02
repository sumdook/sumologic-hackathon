import {GOTO_FOLDER,GO_BACK,GO_BACK_TO,GO_BACK_TO_HOME} from '../actions/types'

export default function(state = [], action){
	switch(action.type){
        case GOTO_FOLDER:
            return [...state, action.payload];
        case GO_BACK:
            var newState = state.slice();
            newState.pop();
            return newState;
        case GO_BACK_TO:
            var newState = state.slice();
            while(newState[newState.length-1]!==action.payload )newState.pop();
            return newState;
        case GO_BACK_TO_HOME:{
            return [];
        }
		default:
			return state;
	}
}

