import { CHANGE_EMAIL,
    CHANGE_PWD,
    CHANGE_NAME,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    AUTH_USER,
    AUTH_USER_SUCESS,
    AUTH_USER_FAIL,
    LOADING_LOGIN, 
    LOADING_REGISTER } from '../actions/types'

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    erroCadastro: '',
    authError: '',
    loadingLogin: false,
    loadingCadastro: false,
}

export default (state = INITIAL_STATE, action) => {
    
    switch(action.type)
    {
        case CHANGE_EMAIL:
            return {
                ...state,  email: action.payload
            }
        case CHANGE_PWD:
            return {
                ...state, senha: action.payload
            }
        case CHANGE_NAME:
            return {
            ...state, nome: action.payload
        }
        case REGISTER_USER_SUCCESS:
        return {
            ...state, senha: '', nome: '', erroCadastro: '', loadingCadastro: false
        }
        case REGISTER_USER_ERROR:
            return {
                ...state, erroCadastro: action.payload, loadingCadastro: false
            }
        case AUTH_USER_SUCESS:
            return {
                ...state, ...INITIAL_STATE
            }
        case AUTH_USER_FAIL:
            return {
                ...state, authError: action.payload, loadingLogin: false,
            }
        case LOADING_LOGIN:
            return {
                ...state, loadingLogin: true,
            }
        case LOADING_REGISTER:
            return {
                ...state, loadingCadastro: true,
            }
    }
    return state;
}