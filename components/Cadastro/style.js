import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e5e5e5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  viewPicker: {
    width: '100%',
    border: 1,
    borderColor: '#000',
    marginBottom: 5,
    borderRadius: 6,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});