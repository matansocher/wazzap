import React from 'react';
import { Thumbnail, } from 'native-base';

const UserAvatar = ({ avatar }) => {

  getAvatar = name => {

    if (!name) {
      return require("../../assets/avatars/default.png");
    }
  
    // const fullName = `../../assets/avatars/${name}`.split('').join('');
    // return require(fullName);
  
    switch (name) {
      case 'contact1.png':
        return require("../../assets/avatars/contact1.png");
      case 'contact2.png':
        return require("../../assets/avatars/contact2.png");
      case 'contact3.png':
        return require("../../assets/avatars/contact3.png");
      case 'contact4.png':
        return require("../../assets/avatars/contact4.png");
      case 'contact5.png':
        return require("../../assets/avatars/contact5.png");
      case 'contact6.png':
        return require("../../assets/avatars/contact6.png");
      case 'contact7.png':
        return require("../../assets/avatars/contact7.png");
      default:
        return require("../../assets/avatars/default.png");
    }
  }

  return (
    <Thumbnail source={getAvatar(avatar)} />
  );
}

export default UserAvatar;