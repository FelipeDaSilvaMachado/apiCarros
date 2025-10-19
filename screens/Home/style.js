import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 5,
    elevation: 3,
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  actionsColumn: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#27ae60',
    width: 60,
    height: 60,
    margin: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  plusIcon: {
    color: '#e5e5e5',
    fontSize: 32,
    lineHeight: 36,
    marginBottom: 2,
  },
});