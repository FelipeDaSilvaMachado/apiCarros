import { Text, View, Image } from 'react-native';
import { styles } from './style.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = ({ logo }) => {
    return (
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.container}>
                <View>
                    <Image
                        style={styles.logo}
                        source={logo}
                    />
                </View>
                <View style={styles.containerSlogan}>
                    <Text style={styles.slogan}>
                        Os carros que você procura estão aqui!
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Header;