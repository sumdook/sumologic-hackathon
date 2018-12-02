import {INITIAL_STATE_HYDRATE,CREATE_FOLDER,CREATE_FILE,UPDATE_FOLDER,UPDATE_FILE,DELETE_FOLDER,DELETE_FILE} from '../actions/types'

export default function(state = {}, action){
	switch(action.type){
		case INITIAL_STATE_HYDRATE:
			return action.payload;
		
		case CREATE_FOLDER:
			var newState = JSON.parse(JSON.stringify({...state}));
			var a = newState;
			if(action.path.length){
				action.path.map(item=>{
					a = a[item];
				})
			}
			a[action.name]={"Files":[]};
			localStorage.setItem('data_snapshot',JSON.stringify(newState));
			return newState;
		
		case CREATE_FILE:
			var newState = JSON.parse(JSON.stringify({...state}));
			var a = newState;
			if(action.path.length){
				action.path.map(item=>{
					a = a[item];
				})
			}
			a["Files"].push(
				{file_name: action.name, type:action.filetype||"unknown"}
			);
			localStorage.setItem('data_snapshot',JSON.stringify(newState));
			return newState;
		
		case UPDATE_FOLDER:
			var newState = JSON.parse(JSON.stringify({...state}));
			var a = newState;
			if(action.path.length){
				action.path.map(item=>{
					a = a[item];
				})
			}
			console.log(action.oldname);
			if (action.oldname !== action.newname) {
				Object.defineProperty(a, action.newname,
					Object.getOwnPropertyDescriptor(a, action.oldname));
				delete a[action.oldname];
			}
			localStorage.setItem('data_snapshot',JSON.stringify(newState));
			return newState;

		case UPDATE_FILE:
			var newState = JSON.parse(JSON.stringify({...state}));
			var a = newState;
			if(action.path.length){
				action.path.map(item=>{
					a = a[item];
				})
			}

			a["Files"].map(item=>{
				if(item["file_name"]===action.oldname)
					item["file_name"]=action.newname;
			});
			localStorage.setItem('data_snapshot',JSON.stringify(newState));
			return newState;

		case DELETE_FOLDER:
			var newState = JSON.parse(JSON.stringify({...state}));
			var a = newState;
			if(action.path.length){
				action.path.map(item=>{
					a = a[item];
				})
			}
			delete a[action.name];
			localStorage.setItem('data_snapshot',JSON.stringify(newState));
			return newState;
		case DELETE_FILE:
			var newState = JSON.parse(JSON.stringify({...state}));
			var a = newState;
			if(action.path.length){
				action.path.map(item=>{
					a = a[item];
				})
			}
			if(a["Files"].length===1){
				a["Files"].pop();
			}
			else{
				var i;
				a["Files"].map(item=>{
					if(item["file_name"]===action.name)
					i = a["Files"].indexOf(item);	
				});
				delete a["Files"][i];
			}
			return newState;
		default:
			return state;
	}
}