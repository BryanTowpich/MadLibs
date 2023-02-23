import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"
          component={HomeScreen}
          options={{title: 'Assignment 1'}}
        />
        <Stack.Screen name="HallPass"
          component={MadlibScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
//first Page
const HomeScreen = ({navigation}) => {
  //this is the Variables we use
  const [Instructions] = React.useState('Enter a "Name" a "Noun" and an "Event" this will create a nice little Hall Pass MadLib for you');
  const [name, onChangeName] = React.useState('');
  const [noun, onChangeNoun] = React.useState('');
  const [event, onChangeEvent] = React.useState('');
  const [nameHint] = React.useState('Enter a Name');
  const [nounHint] = React.useState('Enter a Noun');
  const [eventHint] = React.useState('Enter an event');

  return(
    <Pressable style={styles.container} onPress={closeKeys}>
        <Text style={styles.instructionText}>{Instructions}</Text>
        <TextInput style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder={nameHint}
        />
        <TextInput style={styles.input}
          onChangeText={onChangeNoun}
          value={noun}
          placeholder={nounHint}
        />      
        <TextInput style={styles.input}
          onChangeText={onChangeEvent}
          value={event}
          placeholder={eventHint}
        />
        <View style={styles.button}>
          <Button title="Make My Hall Pass"
            onPress={()=>{navigation.navigate('HallPass', {name: name, noun: noun, event: event});}}
          />
        </View>
        <View style={styles.button}>
          <Button title="Clear"
            onPress={() => 
              {onChangeName(''), onChangeNoun(''), onChangeEvent('')}}
          />
        </View>
    </Pressable>
  );
};

const MadlibScreen = ({navigation, route}) => {
  return(
    <View style={styles.hallPassMain}>
      <View style={styles.hallPassLeft}>
        <View>
          <Text style={styles.hallPassText}>HallPass</Text>
        </View>
      </View>
      <View style={styles.hallPassRight}> 
        <View style={styles.hallPassContainer}>
        {/*This is all The Generated Text*/}
        {/*top border*/}
          <View style={styles.top}>
            <View style={styles.hallPassTextContainer}>
              <Text style={styles.madTitle}>Mad Libs</Text>
            </View>
            <View style={styles.hallPassTextContainer}>
              <Text style={styles.info}>Date: </Text>
              <Text style={[{textDecorationLine: 'underline'},styles.info]}>{getDate()}</Text>
            </View>
          </View>
        
        {/*Middle Border*/}
          <View style={styles.mid}>
            <View style={styles.hallPassTextContainer}>
              <Text style={[{textDecorationLine: 'underline'},styles.info]}>{route.params.name}</Text>
              <Text style={styles.info}> is too cool</Text>
            </View>
            <View style={styles.hallPassTextContainer}>
              <Text style={styles.info}>for </Text>
              <Text style={[{textDecorationLine: 'underline'},styles.info]}>{route.params.noun}</Text>
              <Text style={styles.info}> class.</Text>
            </View>
            <View style={styles.hallPassTextContainer}>
              <Text style={styles.info}>Instead, she/he will be</Text>
            </View>
            <View style={styles.hallPassTextContainer}>
              <Text style={styles.info}>attending the  </Text>
              <Text style={[{textDecorationLine: 'underline'},styles.info]}>{route.params.event}</Text>
            </View>
          </View>

        {/*Bottom Border*/}
        <View style={styles.top}>
          <View style={styles.hallPassTextContainer}>
            <View style={styles.signatureBox}>
              <Text style={styles.signature}>signature</Text>
            </View>
          </View>
        </View>

        </View>
      </View>
    </View>
  )
}
//close keyboard
const closeKeys = () => {
  Keyboard.dismiss();
}
//Get Date
const getDate = () => {
  var day = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return day + '.' + month + '.' + year;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    margin: 20,
    width: 250,
    fontSize: 20,
  },
  instructionText: {
    padding: 30,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    padding:10,
  },
  hallPassMain: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 20,
    borderColor: 'red',
  },
  hallPassLeft: {
    flexDirection: 'column',
    width: '25%',
    height: '100%',
    borderWidth: 2,
    fontSize: 20,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hallPassRight: {
    height: '100%',
    width: '75%',
    fontSize: 20,
    borderColor: 'green',
    flexDirection: 'column',
  },
  hallPassTextContainer: {
    width: '100%',
    fontSize: 20,
    borderColor: 'purple',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  hallPassText: {
    width: '400%',
    transform: [{rotate: '-90deg'}],
    fontSize: 80,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  
  madTitle: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  info: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  signatureBox: {
    fontSize: 15,
    textAlign: 'right',
    borderWidth: 3,
    width: 250,
    height: 100,
  },
  signature: {
    fontSize: 15,
    textAlign: 'right'

  },
  top: {
    height: '25%'
  },
  mid: {
    height: '50%'
  }
});

