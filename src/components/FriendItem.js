import React, { Component } from 'react';
import _ from 'lodash';
import { Card, CardItem, Left, Thumbnail, Body } from 'native-base';
import { getAvatar } from '../actions/CommonFunctions';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { ListItem } from 'material-ui/List';
// import Divider from 'material-ui/Divider';
// import Avatar from 'material-ui/Avatar';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class FriendItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  addAsFriend = () => {
    this.props.addAsFriend(this.props.friend);
  }

  render() {
    console.log(this.props.friend)
    const { friend } = this.props;
    if(_.isEmpty(friend) || !friend.name || ! friend.avatar) {
      return <View />
    }
    const { name, avatar } = friend;
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={getAvatar(avatar)} />
            <Body>
              <Text>{name}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  }
}

export default FriendItem;

{/* <div className="friend">
<MuiThemeProvider>
  <div>
    <ListItem
      style={{ color: '#ffffff' }}
      primaryText={name}
      leftAvatar={
        <Avatar size={45} src={require(`../avatars/${avatar}`)}
          style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }} />
      }
    />

    <IconMenu
      className="pull-right three-dots-add-friend"
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem primaryText="Add As Friend" onClick={this.addAsFriend} />
    </IconMenu>
    <Divider />
  </div>
</MuiThemeProvider>
</div> */}