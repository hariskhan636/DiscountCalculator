import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
var arr1 = []


export default function App() {

  const Delete = () =>{
    arr1 = []
    alert("Reload to view Changes")
  
  }

  const ClearHistory = () =>{

    Alert.alert(
      "Clear History",
      "Do you really want to Clear History?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "YES", 
        onPress: () => Delete() }
      ]
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >
        <Stack.Screen 
          name="Home Screen" 
          component={HomeScreen}
          options={{ title: 'Calculate Discount' }}
           />
        <Stack.Screen 
          name="History" 
          component={HistoryPage}
          options={{ 
            title: 'History',
            headerRight: () => (
              <Button
                onPress={() => ClearHistory()}
                title="Clear History"
                color="black"
              />
            ),
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {

  const CheckDisc = (v) => {

    if (v > 100) {
      alert("Invalid Discount")
      v = 0
      setDisc(v)
    } else {
      setDisc(v)
    }

  }

  const AddItem = () => {

    //setArr([...getArr, getPrice])
    arr1.push({key: Math.random().toString(), data: "Original Price: "+ getPrice+ " -- Discount: "+ getDisc+"%"+ " = Final Price: "+save})
    //arr1.push("Original Price: "+ getPrice+ " ,Discount: "+ getDisc+ " ,Final Price: "+save)
    setDisc(0)
    setPrice(0)

  }

  const ViewHistory = () => {

    navigation.navigate('History')

  }

  const [getPrice, setPrice] = useState('')
  const [getDisc, setDisc] = useState('')
  //const [getArr, setArr] = useState([])
  var price = (getPrice * (getDisc / 100)).toFixed(2)
  var save = (getPrice - price).toFixed(2)

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#cc0000', marginBottom: 10 }}>Original Price:</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          keyboardType='number-pad'
          onChangeText={(val) => setPrice(val)}
          value={getPrice}
        />
      </View>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#cc0000', marginBottom: 10 }}>Discount:</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          keyboardType='number-pad'
          onChangeText={(val) => CheckDisc(val)}
          value={getDisc}
        />
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#003300', marginBottom: 10 }}>You Save: {price}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#003300', marginBottom: 10 }}>Final Price: {save}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={AddItem}
          disabled={(getPrice<=0 && getDisc<=0)||(getPrice<=0)}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#003300' }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>ViewHistory()}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#003300' }}>View History</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

function HistoryPage({navigation}) {


  const RemoveItem = (ik) =>{

    var arr2 = arr1.filter(item => item.key!=ik)
    arr1 = arr2.slice()
    navigation.push('History')
   
  }

  const HomePage = () =>{

    navigation.navigate('Home Screen')

  }

  return (
    <View style={styles.container}>
      <ScrollView style={{width:'80%'}}>
        {arr1.map((item) => 
        <TouchableOpacity
          style={{borderColor:'black',borderWidth:2}}
          key={item.key}
          onPress={()=>RemoveItem(item.key)}
        >
          <View style={{backgroundColor:'#e68a00',height:60,padding:10,margin:5,flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#003300' }}>{item.data}</Text>
            <View style={{backgroundColor:'red',width:20,borderRadius:5,height:30}}>
              <Text style={{fontSize:18,color:'white',padding:5}}>X</Text>
            </View>
          </View>
        </TouchableOpacity>
        )}
      </ScrollView>

      <View style={{flexDirection:'row'}}>
        <TouchableOpacity
          style={styles.homebtn}
          onPress={HomePage}
          
        >
          <Text style={{ fontSize: 20, color: 'white'}}>Home Page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homebtn}
          onPress={()=>navigation.push('History')}
          
        >
          <Text style={{ fontSize: 20, color: 'white'}}>Reload ⟲</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cce6ff',
  },
  input: {
    borderWidth: 1,
    width: 200,
    height: 50,
    marginBottom: 20,
    borderColor: 'purple',
    textAlign: 'center',
    backgroundColor: '#f9e6ff',
    fontWeight: 'bold',
    fontSize: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#e68a00",
    padding: 10,
    borderRadius: 30,
    width: 100,
    textAlign: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  homebtn: {
    alignItems:'center',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'black',
    width: 100,
    margin: 10,
    //height:80,
   
  }
});