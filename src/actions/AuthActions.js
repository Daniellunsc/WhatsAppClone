import firebase from 'firebase';
import {Actions} from 'react-native-router-flux'
import b64 from 'base-64';

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
        .then(user => {

            //user.sendEmailVerification();
            
            let emailB64 = b64.encode(email);

            firebase.database().ref(`/contatos/${emailB64}`)
                .push({nome}).then(value => REGISTER_USER_SUCCESS(dispatch));
        })
        .catch(erro => REGISTER_USER_ERROR(erro, dispatch));

    }
    
}

const REGISTER_USER_SUCCESS = (dispatch) => {
    dispatch({ type: 'REGISTER_USER_SUCCESS' });

    Actions.Welcome();
}

const REGISTER_USER_ERROR = (error, dispatch) => {
    dispatch({ type: 'REGISTER_USER_ERROR', payload: error.message });
}

export const AUTH_USER = ({email, senha}) => {
    return dispatch => {

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => AUTH_USER_SUCESS(dispatch))
            .catch(error => AUTH_USER_FAIL(error, dispatch));

    }
}

const AUTH_USER_SUCESS = (dispatch) => {
    dispatch (
        {
        type: 'AUTH_USER_SUCESS'
        }
    )

    Actions.Main();
}


const AUTH_USER_FAIL = (error, dispatch) => {
    dispatch (
        {
        type: 'AUTH_USER_FAIL',
        payload: error.message
        }
    )
}