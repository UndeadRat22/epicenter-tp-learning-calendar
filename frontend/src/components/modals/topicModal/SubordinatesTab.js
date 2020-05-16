import React from 'react';
import {
  Layout, Text, Divider,
} from 'wix-style-react';
import Employee from './Employee';


const SubordinatesTab = ({ topic }) => {
  // TODO: algorithm paieskai i gyli nuo saves visu darbuotoju, kurie mokesi sia tema.
  // Atrinkti pagal id ir progressStatus
  return (
    <Layout cols={1}>
      <Text skin="premium" size="medium" weight="normal">
        Subordinates have already learned this topic
      </Text>
      <Divider />
      {topic.employees.map((item, index) => (
        <Employee item={item} />
      ))}
    </Layout>
  );
};
export default SubordinatesTab;
