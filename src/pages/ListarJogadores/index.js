import {SafeAreaView, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';

import firebase from '../../services/firebaseConnection';
import JogadoresSelecionados from '../../components/JogadoresSelecionados';

export default function ListarJogadores() {
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function dados() {
      await firebase
        .database()
        .ref('jogadores')
        .on('value', snapshot => {
          setJogadores([]);

          snapshot.forEach(childItem => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
              dataNasc: childItem.val().dataNasc,
              email: childItem.val().email,
              cep: childItem.val().cep,
              rua: childItem.val().rua,
              bairro: childItem.val().bairro,
              cidade: childItem.val().cidade,
              uf: childItem.val().uf,
              numeroCasa: childItem.val().numeroCasa,
              complemento: childItem.val().complemento,
              selecionado: childItem.val().selecionado,
              dataSelecionado: childItem.val().dataSelecionado,
            };
            setJogadores(oldArray => [...oldArray, data]);
          });

          setLoading(false);
        });

    }
    dados();
  }, []);

  return (
    <SafeAreaView >
      <Text style={{color: '#000', paddingTop: 10}}>Selecione o jogador:</Text>
      {loading ?
    (

      <ActivityIndicator color='#909284' size={45} />
    ):
    (
      <FlatList
        keyExtractor={item => item.key}
        data={jogadores}
        renderItem={({item}) => <JogadoresSelecionados data={item} />}
      />
    )
    }
    </SafeAreaView>
  );
}
