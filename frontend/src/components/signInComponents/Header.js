import React from 'react';
import '../../pages/SignIn.global.scss';
import {
  Layout,
  Image,
  Text,
} from 'wix-style-react';

const Header = () => {
  const logo = require('../../../assets/logo.jpeg');

  return (
    <div align="center" className="box">
      <Layout cols={1}>
        <Image src={logo} height="200px" width="200px" />
        <h1 className="header">The Learning Center</h1>
        <Text skin="premium"> Log in to get going </Text>
      </Layout>
    </div>
  );
};
export default Header;
