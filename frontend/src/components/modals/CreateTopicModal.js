import React from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { createNewTopic, suspendCreateTopic } from '../../state/actions';
import CreateNewTopicForm from '../topicsPage/CreateNewTopicForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import {
  LOADING_CREATE_TOPIC, CREATE_TOPIC_SUCCEEDED,
} from '../../constants/TopicStatus';

const CreateTopicModal = ({ isModalOpened, onCloseModal }) => {
  const dispatch = useDispatch();
  const topicStatus = useSelector(state => state.topic.status);

  if (topicStatus === CREATE_TOPIC_SUCCEEDED)
    onCloseModal();

  const createTopic = topic => {
    dispatch(createNewTopic(topic));
  };

  return (
    <Layout cols={1}>
      <Modal
        isOpen={isModalOpened}
        shouldCloseOnOverlayClick
        onRequestClose={onCloseModal}
      >
        <MessageBoxFunctionalLayout
          title="Create new topic"
          maxHeight={MODAL_MAX_HEIGHT}
          onClose={onCloseModal}
        >
          <CreateNewTopicForm onCreate={topic => createTopic(topic)} />
        </MessageBoxFunctionalLayout>
      </Modal>
    </Layout>
  );
};
export default CreateTopicModal;
