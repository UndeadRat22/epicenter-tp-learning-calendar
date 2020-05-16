import React from 'react';
import {
  TableToolbar, Search, Button,
} from 'wix-style-react';
import Add from 'wix-ui-icons-common/Add';

const TopicsTableToolbar = ({ activeSearch, onActiveSearch, onOpenModal }) => {
  return (
    <TableToolbar>
      <TableToolbar.ItemGroup position="start">
        <TableToolbar.Item>
          <TableToolbar.Title>All topics</TableToolbar.Title>
        </TableToolbar.Item>
      </TableToolbar.ItemGroup>
      <TableToolbar.ItemGroup position="end">
        <TableToolbar.Item>
          <div style={{ width: 200 }}>
            <Search
              value={activeSearch}
              onChange={e => onActiveSearch(e.target.value)}
            />
          </div>
        </TableToolbar.Item>
        <TableToolbar.Item>
          <div style={{ width: 200 }}>
            <Button
              size="medium"
              prefixIcon={<Add />}
              skin="premium"
              onClick={() => onOpenModal()}
            >
              Create new topic
            </Button>
          </div>
        </TableToolbar.Item>
      </TableToolbar.ItemGroup>
    </TableToolbar>
  );
};

export default TopicsTableToolbar;
