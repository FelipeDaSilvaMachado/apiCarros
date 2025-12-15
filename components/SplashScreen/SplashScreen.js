import React, { useEffect } from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Define a duração do splash (4 segundos)
    const timer = setTimeout(() => {
      navigation.replace('CadastroUsuario'); // Após o tempo, navega para a tela de Home
    }, 4000);

    return () => clearTimeout(timer); // limpa o timer quando o componente for desmontado
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <Image
        source={{ uri: 'https://imgs.search.brave.com/5JeSvNOEMfp9u-yAb6GOmz7td8zfvIA2s6O6_Wx5N9k/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jczIu/Z3RhYWxsLmNvbS5i/ci9hdHRhY2htZW50/cy8yMDE1LTA0L29y/aWdpbmFsLzlkMGEw/Mzg4NTEwNDE3YjYz/N2IxMDQ5ZWFjYjg2/M2I4ODRkOGZkOTQv/MzE4MC1ndGEtNS12/ZWhpY2xlcy5wbmc' }}
        style={styles.splashImage}
      />
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
  },
  splashImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;