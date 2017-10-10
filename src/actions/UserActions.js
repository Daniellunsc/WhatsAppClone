import b64 from 'base-64';
import firebase from 'firebase';
import _ from 'lodash';
import { FETCH_USER_INFO } from './types'

export const _FETCH_USER_INFO = () => {

    const {currentUser} = firebase.auth();
    var user = {};

    return dispatch => { 

        firebase.database().ref(`/contatos/${b64.encode(currentUser.email)}`)
            .on('value', snapshot => {
                data = _.first(_.values(snapshot.val()))
                user = {
                    email: currentUser.email,
                    nome: data.nome,
                    status: data.status
                }

                console.log(user);

                dispatch({type:FETCH_USER_INFO, payload: user})
            })

    }
}