import b64 from 'base-64';
import firebase from 'firebase';
import _ from 'lodash';

import { 
    CHANGE_ADD_CONTACT_EMAIL,
    ADD_CONTACT_ERROR,
    ADD_CONTACT_SUCCESS,
    LIST_CONTACT_USER,
    MODIFY_MESSAGE,
    SEND_MESSAGE,
    LIST_CHAT_USER, 
    CLEAR_TEXT, 
    LIST_CHATS_USER } from './types'

export const _CHANGE_ADD_CONTACT_EMAIL = texto => {
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

export const _CONTACT_USER_FETCH = () => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        let email = b64.encode(currentUser.email.toLowerCase());

        firebase.database().ref(`/usuario_contatos/${email}`)
            .on("value", snapshot => {
                dispatch({type: LIST_CONTACT_USER, payload: snapshot.val()})
            })
    }
}

export const _MODIFY_MESSAGE = texto => {
    return ({
        type: MODIFY_MESSAGE,
        payload: texto
    })
}

export const _SEND_MESSAGE = (mensagem, contatoNome, contatoEmail) => {
    
    const {currentUser} = firebase.auth();
    const userEmail = currentUser.email.toLowerCase();

   
    

    return dispatch => {
        
        dispatch({type: CLEAR_TEXT})

        const UserEmailB64 = b64.encode(userEmail)
        const contatoEmailB64 = b64.encode(contatoEmail.toLowerCase())

        firebase.database().ref(`/mensagens/${UserEmailB64}/${contatoEmailB64}`)
            .push({mensagem, tipo: 'e' })
            .then(()=> {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${UserEmailB64}`)
                    .push({mensagem, tipo: 'r'})
                    .then(()=> dispatch({ type: 'xyz'}))
                    .then(()=> {
                        firebase.database().ref(`/usuario_conversas/${UserEmailB64}/${contatoEmailB64}`)
                            .set({nome: contatoNome, email: contatoEmail})
                    })
                    .then(()=> {
                        
                        firebase.database().ref(`contatos/${UserEmailB64}`)
                            .once("value")
                            .then(snapshot => {
                                
                                const dados = _.first(_.values(snapshot.val()))

                                firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${UserEmailB64}/`)
                                .set({nome: dados.nome, email: userEmail})

                               
                            }
                        )
                    }
                )
            }
        ) 
    }
}

export const _CHAT_USER_FETCH = contatoEmail => {

    const {currentUser} = firebase.auth();
    const userEmail = currentUser.email.toLowerCase();

    return dispatch => {

        const UserEmailB64 = b64.encode(userEmail)
        const contatoEmailB64 = b64.encode(contatoEmail.toLowerCase())
    
        firebase.database().ref(`/mensagens/${UserEmailB64}/${contatoEmailB64}`)
            .on("value", snapshot => {
                dispatch({ type: LIST_CHAT_USER, payload: snapshot.val() })
            })
    }

}

export const _CHATS_USER_FETCH = () => {
    const {currentUser} = firebase.auth();

    return dispatch => {
        let userEmailB64 = b64.encode(currentUser.email.toLowerCase());

        firebase.database().ref(`/usuario_conversas/${userEmailB64}`)
            .on("value", snapshot => {
                dispatch({type: LIST_CHATS_USER, payload: snapshot.val() })
            })
    }
}