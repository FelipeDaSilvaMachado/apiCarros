import React, { useState } from 'react';
import { styles } from './style.js';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { createAutomovel } from '../Api/';

export default function Cadastro({ navigation }) {
  const [form, setForm] = useState({
    nome: '',
    marca: '',
    modelo: '',
    ano: '',
    cor: '',
    descricao: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.marca) {
      Alert.alert('Erro', 'Preencha o Nome e a Marca.');
      return;
    }

    if (form.ano && isNaN(Number(form.ano))) {
      Alert.alert('Erro', 'Ano deve ser um número válido.');
      return;
    }

    try{
      await createAutomovel(form);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o automóvel. Tente novamente.');
    }
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
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={String(form.descricao || '')}
        onChangeText={(value) => handleChange('descricao', value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}