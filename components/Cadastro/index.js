import React, { useState } from 'react';
import { styles } from './style.js';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { createVeiculo } from '../Api/';

export default function Cadastro({ navigation }) {
  const [form, setForm] = useState({
    nome: '',
    marca: '',
    modelo: '',
    ano: '',
    cor: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.marca) {
      Alert.alert('Erro', 'Preencha o Nome e a Marca.');
      return;
    }
    await createVeiculo(form);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do veiculo"
        value={String(form.nome || '')}
        onChangeText={(value) => handleChange('nome', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={String(form.marca || '')}
        onChangeText={(value) => handleChange('marca', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={String(form.modelo || '')}
        onChangeText={(value) => handleChange('modelo', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano"
        keyboardType="numeric"
        value={String(form.ano || '')}
        onChangeText={(value) => handleChange('ano', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cor"
        value={String(form.cor || '')}
        onChangeText={(value) => handleChange('cor', value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}