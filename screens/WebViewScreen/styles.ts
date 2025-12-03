import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  buttons: {
    position: 'absolute',
    alignSelf: 'center',
    width: 360,
    gap: 12,
  },
  btn: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 160,
  },
  btn3: {
    backgroundColor: '#197638',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 160,
  },
  btn2: {
    backgroundColor: '#A41976',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 340,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  webView: {
    flex: 1,
    marginTop: 0,
  },
});
