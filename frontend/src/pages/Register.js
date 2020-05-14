import React, { useEffect } from 'react';
import { Layout, Text } from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../components/auth/Header';
import RegisterForm from '../components/auth/RegisterForm';
import SuccessNotification from '../components/SuccessNotification';
import ErrorNotification from '../components/ErrorNotification';
import s from './Register.scss';
import { register, validateInviteId } from '../state/actions';
import {
  REGISTER_SUCCEEDED, REGISTER_FAILED, LOADING_VALIDATE_INVITEID, VALIDATE_INVITEID_FAILED, LOADING_REGISTER,
} from '../constants/RegisterStatus';
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

  const showNotificationSuccess = registerStatus === REGISTER_SUCCEEDED;
  const showNotificationError = registerStatus === REGISTER_FAILED;

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

  if (registerStatus === VALIDATE_INVITEID_FAILED) {
    return (
      <Layout cols={1}>
        <Header text="Wrong invite id" />
      </Layout>
    );
  }

  return (
    <div className={s.register}>
      <Layout cols={1}>
        <Header text="Finish your registration" isLoading={registerStatus === LOADING_REGISTER} />
        <div align="center">
          <Text
            skin="disabled"
            size="small"
          >
            {`Hey, ${invitedUser.firstName} ${invitedUser.lastName} (${invitedUser.email})
              You have been invited by ${inviterUser.firstName} ${inviterUser.lastName} (${inviterUser.email})`}
          </Text>
        </div>
        <RegisterForm
          onRegister={credentials => registerUser(credentials)}
        />
        {showNotificationSuccess && (
          <SuccessNotification text="Registration successful" />
        )}
        {showNotificationError && (
          <ErrorNotification text="Registration failed" />
        )}
      </Layout>
    </div>
  );
};
export default Register;
