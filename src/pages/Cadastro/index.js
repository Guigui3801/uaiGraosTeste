import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

import searchIcon from '../../assets/search.png';
import api from '../../services/viaCep';
import firebase from '../../services/firebaseConnection';

export default function Cadastro() {
  //variaveis para cadastrar o jogador
  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null);
  const [dataNasc, setDataNasc] = useState('');
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [complemento, setComplemento] = useState('');
  const [selecionado, setSelecionado] = useState(false);
  const inputRef = useRef();

  function limpar() {
    setCep('');
    setNome('');
    setDataNasc('');
    setEmail('');
    setNumeroCasa(''), setComplemento(''), setCepUser(null);
    inputRef.current.focus();
  }
  // funções viaCep
  async function buscar() {
    if (cep == '') {
      alert('Digite um cep válido');
      setCep('');
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss(); //Fechar o teclado
    } catch (error) {
      console.log('ERRRO' + error);
      alert('CEP não encontrado!');
    }
  }
  //Função para cadastrar o jogador no banco de dados

  async function cadastrar() {
    if (
      (nome !== '') &
      (dataNasc !== '') &
      (email !== '') &
      (cep !== '') &
      (numeroCasa !== '')
    ) {
      let jogadores = await firebase.database().ref('jogadores');
      let chave = jogadores.push().key;

      jogadores.child(chave).set({
        nome: nome,
        dataNasc: dataNasc,
        email: email,
        cep: cep,
        rua: cepUser.logradouro,
        bairro: cepUser.bairro,
        cidade: cepUser.localidade,
        uf: cepUser.uf,
        numeroCasa: numeroCasa,
        complemento: complemento,
        selecionado: selecionado,
      });
      alert('Cadastrado com Sucesso!');
      limpar();
    } else {
      alert('Preencha todos os dados corretamente!');
    }
  }

  return (
    //View para alinhar o teclado com o text input
    <KeyboardAvoidingView
      style={styles.container}
      behavior={'height'}
      keyboardVerticalOffset={120}>
      <ScrollView>
        <View>
          <Text style={styles.text}>Nome:</Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="(Ex.: José de Assis)"
            placeholderTextColor="#808080"
            value={nome}
            onChangeText={text => {
              setNome(text);
            }}
          />
        </View>

        <View>
          <Text style={styles.text}>Data de nascimento:</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            style={styles.input}
            placeholder="(Ex.: 24/05/2022)"
            placeholderTextColor="#808080"
            value={dataNasc}
            onChangeText={text => {
              setDataNasc(text);
            }}
          />
        </View>

        <View>
          <Text style={styles.text}>E-mail do Jogador:</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#808080"
            placeholder="(Ex.: email@email.com)"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
          />
        </View>

        <View>
          <Text style={styles.text}>Endereço:</Text>
          <View style={styles.areaBuscaCep}>
            <TextInputMask
              style={styles.inputCep}
              type={'custom'}
              options={{
                mask: '99999-999',
              }}
              value={cep}
              onChangeText={text => setCep(text)}
              keyboardType="number-pad"
              placeholder="CEP: (Ex.: 123456-789)"
              placeholderTextColor="#808080"
            />

            {/*Botão para buscar o CEP atrvés da api viaCep*/}
            <TouchableOpacity style={styles.botaoCep} onPress={buscar}>
              <Image source={searchIcon} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Rua/Av.:"
            editable={false}
            style={[styles.input, {backgroundColor: '#c0c0c0'}]}
            value={cepUser && cepUser.logradouro}
            placeholderTextColor="#808080"
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              editable={false}
              placeholder="Bairro:"
              placeholderTextColor="#808080"
              style={[styles.input, {backgroundColor: '#c0c0c0', width: 170}]}
              value={cepUser && cepUser.bairro}
            />
            <TextInput
              editable={false}
              placeholder="Cidade:"
              placeholderTextColor="#808080"
              style={[styles.input, {backgroundColor: '#c0c0c0', width: 170}]}
              value={cepUser && cepUser.localidade}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              editable={false}
              placeholder="UF: (Ex.: MG)"
              placeholderTextColor="#808080"
              style={[styles.input, {backgroundColor: '#c0c0c0', width: 170}]}
              value={cepUser && cepUser.uf}
            />
            <TextInput
              placeholder="Número: "
              placeholderTextColor="#808080"
              style={[styles.input, {width: 170}]}
              value={numeroCasa}
              onChangeText={text => setNumeroCasa(text)}
            />
          </View>

          <TextInput
            placeholder="Complemento: (Opcional)"
            placeholderTextColor="#808080"
            style={styles.input}
            value={complemento}
            onChangeText={text => setComplemento(text)}
          />
        </View>

        <View style={styles.areaBtn}>
          <TouchableOpacity style={styles.botaoCadastrar} onPress={cadastrar}>
            <Text style={{color: '#1e7ced'}}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={limpar} style={[styles.botaoLimpar]}>
            <Text style={{color: '#ff0000'}}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  text: {
    color: '#808080',
    fontSize: 16,
    paddingLeft: 5,
  },
  input: {
    width: 350,
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 5,
    fontSize: 18,
    padding: 5,
    marginTop: 5,
    color: '#000',
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  botao: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoText: {
    fontSize: 16,
    color: '#FFF',
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 22,
  },
  inputCep: {
    width: 290,
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 5,
    fontSize: 18,
    padding: 5,
    marginBottom: 3,
    marginTop: 5,
    color: '#000',
  },
  botaoCep: {
    width: 50,
    padding: 5,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 3,
    height: 40,
    borderColor: '#1e7ced',
    borderWidth: 1,
    tintColor: '#1e7ced',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCadastrar: {
    borderColor: '#1e7ced',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoLimpar: {
    borderColor: '#ff0000',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaBuscaCep: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 350,
    height: 40,
  },
  searchIcon: {
    width: 25,
    height: 25,
    tintColor: '#1e7ced',
  },
});
