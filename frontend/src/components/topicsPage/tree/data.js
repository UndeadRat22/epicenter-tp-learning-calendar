export default {
  name: 'T',
  children: [
    {
      name: 'A',
      status: 0,
      id: 1,
      children: [
        { name: 'A1', status: 2, id: '774bc503-578b-438e-1c51-08d8021f7130' },
        { name: 'A2', status: 1, id: 1 },
        { name: 'A3', status: 0, id: 1 },
        {
          name: 'C',
          status: 0,
          id: 1,
          children: [
            {
              name: 'C1',
              status: 0,
              id: 1,
            },
            {
              name: 'D',
              status: 0,
              id: 1,
              children: [
                {
                  name: 'D1',
                  status: 1,
                  id: 1,
                },
                {
                  name: 'D2',
                  status: 0,
                  id: 1,
                },
                {
                  name: 'D3',
                  status: 0,
                  id: 1,
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'Z', status: 0, id: 1 },
    {
      name: 'B',
      status: 1,
      id: 1,
      children: [{ name: 'B1', status: 2, id: 1 }, { name: 'B2', status: 1, id: 1 }, { name: 'B3', status: 0, id: 1 }],
    },
  ],
};
