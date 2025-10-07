import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "../../screens/Home";
import Cadastro from "../Cadastro";
import Alterar from "../Alterar";
import { alinhaTitulo } from '../../alinhaTitulo';

const Stack = createStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={alinhaTitulo} initialRouteName="Home" >
        <Stack.Screen name="Home" component={Home} options={{ title: 'Lista de Veiculos' }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastrar Veiculo' }} />
        <Stack.Screen name="Alterar" component={Alterar} options={{ title: 'Alterar Veiculo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}