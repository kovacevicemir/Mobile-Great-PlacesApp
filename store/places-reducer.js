//REDUCER
import Place from '../models/Place'
import { ADD_PLACE, SET_PLACES} from "./places-actions";



const initialState ={
    places: []
}

export default (state = initialState, action) =>{
    switch (action.type) {
        case SET_PLACES:
            return{
                places: action.payload
            }

        case ADD_PLACE:
            const newPlace = new Place(
                action.payload.id,
                action.payload.title,
                action.payload.image,
                action.payload.address,
                action.payload.coords.lat,
                action.payload.coords.lng,

            )
            const updated_places = state.places.concat(newPlace)
            return {
                places:updated_places
            }

        
        default:
            return state;
    }
}