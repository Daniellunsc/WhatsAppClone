import React from 'react';
import {View, Text , StatusBar, Image, TouchableHighlight} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { _ENABLE_ADD_CONTACT } from '../actions/AppActions';
import firebase from 'firebase'


const TabBarMenu = props => (
    <View style={{backgroundColor: "#115E54", elevation:4, marginBottom:6}}>
        <StatusBar backgroundColor="#114D44" />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{height:50, justifyContent:'center'}}>
                <Text style={{color: "#fff", marginLeft:20, fontSize:20}}>WhatsApp Clone</Text>
            </View>

            <View style={{flexDirection: 'row', marginRight:20}}>
                <View style={{ justifyContent: 'center', alignItems:'center', width:50}}>
                    <TouchableHighlight
                        onPress={()=> {props._ENABLE_ADD_CONTACT() ,Actions.AdicionarContato()}}
                        underlayColor="#114D44">
                            <Image source={require('../imgs/adicionar-contato.png')}/>
                    </TouchableHighlight>
                </View>
                
                    <View  style={{ justifyContent: 'center'}} >
                    <TouchableHighlight onPress = {()=> firebase.auth().signOut().then(()=> Actions.formLogin()) }>
                        <Text style={{fontSize:20, color: '#fff'}}>Sair</Text>
                    </TouchableHighlight>
                    </View>
            </View>
        </View>
        <TabBar { ...props } style={{ backgroundColor: "#115E54", elevation:0}}/>
    </View>
);

export default connect(null, {_ENABLE_ADD_CONTACT})(TabBarMenu);