
import {FETCH_USER_INFO} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    nome: '',
    status: ''
};

export default (state= INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type){

        case FETCH_USER_INFO:
            console.log(action.payload)
            return {...state,
                 nome:action.payload.nome,
                 status:action.payload.status,
                 email: action.payload.email}

        default:
            return state;
    }

}
