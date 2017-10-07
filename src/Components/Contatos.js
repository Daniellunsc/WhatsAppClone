import React, { Component } from 'react';
import {View, Text, ListView, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux'
import { _CONTACT_USER_FETCH } from '../actions/AppActions'
import {Actions} from 'react-native-router-flux'
import _ from 'lodash'

class Contatos extends Component { 
    

    componentWillMount(){
        this.props._CONTACT_USER_FETCH()
        this.criaFonteDeDados(this.props.contatos)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.contatos)
    }

    criaFonteDeDados(contatos) {
        const ds = new ListView.DataSource({ 
            rowHasChanged : (r1, r2) => r1 !== r2
        })

        this.fonteDeDados =  ds.cloneWithRows(contatos)
        console.log(this.fonteDeDados)
    }

    renderRow(contato) {
        return (
            //TODO : criar componente separado para exibicicao do título
            <TouchableHighlight onPress={()=> Actions.conversa({ 
                renderTitle: <View><Text style={{fontSize:20, color: '#fff'}}>{contato.nome}</Text><Text style={{color: '#fff'}}>{contato.email}</Text></View>,
                contatoNome: contato.nome,
                 contatoEmail:contato.email}) }>
                <View style={{flex:1, padding:20, borderBottomWidth:1, backgroundColor: '#CCC'}}> 
                    <Text style={{fontSize:20}}>{contato.nome}</Text>
                    <Text style={{fontSize:18}}>{contato.email}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <ListView
                enableEmptySections 
                dataSource={this.fonteDeDados}
                renderRow={data => this.renderRow(data)}
                >
            </ListView>
        )
    }
}

masStateToProps = state => {
    
    const contatos = _.map(state.ListContactsReducer, (val, uid)=> {
        return {...val, uid}
    })

    return {
        contatos
    }

}

export default connect(masStateToProps, {_CONTACT_USER_FETCH})(Contatos)