import React, {useReducer, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './RegisterationScreen.styles';
import {useNavigation} from '@react-navigation/native';
import {GenericNavigationProps} from '../../navigation/types';
import {auth, db} from '../../firebase/config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  onIdTokenChanged,
} from 'firebase/auth';
import {collection, addDoc} from 'firebase/firestore';
import {MaterialIndicator} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/Ionicons';

const reducer = (state: number, action) => {};

enum AuthenticationState {
  Null = 0,
  Loading = 1,
  Success = 2,
  Failed = 3,
}

const RegistrationScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<GenericNavigationProps>();
  const [state, dispatch] = useReducer(reducer, 0);
  const [isAuthenticationLoading, setIsAuthenticationLoading] = useState(false);
  const [isAuthenticationSuccess, setIsAuthenticationSuccess] = useState(false);

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  // onAuthStateChanged(auth, () => {
  //   setTimeout(() => {
  //     setIsAuthenticationLoading(false);
  //     navigation.navigate('Login');
  //   }, 1000);
  // });

  const onRegisterPress = async () => {
    if (password !== confirmPassword) {
      console.error("Passwords don't match.");
      return;
    } else {
      setIsAuthenticationLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async response => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            email,
            fullName,
          };
          await addDoc(collection(db, 'users'), data)
            .then(res => {
              console.log('Document written with ID: ', res.id);
            })
            .catch(err => {
              console.error('writeToDB failed. reason :', err);
            });
          setIsAuthenticationSuccess(true);
          onIdTokenChanged(auth, () => {
            setTimeout(() => {
              setIsAuthenticationLoading(false);
              setIsAuthenticationSuccess(false);
              navigation.navigate('Login');
            }, 1000);
          });
        })
        .catch(error => {
          setIsAuthenticationLoading(false);
          console.error('Error adding document: ', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        <Image style={styles.logo} source={require('../../assets/icon.png')} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await onRegisterPress();
          }}>
          {isAuthenticationLoading ? (
            // <>
            //   {isAuthenticationSuccess ? (
            //     <Icon name="checkmark" size={30} color="#00ff00" />
            //   ) : (
            <MaterialIndicator color="white" />
          ) : (
            // )}
            // </>
            <Text style={styles.buttonTitle}>Create account</Text>
          )}
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegistrationScreen;
