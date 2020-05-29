import React, { useEffect } from 'react';
import {
  Modal, MessageBoxFunctionalLayout, Layout, Loader,
} from 'wix-style-react';
import { useSelector, useDispatch } from 'react-redux';
import { editTopic, getTopic, suspendEditTopic } from '../../state/actions';
import EditTopicForm from '../topicsPage/EditTopicForm';
import { MODAL_MAX_HEIGHT } from '../../constants/Styling';
import {
  LOADING_EDIT_TOPIC, EDIT_TOPIC_SUCCEEDED, OPTIMISTIC_LOCKED,
} from '../../constants/EditTopicStatus';
import { FETCH_TOPIC_SUCCEEDED } from '../../constants/TopicStatus';
import { showErrorToast } from '../../state/actions/toast';

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
    const oldTopic = {
      parentTopicId: topicInfo.parentId,
      topicId: topicInfo.id,
      subject: topicInfo.subject,
      description: topicInfo.description,
    };
    if (oldTopic.parentTopicId === editedTopic.parentTopicId && oldTopic.subject === editedTopic.subject && oldTopic.description === editedTopic.description)
      dispatch(showErrorToast('Change something! :)'));
    else
      dispatch(editTopic(oldTopic, editedTopic));
  };

  if (editTopicStatus === EDIT_TOPIC_SUCCEEDED)
    onCloseModal();

  // if (editTopicStatus === OPTIMISTIC_LOCKED)
  // confirm('Someone has already updated this topic. Do you want to overwrite changes?');

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
            : <div style={{ textAlign: 'center' }}><Loader size="large" /></div>}
        </MessageBoxFunctionalLayout>
      </Modal>
    </Layout>
  );
};
export default EditTopicModal;
