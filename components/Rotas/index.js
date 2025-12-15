import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../SplashScreen/SplashScreen';
import CadastroUsuario from '../CadastroUsuario/CadastroUsuario';
import Login from '../Login/Login';
import Perfil from '../Perfil/Perfil';
import Home from "../../screens/Home";
import Cadastro from "../Cadastro";
import Alterar from "../Alterar";

const Stack = createStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ title: 'Cadastre-se' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Faça seu Login', headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Lista de Veiculos' }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastrar Veiculo' }} />
        <Stack.Screen name="Alterar" component={Alterar} options={{ title: 'Alterar Veiculo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}