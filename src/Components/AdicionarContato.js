import React from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {connect} from 'react-redux'
import { _CHANGE_ADD_CONTACT_EMAIL, _ADD_CONTACT } from '../actions/AppActions';

const AddContato = props => (

    <View style={{flex:1, justifyContent:'center', padding:20}}>
       
       <View style={{flex:1, justifyContent:'center'}}>
            <TextInput 
            placeholder="E-mail"
            style={{fontSize:20, height: 45}}
            onChangeText={(texto)=>props._CHANGE_ADD_CONTACT_EMAIL(texto)}
            value={props.adicionar_contato_email}/>
        </View>

        <View style={{flex:1}}>
            <Button 
            title="Adicionar" 
            color="#115E54" 
            onPress={()=> props._ADD_CONTACT(props.adicionar_contato_email)} />

            <Text style={{color: '#ff0000', fontSize:20}}> {props.cadastro_resultado_error} </Text>
        </View>

    </View>
)

const mapStateToProps = state => (
    {
        adicionar_contato_email: state.AppReducer.adicionar_contato_email,
        cadastro_resultado_error: state.AppReducer.cadastro_resultado_error
    }
)



export default connect(mapStateToProps, {_CHANGE_ADD_CONTACT_EMAIL, _ADD_CONTACT})(AddContato);