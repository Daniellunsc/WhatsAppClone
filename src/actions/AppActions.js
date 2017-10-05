import b64 from 'base-64';
import firebase from 'firebase';

import { 
    CHANGE_ADD_CONTACT_EMAIL,
    ADD_CONTACT_ERROR } from './types'

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
        let emailB64 = b64.encode(email);
        
            firebase.database().ref(`/contatos/${emailB64}`)
                .once('value')
                .then(snapshot => {
                    if(snapshot.val()){
                        
                        console.log(email) 
                        const {currentUser} = firebase.auth();
                        let emailUserB64 = b64.encode(currentUser.email);

                        firebase.database().ref(`/usuario_contatos/${emailUserB64}`)
                        .push(
                                {
                                    email, nome: 'nome contato'
                                }
                            )
                            .then(() => console.log('sucesso'))
                            .catch(erro=> console.log(erro))

                    } else {
                        dispatch(
                            {
                                type: ADD_CONTACT_ERROR,
                                payload: 'E-mail informado não corresponde a um usuário válido!'
                            }
                        )
                    }
                });
    }
}