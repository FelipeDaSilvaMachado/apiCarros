import React, { useState } from 'react';
import { styles } from './style.js';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { updateVeiculo } from '../Api';

export default function Alterar({ route, navigation }) {
  const { veiculo } = route.params;
  const [form, setForm] = useState({ ...veiculo });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.marca) {
      Alert.alert('Erro', 'Preencha o Nome e a Marca.');
      return;
    }
    await updateVeiculo(form.id, form, navigation);
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
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}