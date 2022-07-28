import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {TextInputMask} from 'react-native-masked-text';

export default function Cadastro() {
  const [cep, setCep] = useState('');

  return (
    <View style={styles.container}>
      <Text>Nome:</Text>

      <TextInputMask
        style={styles.input}
        type={'custom'}
        options={{
          mask: '99999-999',
        }}
        value={cep}
        onChangeText={text => setCep(text)}
        keyboardType="number-pad"
      />
       
  

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  position:'relative'
  },
  input: {
    width: '90%',
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 5,
    fontSize: 20,
    padding: 5,
  },
});
