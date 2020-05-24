import React from 'react';
import {
  TableToolbar, Search, Button,
} from 'wix-style-react';
import Add from 'wix-ui-icons-common/Add';

const TopicsTableToolbar = ({ activeSearch, onActiveSearch, onOpenModal }) => {
  return (
    <TableToolbar>
      <TableToolbar.ItemGroup position="end">
        <TableToolbar.Item>
          <div style={{ width: 400 }}>
            <Search
              value={activeSearch}
              clearButton={false}
              onChange={e => onActiveSearch(e.target.value)}
            />
          </div>
        </TableToolbar.Item>
      </TableToolbar.ItemGroup>
      <TableToolbar.ItemGroup position="start">
        <TableToolbar.Item>
          <div style={{ width: 200 }}>
            <Button
              size="medium"
              prefixIcon={<Add />}
              onClick={onOpenModal}
              priority="secondary"
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
