import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  ComposerHeader, Avatar, PopoverMenu,
} from 'wix-style-react';
import Home from 'wix-ui-icons-common/Home';
import Archive from 'wix-ui-icons-common/Archive';
import UserLeave from 'wix-ui-icons-common/UserLeave';
import User from 'wix-ui-icons-common/User';
import Users from 'wix-ui-icons-common/Users';
import UserAdd from 'wix-ui-icons-common/UserAdd';
import Edit from 'wix-ui-icons-common/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../state/actions/auth';
import InviteModal from './modals/InviteModal';
import ChangePasswordModal from './modals/ChangePasswordModal';
import TopNavBarTextButton from './TopNavBarTextButton';

const TopNavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const user = useSelector(state => state.auth.user);

  const [isOpenedInvite, setIsOpenedInvite] = useState(false);
  const [isOpenedChangePassword, setIsOpenedChangePassword] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <ComposerHeader>
      <ComposerHeader.Actions justifyContent="flex-start" margin="20px">
        <TopNavBarTextButton text="Home" Icon={<Home />} path="/home" isCurrentPath={pathname === '/home'} />
        <TopNavBarTextButton text="Topics" Icon={<Archive />} path="/topics" isCurrentPath={pathname === '/topics'} />
        <TopNavBarTextButton text="My Team" Icon={<User />} path="/myteam" isCurrentPath={pathname === '/myteam'} />
        <TopNavBarTextButton text="Subordinates" Icon={<Users />} path="/subordinates" isCurrentPath={pathname === '/subordinates'} />
      </ComposerHeader.Actions>
      <ComposerHeader.MainActions>
        <InviteModal isModalOpened={isOpenedInvite} onCloseModal={() => setIsOpenedInvite(false)} />
        <ChangePasswordModal isModalOpened={isOpenedChangePassword} onCloseModal={() => setIsOpenedChangePassword(false)} />
        <PopoverMenu
          placement="bottom-end"
          triggerElement={
               (
                 <Avatar
                   name={`${user.firstName} ${user.lastName}`}
                   color="A1"
                   size="size36"
                 />
              )
            }
        >
          <PopoverMenu.MenuItem
            onClick={() => setIsOpenedInvite(true)}
            prefixIcon={<UserAdd />}
            text="Invite"
          />
          <PopoverMenu.MenuItem
            onClick={() => setIsOpenedChangePassword(true)}
            prefixIcon={<Edit />}
            text="Change password"
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
