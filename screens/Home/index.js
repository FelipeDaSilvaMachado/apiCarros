import React, { useState, useEffect } from 'react';
import { styles } from './style.js';
import { View, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { fetchVeiculo, deleteVeiculo } from '../../components/Api';

export default function Home({ navigation }) {
  const [registro, setRegistros] = useState([]);

  useEffect(() => {
    fetchVeiculo(setRegistros);
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja deletar este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deletar', onPress: () => deleteVeiculo(id, setRegistros) },
      ]
    );
  };
  // const registros = [
  //   {
  //     id: 1,
  //     nome: 'XC60',
  //     marca: 'Volvo',
  //     modelo: 'SUV',
  //     ano: 2026,
  //     cor: 'Branca',
  //     descricao: 'SUV de elegancia, seguranca e conforto, o volvo XC60 de motor 2.0 é um carro exemplar para a família',
  //   },
  // ];

  return (
    <View style={styles.container}>
      <FlatList
        data={registro}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              {/* Coluna da esquerda: texto */}
              <View style={styles.infoColumn}>
                <Text style={styles.title}>Nome: {item.nome}</Text>
                <Text>Marca: {item.marca}</Text>
                <Text>Modelo: {item.modelo}</Text>
                <Text>Ano: {item.ano}</Text>
                <Text>Cor: {item.cor}</Text>
                <Text>Descrição: {item.descricao}</Text>
              </View>

              {/* Coluna da direita: botões */}
              <View style={styles.actionsColumn}>
                <IconButton
                  icon="pencil"
                  size={24}
                  iconColor="#3498db"
                  onPress={() => navigation.navigate('Alterar', { veiculo: item })}
                />
                <IconButton
                  icon="delete"
                  size={24}
                  iconColor="#e74c3c"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </View>
          </Card>
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}