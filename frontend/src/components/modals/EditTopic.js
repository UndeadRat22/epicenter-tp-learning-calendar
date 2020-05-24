import React, { useEffect } from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { editTopic, getTopic, suspendEditTopic } from '../../state/actions';
import EditTopicForm from '../topicsPage/EditTopicForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import {
  LOADING_EDIT_TOPIC, EDIT_TOPIC_FAILED, EDIT_TOPIC_SUCCEEDED,
} from '../../constants/EditTopicStatus';
import { FETCH_TOPIC_SUCCEEDED } from '../../constants/TopicStatus';
import { NOTIFICATION_AUTO_HIDE_TIMEOUT } from '../../constants/General';
import SuccessNotification from '../SuccessNotification';
import ErrorNotification from '../ErrorNotification';

const EditTopicModal = ({ isModalOpened, onCloseModal, topic }) => {
  const dispatch = useDispatch();
  const editTopicStatus = useSelector(state => state.editTopic.status);

  const showNotificationSuccess = editTopicStatus === EDIT_TOPIC_SUCCEEDED;
  const showNotificationError = editTopicStatus === EDIT_TOPIC_FAILED;
  const isLoading = editTopicStatus === LOADING_EDIT_TOPIC;

  const topicInfo = useSelector(state => state.topic.topic);
  const topicStatus = useSelector(state => state.topic.status);
  const isTopicFetched = topicStatus === FETCH_TOPIC_SUCCEEDED;

  useEffect(() => {
    dispatch(getTopic(topic.id));
  }, []);

  if (editTopicStatus === EDIT_TOPIC_SUCCEEDED)
    setTimeout(() => { onCloseModalWrapper(); }, NOTIFICATION_AUTO_HIDE_TIMEOUT);

  const onEditTopic = editedTopic => {
    dispatch(editTopic(editedTopic));
  };

  const onCloseModalWrapper = () => {
    dispatch(suspendEditTopic());
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
          title={`Edit ${topic.subject}`}
          maxHeight={MODAL_MAX_HEIGHT}
          onClose={onCloseModal}
        >
          {isLoading && <Loader size="tiny" />}
          {isTopicFetched
            ? <EditTopicForm onEdit={editedTopic => onEditTopic(editedTopic)} topic={topicInfo} />
            : <Loader size="tiny" />}
        </MessageBoxFunctionalLayout>
        {showNotificationSuccess && (
        <SuccessNotification text="Topic was edited successfully" />
        )}
        {showNotificationError && (
        <ErrorNotification text="Something went wrong" />
        )}
      </Modal>
    </Layout>
  );
};
export default EditTopicModal;
