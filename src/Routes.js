import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './Components/FormLogin';
import FormCadastro from './Components/FormCadastro';
import Welcome from './Components/Welcome';
import Main from './Components/Main';
import AdicionarContato from './Components/AdicionarContato';
import Conversa from './Components/Conversa';

export default props => (
    <Router navigationBarStyle={{backgroundColor: '#115E54' }} titleStyle={{color: '#fff'}}>
        <Scene key='RootScene'>
            <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar={true}/>
            <Scene key='formCadastro' component={FormCadastro} title="Cadastro"  hideNavBar={false} />
            <Scene key='Welcome' component={Welcome} title="Welcome"  hideNavBar={true} />
            <Scene key='Main' component={Main} title="Main"  hideNavBar={true}/>
            <Scene key='AdicionarContato' component={AdicionarContato} title="Adicionar Contato"  hideNavBar={false}/>
            <Scene key='conversa' component={Conversa} title="Conversa"  hideNavBar={false}/>
        </Scene>
    </Router>
);
