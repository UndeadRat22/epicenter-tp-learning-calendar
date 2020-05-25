import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Table, Text, TableActionCell, Loader,
} from 'wix-style-react';
import { useDispatch, useSelector } from 'react-redux';
import Edit from 'wix-ui-icons-common/Edit';
import OpenModal from 'wix-ui-icons-common/OpenModal';
import { getAllTopics } from '../../state/actions/allTopics';
import { LOADING_ALL_TOPICS } from '../../constants/AllTopicsStatus';
import CreateTopicModal from '../modals/CreateTopicModal';
import TopicModal from '../modals/TopicModal';
import EditTopicModal from '../modals/EditTopic';
import TopicsTableToolbar from './TopicsTableToolbar';

const AllTopicsTab = () => {
  const [activeSearch, setActiveSearch] = useState('');
  const [isOpenedCreateTopicModal, setIsOpenedCreateTopicModal] = useState(false);
  const [isOpenedTopicModal, setIsOpenedTopicModal] = useState(false);
  const [isOpenedEditTopicModal, setIsOpenedEditTopicModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});


  const topics = useSelector(state => state.allTopics.topics);
  const topicsStatus = useSelector(state => state.allTopics.status);

  const isLoading = topicsStatus === LOADING_ALL_TOPICS;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTopics());
  }, []);

  const handleOpenTopicModal = row => {
    setSelectedRow(row);
    setIsOpenedTopicModal(true);
  };

  const handleEditTopicModal = row => {
    setSelectedRow(row);
    setIsOpenedEditTopicModal(true);
  };

  const getFilteredData = () => {
    return topics.filter(({ subject }) => {
      const searchData = [subject].join(' ').toLowerCase();
      const searchQuery = activeSearch.trim().toLowerCase();
      if (searchQuery && searchData.indexOf(searchQuery) === -1)
        return false;
      return true;
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Table
            data={getFilteredData()}
            skin="neutral"
            columns={[
              { title: 'Topic', render: row => row.subject },
              {
                title: '',
                render: rowData => (
                  <TableActionCell
                    upgrade
                    secondaryActions={[
                      {
                        text: 'Edit',
                        icon: <Edit />,
                        onClick: () => handleEditTopicModal(rowData),
                      },
                      {
                        text: 'Open',
                        icon: <OpenModal />,
                        onClick: () => handleOpenTopicModal(rowData),
                      },
                    ]}
                    numOfVisibleSecondaryActions={2}
                  />
                ),
              },
            ]}
            onRowClick={rowData => handleOpenTopicModal(rowData)}
          >
            <TopicsTableToolbar
              activeSearch={activeSearch}
              onActiveSearch={searchValue => setActiveSearch(searchValue)}
              onOpenModal={() => setIsOpenedCreateTopicModal(true)}
            />
            <Table.Content />
            {!getFilteredData().length && (
            <Table.EmptyState
              subtitle={(
                isLoading ? <div style={{ textAlign: 'center' }}><Loader size="large" /></div> : (
                  <Text>
                    {'There are no search results matching '}
                    <Text weight="normal">{`"${activeSearch}"`}</Text>
                  </Text>
                )
              )}
            />
            )}
          </Table>
        </Col>
      </Row>
      <CreateTopicModal isModalOpened={isOpenedCreateTopicModal} onCloseModal={() => setIsOpenedCreateTopicModal(false)} />
      {isOpenedEditTopicModal
      && <EditTopicModal isModalOpened={isOpenedEditTopicModal} onCloseModal={() => setIsOpenedEditTopicModal(false)} topic={selectedRow} />}
      {isOpenedTopicModal
      && <TopicModal isModalOpened={isOpenedTopicModal} onCloseModal={() => setIsOpenedTopicModal(false)} topic={selectedRow} />}
    </Container>
  );
};

export default AllTopicsTab;
