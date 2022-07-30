import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

// botoes multiplos
const TabButton = (currentTab, setCurrentTab, title, image, currentPage, setCurrentPage) => {
    return (
      <TouchableOpacity
        onPress={() => {
        
            setCurrentTab(title);
            setCurrentPage(currentPage)
    
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            paddingRight: 35,
            paddingLeft: 13,
            backgroundColor: currentTab == title ? '#FFF' : 'transparent',
            borderRadius: 6,
            marginTop: 15,
                top: 0,
    bottom: 0,
    left: 0,
    right: 0,
          }}>
          <Image
            source={image}
            style={{
              width: 25,
              height: 25,
              tintColor: currentTab == title ? '#CC8A56' : '#fff',
            }}/>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              paddingLeft: 15,
              color: currentTab == title ? '#CC8A56' : '#fff',
            }}>
            {title}
          </Text>

          
        </View>
      </TouchableOpacity>
    );
  };
  export default TabButton;