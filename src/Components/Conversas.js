import React, {Component} from 'react';
import {View, Text, ListView, TouchableHighlight} from 'react-native';
import { _CHATS_USER_FETCH } from '../actions/AppActions';
import {connect} from 'react-redux'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'

class Conversas extends Component {

    componentWillMount() {
        this.props._CHATS_USER_FETCH();
        this.criaFonteDeDados(this.props.conversas)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.conversas)
    }

    criaFonteDeDados (conversas )
    {
        const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2})

        this.dataSource = ds.cloneWithRows(conversas)
    }

    renderRow(conversa) {
        return (
            <TouchableHighlight onPress={()=> Actions.conversa({ 
                renderTitle: <View><Text style={{fontSize:20, color: '#fff'}}>{conversa.nome}</Text><Text style={{color: '#fff'}}>{conversa.email}</Text></View>,
                contatoNome: conversa.nome,
                contatoEmail:conversa.email}) }>
            <View style={{flex: 1, padding:20, borderBottomWidth:1, borderColor: "#ccc"}}>
                <Text style={{fontSize:25}}>{conversa.nome}</Text>
            </View>
            </TouchableHighlight>
        )
    }

    render (){
        return (
            <ListView 
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
            />
        )
    }
} 

mapStateToProps = state => {
    const conversas = _.map(state.ListChatsReducer, (val, uid) => {
        return { ...val, uid}
    });
    return {
        conversas
    }
}

export default connect(mapStateToProps, {_CHATS_USER_FETCH})(Conversas)