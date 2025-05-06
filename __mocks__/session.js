const sessionData = {
  user: {
    name: "Test Me",
    email: "testme@example.com",
    image: "https://avatars.githubusercontent.com/u/86304139?v=4",
    id: "ama1adfqpkvgzhff3m36hdea",
  },
};

const mockSession = jest.genMockFromModule("session");

mockSession.get = jest.fn(() => Promise.resolve({ data: [sessionData] }));

export default mockSession;
