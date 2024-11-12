import React from 'react';
import {Text, View} from 'react-native';
import {xml} from '../../assets/logo';
import {SvgXml} from 'react-native-svg';

export default function SplashScreen() {
  return (
    <View className="bg-primary flex-1 p-8 justify-center items-center">
      <SvgXml xml={xml} width="200" height="200" />
      <Text className="text-center text-xl text-dark mb-4">
        Seja bem-vindo(a)!
      </Text>
      <Text className="text-accent text-center text-base">
        Estamos muito felizes em tê-lo(a) conosco! No Pet Step, nosso
        compromisso é ajudar seu pet a ter momentos de alegria e diversão em
        cada passeio. Conte conosco para proporcionar uma vida mais feliz e
        ativa ao seu amigo de quatro patas!
      </Text>
    </View>
  );
}
