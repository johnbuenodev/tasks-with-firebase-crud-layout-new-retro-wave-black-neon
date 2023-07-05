//https://www.youtube.com/watch?v=0AM6AXlFwxM&ab_channel=OneBitCode

import React, { useState} from 'react';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import { addDoc, collection } from 'firebase/firestore';

import { fireStoreApp } from '../../config/firebaseConfig';

export default function NewTask({navigation}) {

  const [description, setDescription] = useState('');

  async function saveTask() {
    
    if(fireStoreApp && description != '') {
      console.log(description);
      try { //criar registro
        const docRef = await addDoc(collection(fireStoreApp, "Tasks"), {
          description: description,
          status: true
        });
        
        console.log("Document written with ID: ", docRef.id);
        navigation.navigate("Task");
      
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    } 

    if(description == '' || description == null) {
      Alert.alert('Aviso', 'Precisa informar uma descrição!', [
        {
         text: 'Ok',
         onPress: () => {},
        }
       ]);
    }
    
  }

  return (
    <>
      <View style={styles.container}>

        <View style={styles.formulario}>
          <Text style={styles.textFormLabel}>Descrição:</Text>
          <TextInput 
           style={styles.textForm} 
           placeholder="Digite a descrição..." 
           onChangeText={setDescription}
           value={description} 
          />
        </View>

        <TouchableOpacity style={styles.buttonAddTasksNeonRosa} onPress={() => { saveTask() }}> 
          <Text style={styles.textButton}>SALVAR</Text>
        </TouchableOpacity>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100F12',
    borderColor: "#0EFFF7",
    borderWidth: 3,
    paddingTop: 6,
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  buttonSave: {
    width: "100%",
    //flexDirection: "row",
    height: 60,
    margin: 16,
    backgroundColor: '#100F12',
    justifyContent: "space-between",
    alignItems: "center",
  },
  textButton: {
    color: "#b32699",
    fontSize: 18,
    fontWeight: '700',
    paddingLeft: 8
  },
  buttonAddTasksNeonRosa: { //largo #b32699
    width: "90%",
    borderWidth: 3,
    borderColor: '#b32699',
    backgroundColor: '#570348',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#b32699',
    borderRadius: 12,
    alignItems:'center',
    position:"absolute",
    bottom: 25,
  },
  textForm: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: '700',
    //paddingLeft: 8,
    //paddingRight: 8,
    borderColor: '#0EFFF7',
    borderWidth: 2,
    marginLeft: 20,
    marginRight: 18,
    width: "90%",
    height: 50,
    alignSelf: 'stretch',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12
  },
  textFormLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: '700',
    //paddingLeft: 8,
    //borderColor: '#570348',
    //borderWidth: 1,
    marginLeft: 20,
    marginBottom: 12,
    textTransform:'uppercase'
  },
  formulario: {
    width: "100%",
    flexDirection: "column",
    //height: 80, não setar ele ocupa o espaço dos elementos internos
    margin: 16,
    backgroundColor: '#100F12',
    justifyContent: "space-between",
    alignItems: "flex-start",
    //borderColor: '#FFFFFF',
    //borderWidth: 1
  },
});
