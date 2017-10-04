import React from 'react';
import {Text, View, TextInput, Button, Image} from 'react-native';
import {connect} from 'react-redux';
import { CHANGE_EMAIL, CHANGE_PWD, CHANGE_NAME } from '../actions/AuthActions'

const FormCadastro = props => {
    return(
        <Image style={{flex:1, width: null}} source={require('../imgs/bg.png')}>
            <View style = {{flex:1, padding:10}}>
                <View style = {{flex:4, justifyContent: 'center'}}>
                    <TextInput 
                    value={props.nome} 
                    placeholder="Nome"  
                    style={{fontSize:20, height:45}}
                    onChangeText={texto => props.CHANGE_NAME(texto)}/>

                    <TextInput 
                    
                    value={props.email} 
                    placeholder="Email" 
                    style={{fontSize:20, height:45}}
                    onChangeText={texto => props.CHANGE_EMAIL(texto)}/>

                    <TextInput 

                    secureTextEntry={true}
                    value={props.senha} 
                    placeholder="Senha" 
                    style={{fontSize:20, height:45}}
                    onChangeText={texto => props.CHANGE_PWD(texto)}/>

                </View>

                <View style = {{flex:1}}>
                    <Button title="Cadastrar" color="#115E54" onPress={()=>false} />
                </View>
            </View>
        </Image>
    );
}

const mapStateToProps = state => (
    {
        email: state.AuthReducer.email,
        senha: state.AuthReducer.senha,
        nome: state.AuthReducer.nome
    }
)


export default connect(mapStateToProps, {CHANGE_NAME, CHANGE_EMAIL, CHANGE_PWD})(FormCadastro)