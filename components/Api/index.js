import { Alert } from 'react-native';
const API_URL1 = 'https://apiautomoveis.webapptech.site/api/';
const API_URL = 'https://apiautomoveis.webapptech.site/api/automoveis/';

export const fetchAutomoveis = async (setRegistros) => {
  try {
    const response = await fetch(API_URL1);
    if (!response.ok) {
      throw new Error('Erro ao buscar os automóveis');
    }
    const data = await response.json();
    console.log('Automóveis recebidos da API:', data);
    // setRegistros(data.data);
    return data.data || data;
  } catch (error) {
    console.error('Erro ao buscar o automóvel:', error);
    throw error;
  }
};

export const createAutomovel = async (automovelData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(automovelData),
    });
 
    // Verifica se a API retornou status 204 (sem conteúdo)
    if (response.status === 204) {
      Alert.alert('Sucesso!', 'Cadastro realizado!');
      return {};
    }
 
    // Caso a API retorne conteúdo, tentamos converter para JSON
    const textResponse = await response.text();
    console.log('Resposta bruta da API:', textResponse);
    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      console.warn('A resposta não é um JSON válido.');
      responseData = null;
    }
 
    if (!response.ok || !responseData) {
      throw new Error(responseData?.message || 'Erro desconhecido na API');
    }
    return responseData;
  } catch (error) {
    console.error('Erro ao cadastrar o automóvel:', error.message);
    Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
    return null;
  }
};

export const deleteAutomovel = async (automovelId, setRegistros) => {
  try {
    const response = await fetch(`${API_URL}${automovelId}`, {
      method: 'DELETE',
    });

    // Verifica se a resposta foi bem-sucedida
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.success) {
        Alert.alert('Sucesso!', responseData.message);
        // Atualiza a lista localmente
        setRegistros((prevRegistros) => {
          const novaLista = prevRegistros.filter(
            (automovel) => automovel.codigo !== automovelId
          );
          console.log('Nova lista de automóveis:', novaLista);
          return novaLista;
        });
      } else {
        Alert.alert('Erro', responseData.message);
      }
    } else {
      // Caso a resposta não seja ok, tenta processar a mensagem de erro
      const textResponse = await response.text();
      let responseData = null;
      try {
        responseData = JSON.parse(textResponse);
      } catch (error) {
        console.warn('A resposta não é um JSON válido.');
        responseData = null;
      }
      throw new Error(
        responseData?.message || 'Erro desconhecido ao excluir o automóvel'
      );
    }
  } catch (error) {
    console.error('Erro ao excluir automóvel:', error.message);
    Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
  }
};

export const updateAutomovel = async (automovelId, updatedData, navigation) => {
  try {
    const response = await fetch(`${API_URL}${automovelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    console.log('Dados enviados:', updatedData);
    if (response.status === 200) {
      Alert.alert('Sucesso!', 'Automóvel atualizado com sucesso!');
      navigation.navigate('Home');
    } else {
      const textResponse = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(textResponse);
      } catch (error) {
        console.warn('A resposta não é um JSON válido.');
        responseData = null;
      }
      throw new Error(
        responseData?.message || 'Erro desconhecido ao atualizar o automóvel'
      );
    }
  } catch (error) {
    console.error('Erro ao atualizar o automóvel:', error.message);
    Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
  }
};