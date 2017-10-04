import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './Components/FormLogin';
import FormCadastro from './Components/FormCadastro';

export default props => (
    <Router>
        <Scene key='RootScene'>
            <Scene key='formLogin' component={FormLogin} title="Login" />
            <Scene key='formCadastro' component={FormCadastro} title="Cadastro" />
        </Scene>
    </Router>
);
