import React from 'react';
import {
  Layout, Text, Divider,
} from 'wix-style-react';
import Employee from './Employee';


const TeamsTab = ({ topic }) => {
  // TODO: algoritmas paieskai i gyli nuo saves visu darbuotoju, kurie mokesi sia tema (arba is backend).
  // Atrinkti pagal id ir progressStatus
  return (
    <Layout cols={1}>
      <Text skin="premium" size="medium" weight="normal">
        Teams have already learned this topic
      </Text>
      <Divider />
      {topic.teams.map((item, index) => (
        <Employee item={item} />
      ))}
    </Layout>
  );
};
export default TeamsTab;
