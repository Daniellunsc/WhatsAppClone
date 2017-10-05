import React, { Component } from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {connect} from 'react-redux'
import { _CHANGE_ADD_CONTACT_EMAIL, _ADD_CONTACT } from '../actions/AppActions';

class AddContato extends Component {

    renderAdicionarContato(){
        if(!this.props.cadastro_resultado_inclusao)
        {
            return(
                <View style={{flex: 1}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <TextInput 
                        placeholder="E-mail"
                        style={{fontSize:20, height: 45}}
                        onChangeText={(texto)=>this.props._CHANGE_ADD_CONTACT_EMAIL(texto)}
                        value={this.props.adicionar_contato_email}/>
                    </View>

                    <View style={{flex:1}}>
                        <Button 
                        title="Adicionar" 
                        color="#115E54" 
                        onPress={()=> this.props._ADD_CONTACT(this.props.adicionar_contato_email)} />

                        <Text style={{color: '#ff0000', fontSize:20}}> {this.props.cadastro_resultado_error} </Text>
                    </View>
                </View>

           )
        }else {
            return(
            <View>
                <Text style={{fontSize:20}}> Cadastro Realizado Com Sucesso !</Text>
            </View>
            )
        }
    }

    render(){ 
        return(
            <View style={{flex:1, justifyContent:'center', padding:20}}>
                {this.renderAdicionarContato()}
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        adicionar_contato_email: state.AppReducer.adicionar_contato_email,
        cadastro_resultado_error: state.AppReducer.cadastro_resultado_error,
        cadastro_resultado_inclusao : state.AppReducer.cadastro_resultado_inclusao
    }
)



export default connect(mapStateToProps, {_CHANGE_ADD_CONTACT_EMAIL, _ADD_CONTACT})(AddContato);