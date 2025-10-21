import React, { useState, useEffect } from 'react';
import { styles } from './style.js';
import { View, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { fetchAutomoveis, deleteAutomovel } from '../../components/Api/index.js';

export default function Home({ navigation }) {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    fetchAutomoveis(setRegistros);
  }, [navigation]);

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja deletar este item?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: async () => {
            try {
              await deleteAutomovel(id);
              const novosRegistros = await fetchAutomoveis();
              setRegistros(novosRegistros);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível deletar o veículo.');
            }
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={registros}
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
                  onPress={() => navigation.navigate('Alterar', { automovel: item })}
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