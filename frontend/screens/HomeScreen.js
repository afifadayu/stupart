import React from 'react'
import { 
  StyleSheet, View, Text, TextInput, Image, TouchableOpacity 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../assets/logo.png';

export default function HomeScreen({ navigation }) {
  const [name, onChangeName] = React.useState('');
  const [placeholderColor, setPlaceholderColor] = React.useState('rgba(0,130,202,0.5)')
  const editTextColor=() =>{
    if (placeholderColor == 'rgba(0,130,202,0)'){
      return setPlaceholderColor('rgba(0,130,202,0.5)')
    }
    else{
      return setPlaceholderColor('rgba(0,130,202,0)')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{ paddingBottom: 25 }}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeName(text)}
            value={name}
            placeholder='Masukkan namamu...'
            placeholderTextColor={placeholderColor}
            onFocus = {editTextColor}
            onBlur = {editTextColor}/>
          <View style={{ paddingTop: 10 }}>
            <LinearGradient
              colors={['#0082ca', '#0151b2']}
              start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
              style={styles.buttonStyle}>
              <TouchableOpacity onPress={() => navigation.navigate('Chat',
                {
                  name: name
              })}>
                <Text style={styles.buttonText}>Masuk</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  logo: {
    width: 250,
    height: 83
  },
  input: {
    color: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40, 
    width: 250, 
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0082ca', 
    backgroundColor: '#f7f7f7',
    color: '#0082ca',
    paddingStart: 20,
    paddingEnd: 20
  },
  buttonStyle: {
    height: 40,
    width: 250, 
    borderRadius: 10,
    backgroundColor: '#0082ca',
    paddingVertical: 10,
    paddingHorizontal: 15    
  },
  buttonText: {
    fontSize: 15,
    color: '#f7f7f7',
    textAlign: 'center'
  }
});