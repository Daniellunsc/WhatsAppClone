import {CHANGE_ADD_CONTACT_EMAIL, ADD_CONTACT_ERROR} from '../actions/types'

const INITIAL_STATE = {
    adicionar_contato_email: '',
    cadastro_resultado_error: ''
};

export default (state= INITIAL_STATE, action) => {

    switch(action.type){
        case CHANGE_ADD_CONTACT_EMAIL:
            return { ...state, adicionar_contato_email: action.payload}
        case ADD_CONTACT_ERROR:
            return { ...state, cadastro_resultado_error: action.payload}

        default:
            return state;
    }

}
