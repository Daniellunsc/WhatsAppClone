import firebase from 'firebase';
import {Actions} from 'react-native-router-flux'

export const CHANGE_EMAIL = (texto) => {
    return {
        type: 'CHANGE_EMAIL',
        payload: texto
    }
}

export const CHANGE_PWD = (texto) => {
    return {
        type: 'CHANGE_PWD',
        payload: texto
    }
}

export const CHANGE_NAME = (texto) => {
    return {
        type: 'CHANGE_NAME',
        payload: texto
    }
}

export const REGISTER_USER = ({nome, email, senha}) => {
    
    return dispatch => {
        
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(user => UserSucess(dispatch))
        .catch(erro => UserFail(erro, dispatch));

    }
    
}

const UserSucess = (dispatch) => {
    dispatch({ type: 'REGISTER_USER_SUCCESS' });

    Actions.Welcome();
}

const UserFail = (error, dispatch) => {
    dispatch({ type: 'REGISTER_USER_ERROR', payload: error.message });
}