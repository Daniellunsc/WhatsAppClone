import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux'
import { _MODIFY_MESSAGE, _SEND_MESSAGE } from '../actions/AppActions'

class Conversa extends Component {

    _enviaMensagem(){
        const {mensagem, contatoNome, contatoEmail} = this.props;

        this.props._SEND_MESSAGE(mensagem, contatoNome, contatoEmail)
    }

    render() {
        console.log(this.props)
        return (
            <View style={{ flex: 1, backgroundColor: '#eee4dc', padding: 10 }}>
                <View style={{ flex: 1, paddingBottom: 20 }}></View>

                <View style={{ flexDirection: 'row', height: 60}}>
                    <TextInput
                        value={this.props.mensagem}
                        onChangeText={texto=> this.props._MODIFY_MESSAGE(texto)} 
                        style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }}
                    />

                    <TouchableHighlight onPress={this._enviaMensagem.bind(this)} underlayColor="#fff">
                        <Image source={require('../imgs/enviar_mensagem.png')} />
                    </TouchableHighlight>

                </View>
            </View>
        )
    }
}

mapStateToProps = state => {
    return ({
        mensagem: state.AppReducer.mensagem,
    })
}

export default connect(mapStateToProps, {_MODIFY_MESSAGE,_SEND_MESSAGE})(Conversa)