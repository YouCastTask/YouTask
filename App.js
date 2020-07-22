import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/redux/reducers';
import WindowStack from './src/lib/windowStack';
import NetInfo from "@react-native-community/netinfo";
import NotificationPopup from 'react-native-push-notification-popup';
import { Colors } from './app.json';

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleWare(reducers);

class App extends Component {

  constructor() {
    super();

    this.state = {
      connected: true
    }
  }

  componentDidMount() {
    NetInfo.addEventListener(state => {
      this.setState({ connected: state.isInternetReachable });
    });
  }

  render() {
    return (

      <Provider store={store}>
        {
          !this.state.connected ?
            <View style={{ width: '100%', height: '100%', backgroundColor: Colors.dark, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('./src/assets/network-icon.png')} style={{ width: '40%', height: '30%', resizeMode: 'contain', marginBottom: '5%' }} />
              <Text style={{ fontFamily: "OpenSans-Regular", color: Colors.white }} allowFontScaling>{'Whoops!\n'}</Text>
              <Text style={{ fontFamily: "OpenSans-Regular", color: Colors.white, textAlign: 'center' }} allowFontScaling>{'No internet connection found.\nCheck your connection and try again'}</Text>
            </View>
            : null
        }
        <WindowStack />
        <NotificationPopup ref={ref => global.popup = ref} />
      </Provider>
    );
  }
}

export default App;
