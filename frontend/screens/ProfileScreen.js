import React from 'react'
import { 
  View, StyleSheet, Text, TouchableOpacity, Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import displayPicture from '../assets/display-picture.jpg';

export default function ProfileScreen({ navigation }) {
  return(
    <View style={styles.container}>
      <LinearGradient
        colors={['#0082ca', '#0151b2']}
        start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
        style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={36} color="#f7f7f7"
            style={styles.buttonPrev}
          />
        </TouchableOpacity>
        <View style={styles.background}>
          <Image source={displayPicture} style={{
            width: 150, height: 150, borderWidth: 1, borderColor: '#0082ca', borderRadius: 100
          }} />
          <View style={styles.descriptionBox}>
            <Text style={{
              fontWeight: 'bold', fontSize: 25, color: '#0082ca', paddingTop: 30, paddingBottom: 30
            }}>
              Starley
              </Text>
            <Text style={{ paddingBottom: 30, textAlign: 'center', fontSize: 15, color: '#0082ca' }}>
              Hai, perkenalkan namaku Starley!{"\n"}
                Aku teman belajar kamu di Stupart Chatbot ini.
                Aku siap menjawab kapanpun kamu bertanya.
              </Text>
            <Text style={{ color: '#0082ca', paddingTop: 30, fontSize: 12 }}>
              Developed by Afifa, Aurellia and Dewi
            </Text>
          </View>
        </View>  
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    backgroundColor: '#84c7a7',
    paddingVertical: 38.5,
    paddingHorizontal: 20,
    paddingBottom: 1,
    flex: 1
  },
  buttonPrev: {
    paddingHorizontal: 5,
    paddingTop: 9,
    paddingVertical: 2,
    paddingBottom: 40
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    color: '#f7f7f7',
    paddingHorizontal: 5,
    paddingTop: 14
  },
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 25,
    backgroundColor: '#f7f7f7',
    borderRadius: 10
  },
  descriptionBox: {
    alignItems: 'center'
  },
  displayName: {
  },
});