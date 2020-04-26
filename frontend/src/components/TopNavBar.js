import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  ComposerHeader, TextButton, Avatar, PopoverMenu,
} from 'wix-style-react';
import Home from 'wix-ui-icons-common/Home';
import Archive from 'wix-ui-icons-common/Archive';
import Accessibility from 'wix-ui-icons-common/Accessibility';
import UserLeave from 'wix-ui-icons-common/UserLeave';
import User from 'wix-ui-icons-common/User';
import { useDispatch } from 'react-redux';
import { logout } from '../state/actions/auth';

const TopNavBar = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  // TODO: use weight="normal" for current page
  return (
    <ComposerHeader>
      <ComposerHeader.Actions justifyContent="flex-start" margin="20px">
        <TextButton
          weight="normal"
          skin="dark"
          as={Link}
          to="/home"
          style={{ paddingRight: '15px' }}
          underline="onHover"
          prefixIcon={<Home />}
        >
          Home
        </TextButton>
        <TextButton
          as={Link}
          skin="dark"
          to="/topics"
          style={{ paddingRight: '15px' }}
          underline="onHover"
          prefixIcon={<Archive />}
        >
          Topics
        </TextButton>
        <TextButton
          as={Link}
          skin="dark"
          to="/myteam"
          underline="onHover"
          style={{ paddingRight: '15px' }}
          prefixIcon={<Accessibility />}
        >
          My team
        </TextButton>
        <TextButton
          as={Link}
          skin="dark"
          to="/myteam"
          underline="onHover"
          style={{ paddingRight: '15px' }}
          prefixIcon={<Accessibility />}
        >
          Subordinates
        </TextButton>
      </ComposerHeader.Actions>
      <ComposerHeader.MainActions>
        <PopoverMenu
          placement="bottom-end"
          triggerElement={
              profilePicture ? (
                <Avatar
                  imgProps={{
                    src: 'https://randomuser.me/api/portraits/women/39.jpg',
                  }}
                  onClick={() => console.log('Avatar click!')}
                />
              ) : (
                <Avatar
                  name="Aurelija Cyg"
                  color="A1"
                  size="size36"
                  onClick={() => console.log('Avatar click!')}
                />
              )
            }
        >
          <PopoverMenu.MenuItem
            onClick={() => history.push('/profile')}
            prefixIcon={<User />}
            text="Profile"
          />
          <PopoverMenu.MenuItem
            onClick={() => history.push('/invite')}
            prefixIcon={<User />}
            text="Invite"
          />
          <PopoverMenu.MenuItem
            onClick={onLogout}
            prefixIcon={<UserLeave style={{ color: 'red' }} />}
            text="Logout"
          />
        </PopoverMenu>
      </ComposerHeader.MainActions>
    </ComposerHeader>
  );
};

export default TopNavBar;
