import React, { useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

type Props = {
  value: string;
  size?: number;
  color?: string;
  bgColor?: string;
};

export default function QrCodeSVG({
  value,
  size = 200,
  color = "#000",
  bgColor = "#fff",
}: Props) {
  const svgRef = useRef<QRCode | null>(null);

  const handleShare = async () => {
    if (!svgRef.current) return;

    try {
      // Convert QR SVG to data URL
      svgRef.current.toDataURL(async (data: any) => {
        const path = FileSystem.cacheDirectory + "qrcode.png";
        await FileSystem.writeAsStringAsync(path, data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(path);
      });
    } catch (err) {
      Alert.alert("Error", "Failed to export QR code");
    }
  };

  return (
    <View style={styles.wrapper}>
      <QRCode
        value={value}
        size={size}
        color={color}
        backgroundColor={bgColor}
        getRef={(ref) => (svgRef.current = ref)}
      />

      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Share QR Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#5E72E4",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
