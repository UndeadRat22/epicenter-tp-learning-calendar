import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { createNewTopic, suspendCreateTopic } from '../../state/actions';
import CreateNewTopicForm from '../topicsPage/CreateNewTopicForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import {
  LOADING_CREATE_TOPIC, CREATE_TOPIC_FAILED, CREATE_TOPIC_SUCCEEDED,
} from '../../constants/TopicStatus';
import { NOTIFICATION_AUTO_HIDE_TIMEOUT } from '../../constants/General';
import SuccessNotification from '../SuccessNotification';
import ErrorNotification from '../ErrorNotification';

const CreateTopicModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const topicStatus = useSelector(state => state.topic.status);

  const showNotificationSuccess = topicStatus === CREATE_TOPIC_SUCCEEDED;
  const showNotificationError = topicStatus === CREATE_TOPIC_FAILED;
  const isLoading = topicStatus === LOADING_CREATE_TOPIC;

  if (topicStatus === CREATE_TOPIC_SUCCEEDED)
    setTimeout(() => { onCloseModalWrapper(); }, NOTIFICATION_AUTO_HIDE_TIMEOUT);

  const createTopic = topic => {
    dispatch(createNewTopic(topic));
  };

  const onCloseModalWrapper = () => {
    dispatch(suspendCreateTopic());
    onCloseModal();
  };

  return (
    <Layout cols={1}>
      <Modal
        isOpen={isModalOpened}
        shouldCloseOnOverlayClick
        onRequestClose={onCloseModalWrapper}
      >
        <MessageBoxFunctionalLayout
          title="Create new topic"
          maxHeight={MODAL_MAX_HEIGHT}
          onClose={onCloseModal}
        >
          {isLoading && <Loader size="tiny" />}
          <CreateNewTopicForm onCreate={topic => createTopic(topic)} />
        </MessageBoxFunctionalLayout>
        {showNotificationSuccess && (
        <SuccessNotification text="Topic was created successfully" />
        )}
        {showNotificationError && (
        <ErrorNotification text="Something went wrong" />
        )}
      </Modal>
    </Layout>
  );
};
export default CreateTopicModal;
