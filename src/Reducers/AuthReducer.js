const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    erroCadastro: ''
}

export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch(action.type)
    {
        case 'CHANGE_EMAIL':
            return {
                ...state,  email: action.payload
            }
        case 'CHANGE_PWD':
            return {
                ...state, senha: action.payload
            }
        case 'CHANGE_NAME':
            return {
            ...state, nome: action.payload
        }
        case 'REGISTER_USER_SUCCESS':
        return {
            ...state, erroCadastro: ''
        }
        case 'REGISTER_USER_ERROR':
            return {
                ...state, erroCadastro: action.payload
            }
    }
    return state;
}