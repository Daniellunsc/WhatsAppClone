import b64 from 'base-64';
import firebase from 'firebase';
import _ from 'lodash';

import { 
    CHANGE_ADD_CONTACT_EMAIL,
    ADD_CONTACT_ERROR, ADD_CONTACT_SUCCESS } from './types'

export const _CHANGE_ADD_CONTACT_EMAIL = texto => {
    console.log('chegamos aqui');
    console.log(texto)
    return {
        type: CHANGE_ADD_CONTACT_EMAIL,
        payload: texto
    }
}

export const _ADD_CONTACT = email => {

    return dispatch => {
        email_lower_case = email.toLowerCase();
        let emailB64 = b64.encode(email_lower_case);
        firebase.database().ref(`/contatos/${emailB64}`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()){
                        
                    const dadosUsuario = _.first(_.values(snapshot.val()));

                    const {currentUser} = firebase.auth();
                    let emailUserB64 = b64.encode(currentUser.email.toLowerCase());

                    firebase.database()
                        .ref(`/usuario_contatos/${emailUserB64}`)
                        .push({email: email.toLowerCase(), nome: dadosUsuario.nome})
                        .then(() => _ADD_CONTACT_SUCCESS(dispatch))
                        .catch(erro=> _ADD_CONTACT_ERROR(error.message, dispatch))
                } 
                else
                {
                    dispatch({
                    type: ADD_CONTACT_ERROR,
                    payload: 'E-mail informado não corresponde a um usuário válido!'}
                )
                }
            }
        );
    }
}

const _ADD_CONTACT_SUCCESS = dispatch => (
    dispatch({
        type: ADD_CONTACT_SUCCESS,
        payload: true
    })
)



const _ADD_CONTACT_ERROR = (error, dispatch) => (
    dispatch(
        {
            type: ADD_CONTACT_ERROR,
            payload: error
        }
    )
)

export const _ENABLE_ADD_CONTACT = () => (
    {
        type: ADD_CONTACT_SUCCESS,
        payload: false
    }
)