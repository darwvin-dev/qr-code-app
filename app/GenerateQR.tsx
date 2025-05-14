import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import QrCodeSVG from "../components/QrCodeSVG";

type RootStackParamList = {
  Home: undefined;
  GenerateQR: undefined;
  Scanner: undefined;
};

type GenerateQRProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "GenerateQR">;
};
const GenerateQR = ({ navigation }: GenerateQRProps) => {
  const [qrData, setQrData] = useState('https://example.com');
  const [color, setColor] = useState('#5E72E4');

  const generateQR = async () => {
    const qrCodeSvg = <svg>...</svg>; // Use Expo's QR Code library
    await saveAndShare(qrCodeSvg);
  };

  const saveAndShare = async (qrSVG: any) => {
    const path = `${FileSystem.cacheDirectory}/qrcode.svg`;
    
    await FileSystem.writeAsStringAsync(path, qrSVG);
    Sharing.shareAsync(path);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter URL/Text"
        value={qrData}
        onChangeText={setQrData}
        style={{
          borderWidth: 1,
          borderColor: '#5E72E4',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 10,
          marginBottom: 20
        }}
      />

      <Text>Select QR Color:</Text>
      <View style={{ flexDirection: 'row' }}>
        {[ ['#FF6B6B', '#5E72E4'], ['#3EDB8C'] ].map((colorSet, i) => (
          <TouchableOpacity 
            onPress={() => setColor(colorSet[0])}
            style={{
              width: 40,
              height: 40,
              backgroundColor: colorSet[0],
              marginHorizontal: 5
            }}
          />
        ))}
      </View>

      <Button title="Generate QR" onPress={generateQR} />

      {qrData && (
        <QrCodeSVG 
          value={qrData}
          size={200}
          color={color}
          bgColor="#fff"
        />
      )}
    </View>
  );
};

export default GenerateQR;