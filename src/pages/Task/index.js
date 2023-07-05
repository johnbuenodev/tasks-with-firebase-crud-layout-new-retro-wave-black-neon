
import { FontAwesome } from "@expo/vector-icons";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ReactNativeFirebase } from "@react-native-firebase/app";

import { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';

import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, orderBy, query, limit, where, startAt, documentId } from "firebase/firestore";

import { Button } from 'react-native';

import { fireStoreApp } from '../../config/firebaseConfig';

//passa props navigation
export default function Task({navigation}) { 

  //const { navigation } = props;
  
  const [heightValue, setHeightValue] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  //executa sempre q iniciar no ciclo de vida
  useEffect(() => {
    // fireStoreApp.collection("Tasks");
    let {width, height} = Dimensions.get('window'); 
    setHeightValue(height);
    loadTask();

  },[])

  async function loadTask() {
    
    /* CODIGOS EXEMPLO PARA PROCESSOS COM FIREBASE 2023*/

    // try { // CRIAR REGISTRO 
    //   const docRef = await addDoc(collection(fireStoreApp, "Tasks"), {
    //     description: "Uma nova tarefa foi add",
    //     status: true
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }

    //get all registros
    // const allTasks = await getDocs(collection(fireStoreApp, "Tasks"));
    // allTasks.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data().description}`);
    // });

    /*
           criar uma WHERE PARA BUSCAR REGISTRO

           // Create a reference to the cities collection
           import { collection, query, where } from "firebase/firestore";
           const citiesRef = collection(db, "cities");

           // Create a query against the collection.
           const q = query(citiesRef, where("state", "==", "CA"));
    
           const querySnapshot = await getDocs(q);
           querySnapshot.forEach((doc) => {
           // doc.data() is never undefined for query doc snapshots
           console.log(doc.id, " => ", doc.data());
           });


    */

    //Query WHERE    inicio OK FUNCIONANDO
    // const tasksRef2 = collection(fireStoreApp, "Tasks");
    // const q = query(tasksRef2, where("description", "==", "valorant")); //OUTRAS CONDIÇÕES VERIFICA NA DOCUMENTAÇÃO
    
    // console.log("inicio Query:");
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   console.log("Result:");
    //   console.log(doc.id, " => ", doc.data());
    // });
 

    /* Query com orderBy e limit e por INICIANDO TEXT POR "VALO" exemplo FUNCIONANDO OK */
    
    //const first = query(collection(fireStoreApp, "Tasks"), orderBy("description"), limit(10), startAt("sea"));
    //ordenar por documentId id do documento no firebase     -   documentId(), orderBy(documentId()), limit(4)
    // const first = query(collection(fireStoreApp, "Tasks"), orderBy("description"), limit(10), startAt("blade")); //buscar registro escrito valorant
    // const documentSnapshots = await getDocs(first);  //startAt("valoran") //criado 3 registro blade runner 1 .. 2 ... 3 para testar a ordenacao por id e iniciando texto por startAt("blade")
    // console.log(documentSnapshots);
    // if(documentSnapshots) { //if (docSnap.exists()) 
    //   documentSnapshots.forEach((t) => {
        
    //   console.log(`${t.id}`);
    //   console.log(`${t.data().status}`);
    //   console.log(`${t.data().description}`);
      
    //  });
    // }

    //Pegando ultimo registro da lista funcionando OK
    // console.log("Pegando ultimo registro da busca Query por posição");
    // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    // console.log("last", lastVisible.id, lastVisible.data());

    /* */

    /* Get BY ID  inicio */
    //montando referencia do documento que eu quero buscar passando as credenciais, tabela, e id registro
    // const docSnap = (await getDoc(doc(fireStoreApp, "Tasks", "NVohaIQCuogSbmkdNgbo")));
    
    // if(docSnap.exists()) {
    //   console.log("Response Get By Document-ID");
    //   console.log(docSnap.data());
    // }
    /* Get BY ID  fim */

    if(fireStoreApp) {

    const allTasks = (await getDocs(collection(fireStoreApp, "Tasks")));
    //console.log(allTasks);
    if(allTasks) {
      const list = [];
      allTasks.forEach((t) => {
        
        //console.log(`${t.id}`);
        let task = {
          status: t.data().status,
          description: t.data().description,
          id: t.id
        }

        list.push(task);
        
        
      });
      if(list.length > 0) {
        setTotalTasks(list.length);
        setTasks(list); 
      } else {
        setTasks([]);
      }
      
     }
  }
  
  }

  async function addNewTask() {
    
    if(fireStoreApp) {
      try { //criar registro
        const docRef = await addDoc(collection(fireStoreApp, "Tasks"), {
          description: "Uma nova tarefa foi add 3",
          status: true
        });
        console.log("Document written with ID: ", docRef.id);

        await loadTask();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

  }

  async function deleteTask(id) {

    if(fireStoreApp) {

      const docRef = doc(fireStoreApp, "Tasks", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
       console.log("Excluindo documento:", docSnap.id ," - ", docSnap.data());
       await deleteDoc(doc(fireStoreApp, "Tasks", id));
       await loadTask();
      } else {
       // docSnap.data() will be undefined in this case
       console.log("Documento não encontrado");
      }
      
    }
    
  }

  async function navigateAddTask() {
    navigation.navigate("NewTask");
  }

  async function navigateDetails(item) {
    console.log(item);
    navigation.navigate("Details",{
      id: item.id,
      description: item.description,
      status: item.status
    });
  }

   const handleRemoveTask = (id) => {
    Alert.alert('Ação', 'Deseja excluir a tarefa?', [
     {
      text: 'Cancelar',
      style: styles.alertColorButtonCancel,
      onPress: () => {},
     },
     {
      text: 'Ok',
      style: styles.alertColorButtonOK,
      onPress: () => {
        deleteTask(id)
      },
     }
    ]);
  };

  async function refreshDataBase() {
    console.log("Chamou refresh");
    await loadTask();
  }

  //<Text style={styles.textColor}>Task</Text>
  // <FontAwesome name="star" size={23} color="#0EFFF7"></FontAwesome>
  return (
    <>
    <View style={styles.container}>
     
     <View style={styles.containerRefresh} > 
       <Text style={styles.textColorRefreshContainer}>Nº de Tarefas:  {totalTasks}</Text>
       <TouchableOpacity onPress={() => { refreshDataBase() }}> 
         <FontAwesome style={styles.iconRefresh} name="rotate-right" />
       </TouchableOpacity>
     </View>

     <FlatList 
      showsVerticalScrollIndicator={false}
      data={tasks}
      renderItem={({item}) => { //item pega o index e o objeto . ({item}) pega o objeto 
        //{console.log(item); console.log(item.status); }
        return (<View style={styles.listTaskContainer}>
         
         <TouchableOpacity style={styles.iconList} onPress={() => { handleRemoveTask(item.id) } }> 
         
          <FontAwesome name="diamond" size={23} color="#0EFFF7" ></FontAwesome>
         </TouchableOpacity>

         <TouchableOpacity style={styles.listTaskDescription} onPress={() => { navigateDetails(item) } }> 
          <Text style={styles.textColor} >{item.description}</Text>
         </TouchableOpacity>
         
        </View>)}}
     />
     <TouchableOpacity style={styles.buttonFlutuante} onPress={() => { navigateAddTask() } }> 
      <Text style={styles.iconFlutuante}>+</Text>
     </TouchableOpacity>
     
    </ View>
    
  </>
  );
}

/*

<TouchableOpacity style={styles.buttonAddTasks} title='Get Tasks' onPress={() => console.log(tasks)}> 
      <Text style={{color: '#b32699', fontSize:16, fontWeight: '700'}}>GET TASKS</Text>
     </TouchableOpacity>

*/

//backgroundColor: '#fff',
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100F12',
    //alignItems: 'flex-start', //center
    //justifyContent: 'flex-start', //center
    //alignContent: 'flex-start', 
    borderColor: "#0EFFF7",
    borderWidth: 3,
    //padding: 16,
    paddingTop: 6
  },
  listTaskContainer: {
   width: "92%", //100% 
   flexDirection: "row",
   justifyContent: "flex-start",
   paddingHorizontal: 8,
   paddingVertical: 6,
  },
  listTaskDescription: {
    borderColor: "#b32699",
    borderWidth: 3,
    height: 50,
    marginLeft: 16,
    marginRight: 6,
    marginVertical: 8,
    //borderRadius: 24,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: "88%"
  },
  textColor: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: '700',
    paddingLeft: 8
  },
  textColorRefreshContainer: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: '700',
    paddingLeft: 24
  },
  buttonAddTasksNeonRosa: { //largo #b32699
    borderWidth: 3,
    borderColor: '#b32699',
    backgroundColor: '#570348',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#b32699',
    borderRadius: 12
  },
  buttonAddTasksNeonAzul: { //largo #0EFFF7
    borderWidth: 3,
    borderColor: '#b32699',
    backgroundColor: '#570348',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#b32699',
    borderRadius: 12
  },
  buttonFlutuante: {
    width:60,
    height: 60,
    position:"absolute",
    bottom:25,
    left:25,
    backgroundColor:"#570348",
    borderRadius:50,
    justifyContent:"center",
    alignItems:"center",
    borderWidth: 3,
    borderColor: '#b32699'
  },
  iconFlutuante: {
    color:"#b32699",
    fontSize: 32,
    fontWeight: "500"
  },
  iconList: {
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 8
  },
  iconRefresh: {
    color:"#0EFFF7",
    fontSize: 32,
    fontWeight: "300"
  },
  containerRefresh: {
    width: "100%",
    flexDirection: "row",
    height: 60,
    paddingRight: 24,
    backgroundColor: '#100F12',
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionTask: {
    width: "75%",
    alignContent: "flex-start", 
    backgroundColor: "#F5F5F5",
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 5,
    marginRight: 16, 
    color: "#282b2b5"
  },
  alertColorButtonCancel: {
    color: "#b32699"
  },
  alertColorButtonOK: {
    color: "#0EFFF7"
  },
});


