import { Alert } from 'react-native';
// const API_URL = 'https://apiautomoveis.webapptech.site/api';
// const API_URL = 'http://192.168.18.11:8000/api';
const API_URL = 'https://nondistorted-chris-acquiescently.ngrok-free.dev/api/automoveis';

export const fetchVeiculo = async (setRegistros) => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'any-value-here',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }
    const data = await response.json();
    console.log('Veiculos recebidos da API:', data);

    if (data.sucesso && data.dados) {
      setRegistros(data.data);
    } else if (Array.isArray(data)) {
      setRegistros(data); // Se API retorna array direto
    } else if (data.data && Array.isArray(data.data)) {
      setRegistros(data.data); // Se API retorna {data: [...]}
    } else if (data.veiculos) {
      setRegistros(data.veiculos); // Se API retorna {veiculos: [...]}
    } else {
      console.warn('Estrutura desconhecida. Dados:', data);
      setRegistros([]); // Define vazio se não reconhecer
    }
  } catch (error) {
    console.error('Erro ao buscar o veiculo:', error);
    throw error;
  }
};

export const createVeiculo = async (automoveisData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(automoveisData),
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
    console.error('Erro ao cadastrar o veiculo:', error.message);
    Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
    return null;
  }
};

export const deleteVeiculo = async (automovelId, setRegistros) => {
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
            (automoveis) => automoveis.codigo !== automovelId
          );
          console.log('Nova lista de veiculos:', novaLista);
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
        responseData?.message || 'Erro desconhecido ao excluir o Veiculo'
      );
    }
  } catch (error) {
    console.error('Erro ao excluir veiculo:', error.message);
    Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
  }
};

export const updateVeiculo = async (automovelId, updatedData, navigation) => {
  try {
    const response = await fetch(`${API_URL}${automovelId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    console.log('Dados enviados:', updatedData);
    if (response.status === 200) {
      Alert.alert('Sucesso!', 'Veiculo atualizado com sucesso!');
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
        responseData?.message || 'Erro desconhecido ao atualizar o Veiculo'
      );
    }
  } catch (error) {
    console.error('Erro ao atualizar o veiculo:', error.message);
    Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
  }
};