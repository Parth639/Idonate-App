import {View, Text, TextInput,TouchableOpacity,StyleSheet,Alert} from 'react-native';
import React, {useRef,useState} from 'react';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from './fireBaseConfig';
import firebase from 'firebase/compat/app';

const Otp = () =>{
   const [phoneNumber,setPhoneNumber] = useState('');
   const [code,setcode] = useState('');
   const [verificationId,setVerificationID] = useState(null);
   const recaptchaVerifier = useRef(null);

   const sendVerification = () => {
     const phoneProvider = new firebase.auth.PhoneAuthProvider();
     phoneProvider
          .verifyPhoneNumber(phoneNumber,recaptchaVerifier.current)
          .then(setVerificationID);
          setPhoneNumber('');

   };

   const confirCode = () => {
      const  credential  = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          code
      );
       firebase.auth().signInWithCredential(credential)
       .then(() => {
          setcode('');
       })
       .catch((error) =>{
          // show an alert in case of error
          alert(error)
       })
       Alert.alert(
        'Login succesful.Welcome to App',
       ); 

       }
       
       return(
        <View style={styles.container}>
          <FirebaseRecaptchaVerifierModal
            ref = {recaptchaVerifier}
            firebaseConfig={firebaseConfig}

          />
          <Text style = {styles.otpText}>
            Login using OTP

          </Text>
          <TextInput
            placeholder='Phone Number with country code'
            onChangeText={setPhoneNumber}
            keyboardType='phone-pad'
            autoCompleteType='tel'
            style={styles.textInput}
          />

          <TouchableOpacity style ={styles.sendVerification} onPress={sendVerification}>
            <Text style={styles.buttonText}>
              Send Verification
              </Text> 

          </TouchableOpacity>
          <TextInput
            placeholder='Confirm Code'
            onChangeText={setcode}
            keyboardType='number-pad'
            autoCompleteType='tel'
            style={styles.textInput}
          />
          <TouchableOpacity style ={styles.sendCode} onPress={confirCode}>
            <Text style={styles.buttonText}>
              Confirm Verification
              </Text>
              </TouchableOpacity>
        </View>
       )
   }


export default Otp;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000',
        alignItems:'center',
        justifyContent:'center',

    },
    textInput: {
        paddingTop:40,
        paddingBottom:20,
        paddingHorizontal:20,
        fontSize:24,
        borderBottomColor:'#fff',
        borderBottomWidth:20,
        marginBottom:20,
        textAlign:'center',
        color:'#fff'

    },
    sendVerification:{
        padding:20,
        backgroundColor:'#3498db',
        borderRadius:10,
    },
    sendCode:{
        padding:20,
        backgroundColor:'#9b59b6',
        borderRadius:10,
    },
    buttonText:{
      textAlign:'center',
      color:'#fff',
      fontWeight:'bold',
    
    },
    otpText:{
        fontSize:24,
        fontWeight:'bold',
        color:'#fff',
        margin:20
    }
});