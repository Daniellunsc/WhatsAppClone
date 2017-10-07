import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableHighlight, ListView } from 'react-native';
import _ from 'lodash'
import {connect} from 'react-redux'
import { _MODIFY_MESSAGE, _SEND_MESSAGE, _CHAT_USER_FETCH } from '../actions/AppActions'

class Conversa extends Component {

    componentWillMount(){
        this.props._CHAT_USER_FETCH(this.props.contatoEmail)
        this.criaFonteDeDados(this.props.conversa)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.contatoEmail != nextProps.contatoEmail)
        {
            this.props._CHAT_USER_FETCH(nextProps.contatoEmail)
        }
        this.criaFonteDeDados(nextProps.conversa)
    }

    criaFonteDeDados(conversa) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1!==r2 })

        this.dataSource = ds.cloneWithRows(conversa);
    }

    _enviaMensagem(){
        const {mensagem, contatoNome, contatoEmail} = this.props;

        this.props._SEND_MESSAGE(mensagem, contatoNome, contatoEmail)
    }

    renderRow(text) {

        if(text.tipo == 'e')
        {
            return (
                <View style={{alignItems: 'flex-end', marginTop:5, marginBottom:5, marginLeft:40}}>
                    <Text style={{fontSize: 18, color: '#000', padding: 10, backgroundColor: '#dbf5b4', elevation:1}}>{text.mensagem}</Text>
                </View>
            )
        }

        return (
            <View style={{alignItems: 'flex-start', marginTop:5, marginBottom:5, marginRight:40}}>
                    <Text style={{fontSize: 18, color: '#000', padding: 10, backgroundColor: '#f7f7f7', elevation:1}}>{text.mensagem}</Text>
                </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eee4dc', padding: 10 }}>
                <View style={{ flex: 1, paddingBottom: 20 }}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </View>
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

    const conversa = _.map(state.ListChatReducer, (val, uid) => {
        return {...val, uid}
    });

    return ({
        conversa,
        mensagem: state.AppReducer.mensagem,
    })
}

export default connect(mapStateToProps, {_MODIFY_MESSAGE,_SEND_MESSAGE, _CHAT_USER_FETCH})(Conversa)