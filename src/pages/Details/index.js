
import { useState } from 'react';

import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Details({navigation, route}) {

  console.log("Valor do route:", route);
  const { id, description, status } = route.params; //desestruturar / pegar de dentro do route params

  const [idValue, setIdValue] = useState(id);
  const [statusValue, setStatusValue] = useState(status);
  const [descriptionValue, setDescriptionValue] = useState(description);

  return (
      <>
      <View style={styles.container}>

        <View style={styles.formulario}>
          <Text style={styles.textFormLabel}>ID:</Text>
          <Text style={styles.textFormID}>{idValue}</Text>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.textFormLabel}>Descrição:</Text>
          <TextInput 
           style={styles.textForm} 
           onChangeText={setDescriptionValue}
           value={descriptionValue} 
           editable={false}
          />
        </View>

        <View style={styles.formulario}>
          <Text style={styles.textFormLabel}>Status:</Text>
          <TextInput 
           style={styles.textForm} 
           onChangeText={setStatusValue}
           value={String(statusValue)} 
           editable={false}
          />
        </View>

      </View>
    </>
  );
}

/*

    <TouchableOpacity style={styles.buttonAddTasksNeonRosa} onPress={() => { saveTask() }}> 
          <Text style={styles.textButton}>SALVAR</Text>
        </TouchableOpacity>

*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100F12',
    borderColor: "#0EFFF7",
    borderWidth: 3,
    paddingTop: 6,
    justifyContent:'center',
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
  textFormID: {
    color: "#FFFFFF",
    fontSize: 16,
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
