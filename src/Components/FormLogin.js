import React, {Component} from 'react';
import {Text, View, TextInput, Button,  TouchableHighlight, Image, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { _CHANGE_EMAIL, _CHANGE_PWD, _AUTH_USER } from '../actions/AuthActions'

class formLogin extends Component  {

    _auth_user(){
        const {email, senha} = this.props;

        this.props._AUTH_USER({email, senha});
    }

    renderBtnAcessar(){

        if(this.props.loadingLogin){
            return(
                <ActivityIndicator size="large"/>
            )
        }
        return (
            <Button title="Acessar" color='#115E54' onPress={()=> this._auth_user()}/>
        )
    }

    render(){
        return (
            <Image style={{flex:1, width: null}} source={require('../imgs/bg.png')}>
                <View style={{ flex:1, padding:10}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:25, color:"#fff"}}>WhatsApp Clone</Text>
                    </View>
                    <View style={{flex:2}}>

                        <TextInput value={this.props.email} 
                        style={{fontSize:20, height:45}}
                        placeholder="E-mail"
                        placeholderTextColor="#fff"  
                        onChangeText = {texto => this.props._CHANGE_EMAIL(texto)}/>

                        <TextInput 
                        secureTextEntry={true}
                        value={this.props.senha}
                        style={{fontSize:20, height:45}}
                        placeholder="Senha"
                        placeholderTextColor="#fff"   
                        onChangeText = {texto => this.props._CHANGE_PWD(texto)}/>

                    <Text style={{color:'#ff0000', fontSize:18}}> {this.props.authError}</Text>

                    <TouchableHighlight onPress={() => Actions.formCadastro() }>
                        <Text style={{ fontSize: 20, color:"#fff" }}>Ainda não tem cadastro? Cadastre-se</Text>
                    </TouchableHighlight>

                    </View>
                    <View style={{flex:2}}>
                        {this.renderBtnAcessar()} 
                    </View>
                </View>
            </Image>
        );
    }
}

const mapStateToprops = state => (
    {
        email: state.AuthReducer.email,
        senha: state.AuthReducer.senha,
        authError: state.AuthReducer.authError,
        loadingLogin: state.AuthReducer.loadingLogin,
    }
)

export default connect(mapStateToprops, {_CHANGE_EMAIL, _CHANGE_PWD, _AUTH_USER})(formLogin)