import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {RootStackScreen} from './src/navigation/RootStackScreen';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <RootStackScreen />
    </SafeAreaView>
  );
}

export default App;
