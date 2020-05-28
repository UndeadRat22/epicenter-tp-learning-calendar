export default {
  name: 'T',
  children: [
    {
      name: 'A',
      totalStatus: 0,
      id: 1,
      children: [
        { name: 'Funkcional programming in JAVA', totalStatus: 2, id: '774bc503-578b-438e-1c51-08d8021f7130' },
        { name: 'A2', totalStatus: 1, id: 1 },
        { name: 'A3', totalStatus: 0, id: 1 },
        {
          name: 'C',
          totalStatus: 0,
          id: 1,
          children: [
            {
              name: 'C1',
              totalStatus: 0,
              id: 1,
            },
            {
              name: 'D',
              totalStatus: 0,
              id: 1,
              children: [
                {
                  name: 'D1',
                  totalStatus: 1,
                  id: 1,
                },
                {
                  name: 'D2',
                  totalStatus: 0,
                  id: 1,
                },
                {
                  name: 'D3',
                  totalStatus: 0,
                  id: 1,
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'Z', totalStatus: 0, id: 1 },
    {
      name: 'B',
      totalStatus: 1,
      id: 1,
      children: [{ name: 'B1', totalStatus: 2, id: 1 }, { name: 'B2', totalStatus: 1, id: 1 }, { name: 'B3', totalStatus: 0, id: 1 }],
    },
  ],
};
