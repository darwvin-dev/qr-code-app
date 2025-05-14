import React, { useState } from "react";
import { Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedResult, setScannedResult] = useState('');

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScan = ({ data }) => {
    if (!data) return;
    setScannedResult(data);
    setTimeout(() => navigation.goBack(), 2000); // Auto-return after scan
  };

  if (hasPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScan}
        ratio="turbo"
        style={{ flex: 1 }}
      />
      
      {scannedResult && (
        <View 
          style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            padding: 20,
            backgroundColor: '#5E72E480',
            borderRadius: 10
          }}
        >
          <Text>Scanned Result:</Text>
          <Text style={{ fontWeight: 'bold' }}>{scannedResult}</Text>
        </View>
      )}
    </View>
  );
};

export default ScannerScreen;