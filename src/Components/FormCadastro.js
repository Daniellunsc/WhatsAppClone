import React, {Component} from 'react';
import {Text, View, TextInput, Button, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import { _CHANGE_EMAIL,
         _CHANGE_PWD,
         _CHANGE_NAME,
         _REGISTER_USER } from '../actions/AuthActions'

class FormCadastro extends Component {

    _cadastraUsuario(){

        const { nome, email, senha } = this.props;

        this.props._REGISTER_USER({nome, email, senha});
    }

    renderBtnCadastro(){
        if(this.props.loadingCadastro)
        {
            return(<ActivityIndicator size="large" />)
        }
        return(
            <Button title="Cadastrar" color="#115E54" onPress={()=> this._cadastraUsuario()} />
        )
    }

    render(){
        return(
            <Image style={{flex:1, width: null}} source={require('../imgs/bg.png')}>
                <View style = {{flex:1, padding:10}}>
                    <View style = {{flex:4, justifyContent: 'center'}}>
                        <TextInput 
                        value={this.props.nome} 
                        placeholder="Nome"
                        placeholderTextColor="#fff"  
                        style={{fontSize:20, height:45}}
                        onChangeText={texto => this.props._CHANGE_NAME(texto)}/>

                        <TextInput 
                        
                        value={this.props.email} 
                        placeholder="Email"
                        placeholderTextColor="#fff"   
                        style={{fontSize:20, height:45}}
                        onChangeText={texto => this.props._CHANGE_EMAIL(texto)}/>

                        <TextInput 

                        secureTextEntry={true}
                        value={this.props.senha} 
                        placeholder="Senha"
                        placeholderTextColor="#fff"   
                        style={{fontSize:20, height:45}}
                        onChangeText={texto => this.props._CHANGE_PWD(texto)}/>

                        <Text style={{color:'#ff0000', fontSize:18, backgroundColor: 'transparent'}}> {this.props.erroCadastro}</Text>
                    </View>

                    <View style = {{flex:1}}>
                        {this.renderBtnCadastro()}
                    </View>
                </View>
            </Image>
        );
    }
}

const mapStateToProps = state => (
    {
        email: state.AuthReducer.email,
        senha: state.AuthReducer.senha,
        nome: state.AuthReducer.nome,
        erroCadastro: state.AuthReducer.erroCadastro,
        loadingCadastro: state.AuthReducer.loadingCadastro,
    }
)


export default connect(mapStateToProps,{ _CHANGE_NAME,
                                         _CHANGE_EMAIL,
                                         _CHANGE_PWD,
                                         _REGISTER_USER })(FormCadastro)