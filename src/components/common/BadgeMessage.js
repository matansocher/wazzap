import React from 'react';
import { View } from 'react-native';
import { Badge } from 'react-native-elements';

const BadgeMessage = ({ isUnraed, thirdColor, primaryColor }) => {
  if (isUnraed === "None" || isUnraed === 0) {
    return <View />;
  }
  return (
    <View>
      <Badge
        value={isUnraed}
        containerStyle={{ backgroundColor: thirdColor }}
        textStyle={{ color: primaryColor }} />
    </View>
  );
}

export default BadgeMessage;