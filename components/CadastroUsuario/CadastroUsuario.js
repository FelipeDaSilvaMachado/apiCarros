import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../Api/Firebase';

const CadastroUsuario = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState('');

    const handleCadastro = async () => {
        if (!email || !senha || !usuario) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }

        if (senha.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres!');
            return;
        }

        try {
            const credencialUsuario = await createUserWithEmailAndPassword(auth, email, senha);
            const { user } = credencialUsuario;

            await setDoc(doc(db, 'users', user.uid), {
                usuario,
                email,
                createdAt: new Date(),
                uid: user.uid
            });

            Alert.alert(
                'Sucesso',
                'Usuário cadastrado com sucesso!',
            );
        } catch (err) {
            // MENSAGEM DE ERRO ESPECÍFICA
            let errorMessage = 'Não foi possível cadastrar!';
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = 'Este email já está cadastrado!';
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Email inválido!';
            } else if (err.code === 'auth/weak-password') {
                errorMessage = 'Senha muito fraca!';
            }
            Alert.alert('Erro', errorMessage);
            console.log('Erro detalhado:', err.code, err.message);
        }
    };

    return (
        <ScrollView
            style={styles.containerScroll}
        >
            <View
                style={styles.container}
            >
                <Text>
                    Cadastro
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    value={usuario}
                    onChangeText={setUsuario}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Digite sua Senha'
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />
                <View
                    style={styles.viewButton}
                >
                    <Button
                        title="Cadastrar"
                        onPress={async () => {
                            await handleCadastro();
                            navigation.navigate('Login');
                        }}
                    />
                </View>
                <View
                    style={styles.viewButton}
                >
                    <Button
                        title="Já tem uma conta? Faça Login"
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerScroll: {
        flexGrow: 1,
        marginTop: 150,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        marginVertical: 5,
    },

    viewButton: {
        margin: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
});

export default CadastroUsuario;