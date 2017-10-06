import React, { Component } from 'react';
import {View, Text, ListView} from 'react-native';
import {connect} from 'react-redux'
import { _CONTACT_USER_FETCH } from '../actions/AppActions'
import _ from 'lodash'

class Contatos extends Component { 
    

    componentWillMount(){
        this.props._CONTACT_USER_FETCH()
        this.criaFonteDeDados(this.props.contatos)
        console.log(this.props.contatos)
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

    render() {
        return (
            <ListView
                enableEmptySections 
                dataSource={this.fonteDeDados}
                renderRow={data => (
                    <View style={{flex:1, padding:20, borderBottomWidth:1, color: '#CCC'}}> 
                        
                        <Text style={{fontSize:20}}>{data.nome}</Text>
                        <Text style={{fontSize:18}}>{data.email}</Text>

                    </View>
                        )
                    
                }
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