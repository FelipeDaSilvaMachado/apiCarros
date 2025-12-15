import React, { useState } from 'react';
import { styles } from './style.js';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { createVeiculo } from '../Api/index';
import { Picker } from '@react-native-picker/picker';

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
    await createVeiculo(form);
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
      <View
        style={styles.viewPicker}
      >
        <Picker
          style={styles.picker}
          selectedValue={form.modelo}
          onValueChange={(itemValue) => handleChange('modelo', itemValue)}
        >
          <Picker.Item label="Selecione..." value="selecione" />
          <Picker.Item label="Hatch" value="Hatch" />
          <Picker.Item label="Sedan" value="Sedan" />
          <Picker.Item label="SUV" value="SUV" />
          <Picker.Item label="Picape" value="Picape" />
          <Picker.Item label="Minivan" value="Minivan" />
          <Picker.Item label="Esportivo" value="Esportivo" />
        </Picker>
      </View>
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
      <TouchableOpacity style={styles.button} onPress={async() => {
          await handleSubmit();
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}