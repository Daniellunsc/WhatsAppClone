import {CHANGE_ADD_CONTACT_EMAIL, ADD_CONTACT_ERROR, ADD_CONTACT_SUCCESS, MODIFY_MESSAGE, SEND_MESSAGE,CLEAR_TEXT} from '../actions/types'

const INITIAL_STATE = {
    adicionar_contato_email: '',
    cadastro_resultado_error: '',
    cadastro_resultado_inclusao: false,
    mensagem: ''
};

export default (state= INITIAL_STATE, action) => {

    switch(action.type){
        case CHANGE_ADD_CONTACT_EMAIL:
            return { ...state, adicionar_contato_email: action.payload}
        case ADD_CONTACT_ERROR:
            return { ...state, cadastro_resultado_error: action.payload}
        case ADD_CONTACT_SUCCESS:
            return { ...state, adicionar_contato_email:'', cadastro_resultado_inclusao: action.payload}
        case MODIFY_MESSAGE:
            return {...state, mensagem: action.payload}
        case CLEAR_TEXT:
            return { ...state, mensagem: ''}

        default:
            return state;
    }

}
