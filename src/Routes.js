import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './Components/FormLogin';
import FormCadastro from './Components/FormCadastro';
import Welcome from './Components/Welcome';
import Main from './Components/Main';

export default props => (
    <Router navigationBarStyle={{backgroundColor: '#115E54' }} titleStyle={{color: '#fff'}}>
        <Scene key='RootScene'>
            <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar={true}/>
            <Scene key='formCadastro' component={FormCadastro} title="Cadastro"  hideNavBar={false} />
            <Scene key='Welcome' component={Welcome} title="Welcome"  hideNavBar={true} />
            <Scene key='Main' component={Main} title="Main"  hideNavBar={true} initial/>
        </Scene>
    </Router>
);
