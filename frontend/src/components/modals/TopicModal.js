import React, { useEffect, useState } from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader, Card, Tabs,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { getTopic } from '../../state/actions';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import { LOADING_FETCH_TOPIC } from '../../constants/TopicStatus';
import TopicTab from './topicModal/TopicTab';
import SubordinatesTab from './topicModal/SubordinatesTab';
import TeamsTab from './topicModal/TeamsTab';

const TopicModal = ({ isModalOpened, onCloseModal, topic }) => {
  const [activeTabId, setActiveTabId] = useState(1);

  const dispatch = useDispatch();

  const topicStatus = useSelector(state => state.topic.status);
  const topicInfo = useSelector(state => state.topic.topic);

  const isLoading = topicStatus === LOADING_FETCH_TOPIC;

  useEffect(() => {
    dispatch(getTopic(topic.id));
  }, []);

  const onCloseModalWrapper = () => {
    onCloseModal();
  };

  const changeTab = value => {
    setActiveTabId(value.id);
  };

  const tabToRender = () => {
    let tab;
    if (activeTabId === 1)
      tab = <TopicTab topic={topicInfo} />;
    else if (activeTabId === 2)
      tab = <SubordinatesTab topic={topicInfo} />;
    else if (activeTabId === 3)
      tab = <TeamsTab topic={topicInfo} />;
    return tab;
  };

  return (
    <Layout cols={1}>
      <Modal
        isOpen={isModalOpened}
        shouldCloseOnOverlayClick
        onRequestClose={onCloseModalWrapper}
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
                    { id: 2, title: 'Subordinates' },
                    { id: 3, title: 'Teams' },
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
