import React from 'react';
import {Text, View, TextInput, Button,  TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { CHANGE_EMAIL, CHANGE_PWD } from '../actions/AuthActions'

const formLogin = props => 
{

        return (
            <Image style={{flex:1, width: null}} source={require('../imgs/bg.png')}>
                <View style={{ flex:1, padding:10}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:25}}>WhatsApp Clone</Text>
                    </View>
                    <View style={{flex:2}}>

                        <TextInput value={props.email} 
                        style={{fontSize:20, height:45}}
                        placeholder="E-mail"
                        onChangeText = {texto => props.CHANGE_EMAIL(texto)}/>

                        <TextInput 
                        secureTextEntry={true}
                        value={props.senha}
                        style={{fontSize:20, height:45}}
                        placeholder="Senha" 
                        onChangeText = {texto => props.CHANGE_PWD(texto)}/>

                    <TouchableHighlight onPress={() => Actions.formCadastro() }>
                        <Text style={{ fontSize: 20 }}>Ainda não tem cadastro? Cadastre-se</Text>
                    </TouchableHighlight>
                    </View>
                    <View style={{flex:2}}>
                        <Button title="Acessar" color='#115E54' onPress={()=> false}/>
                    </View>
                </View>
            </Image>
        );
}

const mapStateToProps = state => (
    {
        email: state.AuthReducer.email,
        senha: state.AuthReducer.senha
    }
)

export default connect(mapStateToProps, {CHANGE_EMAIL, CHANGE_PWD})(formLogin)