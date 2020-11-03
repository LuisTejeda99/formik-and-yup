import {Formik, useFormikContext, useField} from "formik";
import * as Yup from "yup";
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import React from 'react';

const MyInput = ({ fieldName, ...props }) => {
  const [field, meta] = useField(fieldName);

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={field.onChange(fieldName)}
        value={field.value}
        onBlur={field.onBlur(fieldName)}
        {...props}
        />
        {
          meta.error && meta.touched && 
          (<Text style={{color: "red"}}> {meta.error} </Text>)
        } 
    </>
    );
  }
  
  const EmailForm = () => {
  const {submitForm} = useFormikContext();
  return (
    <>
      <Text> Correo Electronico </Text>
      <MyInput fieldName="email"/>
      <MyInput fieldName="name"/>
      <Button onPress={submitForm} title="Envíar"/>
    </>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Formik
        onSubmit={x => console.log(x)}
        initialValues={{email:"",name:""}}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Correo invalido")
            .required("Requerido"),
          name: Yup.string()
            .min(10)
            .required("Requerido")
        })}>
        <EmailForm />
      </Formik>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 30,
    alignSelf:"stretch",
    backgroundColor: "#eee",
  },
});