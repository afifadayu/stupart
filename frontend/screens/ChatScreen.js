import React from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView,
  KeyboardAvoidingView, Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import displayPicture from '../assets/display-picture.jpg';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default class ChatScreen extends React.Component{
  constructor(props){
    super(props)
    const { name } = props.route.params;
    this.state={
      placeholderColor: 'rgba(247,247,247,0.7)',
      message: '',
      padding: 40,
      placeholderMessage: 'Masukan pesan...',
      datas: [
        {
          body: 'Hai ' + name + ', perkenalkan namaku Starley! Aku yang akan menemani kamu belajar di Stupart Chatbot ini. Aku akan selalu siap menjawab kapanpun kamu bertanya. Jadi kalau ada pertanyaan, jangan sungkan tanya ke aku ya! Semangat belajar!!!',
          type: 'text',
          sender: 'starley'
        }
      ],
      typing: false
    }
    this.scroll = null
  }
  componentDidMount = () => {
    Keyboard.addListener("keyboardWillShow", () => this.setState({padding:15}));
    Keyboard.addListener("keyboardWillHide", () => this.setState({padding:40}));
  }
  sendMessages = () => {
    let valueMessage = [
      ...this.state.datas,
      {
        body: this.state.message,
        type: 'text',
        sender: 'user'
      }
    ]
    this.setState({datas: valueMessage, typing:true})
    
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: this.state.message
    })
      .then(response => {
        console.log('response', response.data)
        let valueMessage = [...this.state.datas]
        valueMessage.push({
          body: response.data.id,
          type: 'text',
          sender: 'starley'
        })
        this.setState({datas: valueMessage, typing:false})
      })
      .catch(error => {
        console.log('error', error)
        valueMessage.push({
          body: 'gagal kirim',
          type: 'text',
          sender: 'starley'
        })
      })
    this.setState({message:''})
  }
  render = () => {
    const {
      placeholderColor,
      message,
      padding,
      placeholderMessage,
      datas,
      typing
    } = this.state
    
    return(
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <LinearGradient
            colors={['#0082ca', '#0151b2']}
            start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
            style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
              <Image source={displayPicture} style={styles.displayPicture} />
            </TouchableOpacity>
            <Text style={styles.displayName}>
              Starley
          </Text>
          </LinearGradient>

          <View style={{ paddingVertical: 15, paddingHorizontal: 20, flex: 1 }}>
            <ScrollView ref = { (ref) => this.scroll = ref}
              onContentSizeChange={(contentWidth, contentHeight) => { this.scroll.scrollToEnd({ animated: true }) }}
            >
              {
                datas && datas.map((data, index) => {
                  if (data.sender == 'starley') {
                    if (data.type == 'text') {
                      return (
                        <View key={index} style={styles.bubbleStarley}>
                          <Text style={{ color: '#f7f7f7' }}>{data.body}</Text>
                        </View>
                      )
                    }
                    else if (data.type == 'image') {
                      return (
                        <View key={index} style={styles.bubbleStarley}>
                          <Image source={{ uri: data.body }} style={{ width: 100, height: 100 }} />
                        </View>
                      )
                    }
                  }
                  else {
                    return (
                      <View key={index} style={styles.bubbleUser}>
                        <Text>{data.body}</Text>
                      </View>
                    )
                  }
                })
              }
              {
                typing ? <View style={styles.bubbleTyping}>
                  <Text style={{color: '#f7f7f7'}}>Starley sedang mengetik...</Text>                  
                </View>
                
                : null
              }
            </ScrollView>
          </View>
          <LinearGradient
            colors={['#0082ca', '#0151b2']}
            start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
            style={[styles.chat, { paddingBottom: padding }]}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <TextInput
                  style={styles.boxChat}
                  onChangeText={text => this.setState({message: text})}
                  value={message}
                  placeholder={placeholderMessage}
                  placeholderTextColor={placeholderColor}
                />
              </View>
              <View style={{ flex: 0 }}>
                <TouchableOpacity
                  onPress={() => this.sendMessages()}
                  style={styles.buttonStyle}>
                  <Ionicons name="ios-send" size={24} color="#0082ca" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </View>  
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#f7f7f7'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#84c7a7',
    paddingVertical: 45,
    paddingHorizontal: 20,
    paddingBottom: 1,
    flex: 0
  },
  displayPicture: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#f7f7f7',
    borderRadius: 50,
    flex: 0,
  },
  displayName: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#f7f7f7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    paddingLeft: 15,
    paddingBottom: 10
  },
  bubbleStarley: {
    maxWidth: 350,
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: '#0082ca',
    borderRadius: 15,
    marginVertical: 2
  },
  bubbleUser: {
    maxWidth: 350,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 15,
    marginVertical: 2
  },
  bubbleTyping: {
    maxWidth: 350,
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: 'rgba(0,130,202,0.5)',
    borderRadius: 15,
    marginVertical: 2
  },
  chat: {
    backgroundColor: '#84c7a7',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flex: 0,
    paddingBottom: 40
  },
  boxChat: {
    height: 40,
    width: 375,
    padding: 10,
    borderColor: '#f7f7f7',
    borderWidth: 1,
    borderRadius: 25,
    color: '#f7f7f7',
    paddingStart: 20,
    paddingEnd: 75
  },
  buttonStyle: {
    backgroundColor: '#f7f7f7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    height: 40
  },
});
