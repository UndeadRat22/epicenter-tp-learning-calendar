import React from 'react';
import {
  Layout,
  Image,
  Text,
  Heading,
  Loader,
} from 'wix-style-react';
import s from './Header.scss';

const Header = ({ text, isLoading }) => {
  const logo = require('../../../assets/logo.jpeg');

  return (
    <div align="center" className={s.box}>
      <Layout cols={1}>
        <Image src={logo} height="200px" width="200px" />
        <Heading as="h1">The Learning Center</Heading>
        <Text skin="premium">
          {text}
          {'  '}
          {isLoading && <Loader size="tiny" />}
        </Text>
      </Layout>
    </div>
  );
};
export default Header;
