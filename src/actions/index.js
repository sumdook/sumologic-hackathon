import {INITIAL_STATE_HYDRATE,GOTO_FOLDER,GO_BACK,GO_BACK_TO,GO_BACK_TO_HOME,CREATE_FOLDER,CREATE_FILE,UPDATE_FOLDER,UPDATE_FILE,DELETE_FOLDER,DELETE_FILE,RECENT_FOLDER,RECENT_FILE} from './types';

export function initialHydrate(data){
    return{
        type:INITIAL_STATE_HYDRATE,
        payload:data
    }
}

export function gotoFolder(folder_name){
    return{
        type:GOTO_FOLDER,
        payload:folder_name
    }
}

export function goBack(){
    return {
        type:GO_BACK
    }
}

export function goBackto(folder){
    return {
        type:GO_BACK_TO,
        payload:folder
    }
}

export function goBacktoHome(){
    return {
        type:GO_BACK_TO_HOME
    }
}

export function createFolder(name,path){
    return{
        type:CREATE_FOLDER,
        name,path
    }
}

export function createFile(name,filetype,path){
    return{
        type: CREATE_FILE,
        name,filetype,path
    }
}

export function updateFolder(oldname,newname,path){
    return{
        type: UPDATE_FOLDER,
        oldname,newname,path
    }
}

export function updateFile(oldname,newname,path){
    return{
        type: UPDATE_FILE,
        oldname,newname,path
    }
}

export function deleteFolder(name,path){
    return{
        type: DELETE_FOLDER,
        name,path
    }
}

export function deleteFile(name,path){
    return{
        type: DELETE_FILE,
        name,path
    }
}
export function recentFolder(name,path){
    return{
        type: RECENT_FOLDER,
        name,path
    }
}

export function recentFile(name,path){
    return{
        type: RECENT_FILE,
        name,path
    }
}


