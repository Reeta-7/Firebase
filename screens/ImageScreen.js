import React ,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import storage from '@react-native-firebase/storage';


export default function imageScreen(){
    const [imageTab, setImageTab] = useState([]);
    useEffect(() => {
        storage()
          .ref('images/')
          .listAll()
          .then(function(result) {
              result.items.forEach(function(imageRef) {
                  imageRef.getDownloadURL().then(function(url) {
                     imageTab.push(url); 
                      setImageTab([...imageTab]);
                  }).catch(function(error) {
                      // Handle any errors
                  });
                  console.log(imageTab);
              });
          })
          .catch((e) => console.log('Errors while downloading => ', e));
      }, []);
      return (<View style={{flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
       
      }}>
        <ScrollView>
        {imageTab.map((i )=> (<Image style={{height: 300, width: 300,marginTop:20}} source={{uri: i}} />))}
        </ScrollView>
       
      </View>);
    }
    
    