import React, { useEffect } from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { editTopic, getTopic, suspendEditTopic } from '../../state/actions';
import EditTopicForm from '../topicsPage/EditTopicForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import {
  LOADING_EDIT_TOPIC, EDIT_TOPIC_SUCCEEDED,
} from '../../constants/EditTopicStatus';
import { FETCH_TOPIC_SUCCEEDED } from '../../constants/TopicStatus';

const EditTopicModal = ({ isModalOpened, onCloseModal, topic }) => {
  const dispatch = useDispatch();
  const editTopicStatus = useSelector(state => state.editTopic.status);

  const isLoading = editTopicStatus === LOADING_EDIT_TOPIC;

  const topicInfo = useSelector(state => state.topic.topic);
  const topicStatus = useSelector(state => state.topic.status);

  const isTopicFetched = topicStatus === FETCH_TOPIC_SUCCEEDED;

  useEffect(() => {
    dispatch(getTopic(topic.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onEditTopic = editedTopic => {
    dispatch(editTopic(topic, editedTopic));
  };

  if (editTopicStatus === EDIT_TOPIC_SUCCEEDED)
    onCloseModal();

  return (
    <Layout cols={1}>
      <Modal
        isOpen={isModalOpened}
        shouldCloseOnOverlayClick
        onRequestClose={onCloseModal}
      >
        <MessageBoxFunctionalLayout
          title={`Edit ${topic.subject}`}
          maxHeight={MODAL_MAX_HEIGHT}
          onClose={onCloseModal}
        >
          {isLoading && <div style={{ textAlign: 'center' }}><Loader size="small" /></div> }
          {isTopicFetched
            ? <EditTopicForm onEdit={editedTopic => onEditTopic(editedTopic)} topic={topicInfo} />
            : <Loader size="tiny" />}
        </MessageBoxFunctionalLayout>
      </Modal>
    </Layout>
  );
};
export default EditTopicModal;
