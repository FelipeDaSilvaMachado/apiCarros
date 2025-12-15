import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button, Alert } from "react-native";
import { auth } from '../Api/Firebase';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const Perfil = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [usuario, setUsuario] = useState('');
    const db = getFirestore();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData(data);
                    setUsuario(data.usuario || '');
                } else {
                    // CORREÇÃO AQUI: setDoc em vez de getDoc
                    await setDoc(docRef, {
                        usuario: user.email?.split('@')[0] || 'Usuário',
                        email: user.email,
                        createdAt: new Date()
                    });
                    
                    // Atualiza o estado diretamente
                    const newData = {
                        usuario: user.email?.split('@')[0] || 'Usuário',
                        email: user.email,
                        createdAt: new Date()
                    };
                    setUserData(newData);
                    setUsuario(newData.usuario);
                }
            }
            setLoading(false);
        };
        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                await updateDoc(docRef, { usuario });
                setUserData({ ...userData, usuario });
                setIsEditing(false);
                Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            }
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível atualizar os dados!');
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size='large' color={'#0000ff'} />
            ) : userData ? (
                <>
                    <Text style={styles.title}>
                        Perfil do Usuário
                    </Text>
                    {isEditing ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={usuario}
                                onChangeText={setUsuario}
                                placeholder="Usuário"
                            />
                            <Button
                                title="Salvar"
                                onPress={handleSave} // Mantém a função separada
                            />
                            <Button
                                title="Cancelar"
                                onPress={() => setIsEditing(false)} // CORREÇÃO: só setIsEditing
                                color='#888'
                            />
                        </>
                    ) : (
                        <>
                            <Text style={styles.info}>
                                Usuário: {userData.usuario}
                            </Text>
                            <Text style={styles.info}>
                                Email: {userData.email}
                            </Text>
                            <Button
                                title="Editar"
                                onPress={() => setIsEditing(true)} // CORREÇÃO: função inline correta
                            />
                            <Button
                                title="Ir para a Home"
                                onPress={() => navigation.navigate('Home')} // CORREÇÃO: função inline
                            />
                        </>
                    )}
                </>
            ) : (
                <Text>
                    Usuário não encontrado!
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        fontSize: 16,
        borderRadius: 5,
    },
});

export default Perfil;