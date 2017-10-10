import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import {connect} from 'react-redux'
import {_FETCH_USER_INFO} from '../actions/UserActions'

class User_Profile extends Component {

    componentDidMount(){
        this.props._FETCH_USER_INFO()
    }

    render(){
        //TODO - estilizar melhor, exibir os outros dados e habilitar a edicao dos mesmos
        return(
            <View style={{flex:1, padding:20}}>
                <View style={{justifyContent: 'center'}}>
                    <Text style={{fontSize:20}}>Nome</Text>
                    <TextInput value={this.props.nome}/>
                </View>
            </View>
        )
    }
}

mapStateToProps = state => {
    console.log(state)
    return {
        nome: state.UserDataReducer.nome,
        email: state.UserDataReducer.email,
        status: state.UserDataReducer.status
    }
}

export default connect(mapStateToProps, {_FETCH_USER_INFO})(User_Profile)