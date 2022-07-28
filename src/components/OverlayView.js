import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useState, useRef} from 'react';

//Icones
import cadastroIcon from '../assets/user-plus.png';
import listarIcon from '../assets/users.png';
import menuIcon from '../assets/menu.png';
import fecharIcon from '../assets/close.png';

//component
import TabButton from './TabButton';
import Cadastro from '../pages/Cadastro';
import About from '../pages/About';

export default function OverlayView() {
  //Pegar as Paginas
  const [currentTab, setCurrentTab] = useState('Cadastro');
  const [currentPage, setCurrentPage] = useState(<Cadastro />);

  //Pegar o status do menu
  const [showMenu, setShowMenu] = useState(false);

  //Propiedades da Animação
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'flex-start', padding: 20}}>
        <View style={styles.tabBar}>
          {
            // tab bar buttons
          }
          {TabButton(
            currentTab,
            setCurrentTab,
            'Cadastro',
            cadastroIcon,
            <Cadastro />,
            setCurrentPage,
          )}
          {TabButton(
            currentTab,
            setCurrentTab,
            'About',
            listarIcon,
            <About />,
            setCurrentPage,
          )}
        </View>
      </View>

      {
        //Pagina
      }
      <Animated.View
        style={[
          styles.animatedView,

          {
            transform: [{scale: scaleValue}, {translateX: offsetValue}],

            borderRadius: showMenu ? 15 : 0,
          },
        ]}>
        {
          //Animação do Menu
        }
        <Animated.View
          style={{
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}>
          <TouchableOpacity
            onPress={() => {
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(offsetValue, {
                toValue: showMenu ? 0 : 220,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(closeButtonOffset, {
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(opacityValue,
                {
                  toValue: showMenu ? 1 : 0,
                  duration: 100,
                  useNativeDriver: true
                }
                ).start();

              setShowMenu(!showMenu);
            }}>
            <Image
              source={showMenu ? fecharIcon : menuIcon}
              style={styles.menu}
            />
          <Text style={styles.title}>{currentTab}</Text> 
          </TouchableOpacity>
          <Animated.View style={[styles.pageView, {opacity: opacityValue}]}>{currentPage}</Animated.View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  animatedView: {
    flexGrow: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 20,
  },
  menu: {
    width: 25,
    height: 25,
    tintColor: '#000',
    marginTop: 40,
  },
  tabBar: {
    flexGrow: 1,
    marginTop: 50,
  },
  pageView: {
    width: '100%',
    height: '80%',
    backgroundColor: 'transparent',
    borderRadius: 5,


  },
});
