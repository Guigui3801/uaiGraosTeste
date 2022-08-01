import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firebase from '../services/firebaseConnection';
import React, {useState} from 'react';

export default function JogadoresSelecionados({data}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [key, setKey] = useState(`String`);

  function checkBox(data) {
    // variaveis para obter o horário local
    var date = new Date();
    var dia = String(date.getDate()).padStart(2, '0');
    var mes = String(date.getMonth() + 1).padStart(2, '0');
    var ano = date.getFullYear();
    var hora = String(date.getHours() - 3).padStart(2, '0');
    var minutos = String(date.getMinutes()).padStart(2, '0');
    var dataAtual = dia + `/` + mes + `/` + ano + ` - ` + hora + `:` + minutos;

    setKey(data.key);
    setToggleCheckBox(data.selecionado);
    firebase.database().ref('jogadores').child(key).update({
      selecionado: toggleCheckBox,
      dataSelecionado: dataAtual,
    });
    // .then(() => {
    //   console.log('Atualizado!');
    // });
    return;
  }

  return (
    <View
      View
      style={[
        styles.container,
        {backgroundColor: data.selecionado == true ? '#dbead5' : '#d0d0d0'},
      ]}>
      <View style={styles.checkBox}>
        <CheckBox
          disabled={false}
          value={data.selecionado}
          onValueChange={newValue => setToggleCheckBox(newValue)}
          onChange={() => checkBox(data)}
        />
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>{data.nome}</Text>
          <Text style={styles.text}> - </Text>
          <Text style={styles.text}>{data.dataNasc}</Text>
        </View>
        <Text style={styles.text}>{data.email}</Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>{data.rua}</Text>
          <Text style={styles.text}> - </Text>
          <Text style={styles.text}>{data.numeroCasa}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>{data.bairro}</Text>
          <Text style={styles.text}> - </Text>
          <Text style={styles.text}>{data.cidade}</Text>
        </View>
        <Text style={styles.text}>{data.complemento}</Text>

        {data.selecionado && (
          <Text style={styles.text}>Selecionado: {data.dataSelecionado}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  text: {
    color: '#000',
    paddingRight: 5,
    fontSize: 15,
  },
  checkBox: {
    justifyContent: 'center',
    marginRight: 5,
  },
});
