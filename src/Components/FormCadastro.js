import React, {Component} from 'react';
import {Text, View, TextInput, Button, Image} from 'react-native';
import {connect} from 'react-redux';
import { CHANGE_EMAIL,
         CHANGE_PWD,
         CHANGE_NAME,
         REGISTER_USER } from '../actions/AuthActions'

class FormCadastro extends Component {

    _cadastraUsuario(){

        const { nome, email, senha } = this.props;

        this.props.REGISTER_USER({nome, email, senha});
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
                        onChangeText={texto => this.props.CHANGE_NAME(texto)}/>

                        <TextInput 
                        
                        value={this.props.email} 
                        placeholder="Email"
                        placeholderTextColor="#fff"   
                        style={{fontSize:20, height:45}}
                        onChangeText={texto => this.props.CHANGE_EMAIL(texto)}/>

                        <TextInput 

                        secureTextEntry={true}
                        value={this.props.senha} 
                        placeholder="Senha"
                        placeholderTextColor="#fff"   
                        style={{fontSize:20, height:45}}
                        onChangeText={texto => this.props.CHANGE_PWD(texto)}/>

                        <Text style={{color:'#ff0000', fontSize:18}}> {this.props.erroCadastro}</Text>
                    </View>

                    <View style = {{flex:1}}>
                        <Button title="Cadastrar" color="#115E54" onPress={()=> this._cadastraUsuario()} />
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
    }
)


export default connect(mapStateToProps,{ CHANGE_NAME,
                                         CHANGE_EMAIL,
                                         CHANGE_PWD,
                                         REGISTER_USER })(FormCadastro)