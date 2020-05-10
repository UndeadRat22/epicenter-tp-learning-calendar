import React, { useState, useEffect } from 'react';
import { Layout, Text } from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../components/auth/Header';
import RegisterForm from '../components/auth/RegisterForm';
import s from './Register.scss';
import { register, validateInviteId } from '../state/actions';
import {
  REGISTER_SUCCEEDED, LOADING_VALIDATE_INVITEID, VALIDATE_INVITEID_FAILED, LOADING_REGISTER,
} from '../constants/RegisterStatus';
import Notification from '../components/Notification';
import LoadingIndicator from '../components/LoadingIndicator';

const Register = () => {
  const dispatch = useDispatch();

  const registerStatus = useSelector(state => state.register.status);
  const invitedUser = useSelector(state => state.register.invitedUser);
  const inviterUser = useSelector(state => state.register.inviterUser);

  const { inviteId } = useParams();

  useEffect(() => {
    dispatch(validateInviteId(inviteId));
  }, [inviteId, dispatch]);

  const showNotification = registerStatus === REGISTER_SUCCEEDED;

  // eslint-disable-next-line no-shadow
  const registerUser = ({ inviteId, password }) => {
    dispatch(register({ inviteId, password }));
  };

  // TODO: decide whether we should log user in as soon as he registers
  // or just display a notification
  // const user = useSelector(state => state.auth.user);
  // if (authStatus === REGISTER_SUCCEEDED)
  //   dispatch(login(user));

  if (registerStatus === LOADING_VALIDATE_INVITEID)
    return <LoadingIndicator text="Loading session..." />;

  // TODO: better UI
  if (registerStatus === VALIDATE_INVITEID_FAILED)
    return <div>Wrong invite id</div>;

  // TODO: make text look better
  return (
    <div className={s.register}>
      <Layout cols={1}>
        <Header text="Finish your registration" isLoading={registerStatus === LOADING_REGISTER} />
        <Text>
          {`Hey, ${invitedUser.firstName} ${invitedUser.lastName} (${invitedUser.email})
          You have been invited by ${inviterUser.firstName} ${inviterUser.lastName} (${inviterUser.email})`}
        </Text>
        {showNotification && (
          <Notification
            type="success"
            text="Registration successful"
          />
        )}
        <RegisterForm
          onRegister={credentials => registerUser(credentials)}
        />
      </Layout>
    </div>
  );
};
export default Register;
