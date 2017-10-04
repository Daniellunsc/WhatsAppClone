const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: ''
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
    }
    return state;
}