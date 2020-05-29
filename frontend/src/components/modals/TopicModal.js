import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, Layout, Loader, MessageBoxFunctionalLayout, Modal, Tabs,
} from 'wix-style-react';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import { LOADING_FETCH_TOPIC } from '../../constants/TopicStatus';
import { getTopic } from '../../state/actions';
import EmployeesTab from './topicModal/EmployeesTab';
import SubordinatesTab from './topicModal/SubordinatesTab';
import TeamsTab from './topicModal/TeamsTab';
import TopicTab from './topicModal/TopicTab';

const TopicModal = ({ isModalOpened, onCloseModal, topic }) => {
  const [activeTabId, setActiveTabId] = useState(1);

  const dispatch = useDispatch();

  const { topic: topicInfo, status: topicStatus } = useSelector(state => state.topic);
  const isLoading = topicStatus === LOADING_FETCH_TOPIC;

  useEffect(() => {
    dispatch(getTopic(topic.id));
  }, []);

  const changeTab = value => {
    setActiveTabId(value.id);
  };

  const tabToRender = () => {
    let tab;
    if (activeTabId === 1)
      tab = <TopicTab topic={topicInfo} />;
    else if (activeTabId === 2)
      tab = <EmployeesTab topic={topicInfo} />;
    else if (activeTabId === 3)
      tab = <TeamsTab topic={topicInfo} />;
    else if (activeTabId === 4)
      tab = <SubordinatesTab topic={topicInfo} />;
    return tab;
  };

  return (
    <Layout cols={1}>
      <Modal
        isOpen={isModalOpened}
        shouldCloseOnOverlayClick
        onRequestClose={onCloseModal}
      >
        <MessageBoxFunctionalLayout
          title={topic.subject}
          height={MODAL_MAX_HEIGHT}
          onClose={onCloseModal}
        >
          {isLoading && <Loader size="tiny" />}
          <Card>
            <Card.Header
              title={(
                <Tabs
                  activeId={activeTabId}
                  onClick={changeTab}
                  items={[
                    { id: 1, title: 'About' },
                    { id: 2, title: 'My Team' },
                    { id: 3, title: 'Teams' },
                    { id: 4, title: 'Subordinates' },
                  ]}
                />
              )}
            />
            <Card.Content>
              {tabToRender()}
            </Card.Content>
          </Card>
        </MessageBoxFunctionalLayout>
      </Modal>
    </Layout>
  );
};
export default TopicModal;
