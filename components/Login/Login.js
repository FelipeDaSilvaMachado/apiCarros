import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Api/Firebase';
import { styles } from '../Cadastro/style';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async () => {
        if (!email || !senha) {
            setErro('Preencha email e senha!');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, senha);
        } catch (err) {
            console.log('Erro de login', err.code, err.message);
            let errorMessage = 'Erro ao fazer login!';

            if (err.code === 'auth/invalid-credential') {
                errorMessage = 'Email ou senha incorretos!';
            } else if (err.code === 'auth/user-not-found') {
                errorMessage = 'Usuário não encontrado!';
            } else if (err.code === 'auth/wrong-password') {
                errorMessage = 'Senha incorreta!';
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = 'Muitas tentativas. Tente mais tarde!';
            }

            setErro(errorMessage);
        }
    }

    const handleSenhaReset = async () => {
        if (!email) {
            Alert.alert('Informe seu email para recuperar a senha!');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Sucesso', 'Email para recuperar a senha foi enviado, verifique sua caixa de entrada!');
        } catch (err) {
            Alert.alert('Erro', 'Não foi possivel enviar o email de recuperação de senha!');
        }
    };

    return (
        <View style={stylesLogin.container}>
            <Text>
                Login!
            </Text>
            <TextInput
                style={stylesLogin.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                style={stylesLogin.input}
                placeholder='Senha'
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />
            {erro ? <Text style={stylesLogin.erro}>{erro}</Text> : null}
            <View
                style={stylesLogin.viewButton}
            >
                <View
                    style={styles.viewInternaBotao}
                    >
                    <Button
                        style={stylesLogin.button}
                        title='Logar'
                        onPress={async () => {
                            await handleLogin();
                            navigation.navigate('Perfil');
                        }}
                        />
                </View>
                <View>
                    <Button
                        style={stylesLogin.button}
                        title='Cadastrar Usuário'
                        onPress={() => navigation.navigate('CadastroUsuario')}
                    />
                </View>
            </View>
            <View
                style={stylesLogin.viewButton}
            >
                <Button
                    style={stylesLogin.button}
                    title='Esqueci a senha'
                    onPress={handleSenhaReset}
                />
            </View>
        </View >
    );
};

const stylesLogin = StyleSheet.create({
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

    erro: {
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        color: 'red',
        fontWeight: 'bold',
        width: '70%',
    },

    button: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewButton: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },

    viewInternaBotao: {
        marginRight: 3,
        width: '100%',
    },
});

export default Login;