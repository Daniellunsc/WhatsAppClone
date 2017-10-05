import firebase from 'firebase';
import {Actions} from 'react-native-router-flux'
import b64 from 'base-64';
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
         LOADING_REGISTER } from './types'

export const _CHANGE_EMAIL = (texto) => {
    return {
        type: CHANGE_EMAIL,
        payload: texto
    }
}

export const _CHANGE_PWD = (texto) => {
    return {
        type: CHANGE_PWD,
        payload: texto
    }
}

export const _CHANGE_NAME = (texto) => {
    return {
        type: CHANGE_NAME,
        payload: texto
    }
}

export const _REGISTER_USER = ({nome, email, senha}) => {
    
    return dispatch => {

        dispatch({
            type: LOADING_REGISTER
        })
        
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(user => {

            //user.sendEmailVerification();
            email_lower_case = email.toLowerCase();
                        
            let emailB64 = b64.encode(email_lower_case);

            firebase.database().ref(`/contatos/${emailB64}`)
                .push({nome}).then(value => _REGISTER_USER_SUCCESS(dispatch));
        })
        .catch(erro => _REGISTER_USER_ERROR(erro, dispatch));

    }
    
}

const _REGISTER_USER_SUCCESS = (dispatch) => {
    dispatch({ type: REGISTER_USER_SUCCESS });

    Actions.Welcome();
}

const _REGISTER_USER_ERROR = (error, dispatch) => {
    dispatch({ type: REGISTER_USER_ERROR, payload: error.message });
}

export const _AUTH_USER = ({email, senha}) => {
    return dispatch => {

        dispatch({
            type: LOADING_LOGIN
        })

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => _AUTH_USER_SUCESS(dispatch))
            .catch(error => _AUTH_USER_FAIL(error, dispatch));

    }
}

const _AUTH_USER_SUCESS = (dispatch) => {
    dispatch (
        {
        type: AUTH_USER_SUCESS
        }
    )

    Actions.Main();
}


const _AUTH_USER_FAIL = (error, dispatch) => {
    dispatch (
        {
        type: AUTH_USER_FAIL,
        payload: error.message
        }
    )
}