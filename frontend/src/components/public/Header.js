import React from 'react';
import '../../pages/SignIn.global.scss';
import {
  Layout,
  Image,
  Text,
  Heading,
} from 'wix-style-react';

const Header = ({ text }) => {
  const logo = require('../../../assets/logo.jpeg');

  return (
    <div align="center" className="box">
      <Layout cols={1}>
        <Image src={logo} height="200px" width="200px" />
        <Heading as="h1">The Learning Center</Heading>
        <Text skin="premium">{ text }</Text>
      </Layout>
    </div>
  );
};
export default Header;
