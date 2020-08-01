//ACTIONS

export const ADD_PLACE = 'ADD_PLACE'


//ACTION CREATORS

//@addplace
export const addPlace = (title) =>{
    return {type: ADD_PLACE, payload:{title:title}}
}