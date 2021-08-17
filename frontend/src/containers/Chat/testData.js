const userList = [
  {
    id: 1,
    name: 'Jack Downey',
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmPoR4wpQVA3U1P2mS6ezG3KPmTfq4uQubJiGWSzier3DW',
    time: 1628835035653,
    isGroup: false,
    latestMessage: 'Hello, this is the message from Jack Downey! How are you doing? I hope you are good.',
    allRead: false,
  },
  {
    id: 2,
    name: 'Incognito',
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmPRkEvfv22rXQDtpaDGMfn3E93Dmxuc2YCS2QrYnVieTj',
    time: 1628834986890,
    isGroup: true,
    latestMessage: 'Hello, this is the message from Jack Downey!',
    allRead: true,
  },
]

const members = [
  {
    id: 1,
    name: 'Kautzer LLC',
    profilePic: 'https://ipfs.telos.miami/ipfs/QmaoSD6dZHNB3xMQrpxd4cMAHaGH4c9mMXNg79cAmtuvPF',
    location: 'Nesterovskaya',
    title: 'Teacher',
    userCode: 'employer',
  },
  {
    id: 2,
    name: 'Delainey Blackadder',
    profilePic: 'https://ipfs.telos.miami/ipfs/Qmf8WukCjBqbEizmvtL8BRtSwCNqmpZDrj2rxq5XuBagZk',
    location: 'San Fransisco, CA',
    title: 'Customer Service Manager & Consultant',
    userCode: 'employer',
  },
  {
    id: 3,
    name: 'Pebrook Lias',
    profilePic: 'https://ipfs.telos.miami/ipfs/QmU5gDcgrQUdyaV5vTxLnxouu7SomBCSxHpBCWbRDwzRqj',
    location: 'Sanski Most',
    title: 'Database Administrator IV',
    userCode: 'agent',
  },
  {
    id: 4,
    name: 'Ingar Durante',
    profilePic: 'https://robohash.org/cupiditateetplaceat.jpg?size=300x328&set=set1',
    location: 'Ban Pong',
    title: 'Executive Secretary',
    userCode: 'agent',
  },
  {
    id: 5,
    name: 'Abeu Bringloe',
    profilePic: 'https://robohash.org/vitaenihildistinctio.jpg?size=300x328&set=set1',
    location: 'Hamm',
    title: 'Software Test Engineer IV',
    userCode: 'agent',
  },
  {
    id: 6,
    name: 'Lavina Ciraldo',
    profilePic: 'https://robohash.org/earumvoluptatesest.jpg?size=300x328&set=set1',
    location: 'El Rosario',
    title: 'Database Administrator III',
    userCode: 'agent',
  },
  {
    id: 7,
    name: 'Corrine Carrick',
    profilePic: 'https://robohash.org/voluptatemestnihil.jpg?size=300x328&set=set1',
    location: 'San Jose',
    title: 'Health Coach II',
    userCode: 'agent',
  },
  {
    id: 8,
    name: 'Bennie Houseman',
    profilePic: 'https://robohash.org/quosnihilvelit.jpg?size=300x328&set=set1',
    location: 'Skene',
    title: 'Safety Technician IV',
    userCode: 'agent',
  },
  {
    id: 9,
    name: 'Henderson Heams',
    profilePic: 'https://robohash.org/utesseea.jpg?size=300x328&set=set1',
    location: 'Pingpo',
    title: 'Structural Analysis Engineer',
    userCode: 'agent',
  },
  {
    id: 10,
    name: 'Briggs Domb',
    profilePic: 'https://robohash.org/officiaerrormodi.jpg?size=300x328&set=set1',
    location: 'Seremban',
    title: 'Speech Pathologist',
    userCode: 'agent',
  },
]

const chatData = [
  [
    {
      msgId: 123,
      candidateId: 4,
      profilePic: 'https://ipfs.telos.miami/ipfs/QmPoR4wpQVA3U1P2mS6ezG3KPmTfq4uQubJiGWSzier3DW',
      imageUrl: 'https://ipfs.telos.miami/ipfs/QmPRkEvfv22rXQDtpaDGMfn3E93Dmxuc2YCS2QrYnVieTj',
      isNotification: false,
      text: 'Hi, this is Jack!',
      sentAt: '2021-07-28 06:08:40',
      isRead: true,
    },
    {
      msgId: 234,
      candidateId: 3,
      profilePic: 'https://ipfs.telos.miami/ipfs/QmPRkEvfv22rXQDtpaDGMfn3E93Dmxuc2YCS2QrYnVieTj',
      imageUrl: 'https://ipfs.telos.miami/ipfs/QmPRkEvfv22rXQDtpaDGMfn3E93Dmxuc2YCS2QrYnVieTj',
      isNotification: false,
      text: 'Hi, this is Arthur! How are you doing? I hope you are good. Looking forward to meet you soon.',
      sentAt: '2021-07-29 11:08:40',
      isRead: false,
    },
    {
      msgId: 2345,
      candidateId: 3,
      profilePic: 'https://ipfs.telos.miami/ipfs/QmPRkEvfv22rXQDtpaDGMfn3E93Dmxuc2YCS2QrYnVieTj',
      imageUrl: '',
      isNotification: false,
      text: 'Hi, this is Arthur! How are you doing? I hope you are good. Looking forward to meet you soon.',
      sentAt: '2021-07-29 19:08:40',
      isRead: false,
    },
    {
      msgId: 23456,
      candidateId: null,
      profilePic: '',
      imageUrl: '',
      isNotification: true,
      text: '<span><b>Arthur Castle</b> was added by <b>Jack Downey</b></span>',
      sentAt: '2021-07-29 21:08:40',
      isRead: false,
    },
    {
      msgId: 234567,
      candidateId: 4,
      profilePic: 'https://ipfs.telos.miami/ipfs/QmPoR4wpQVA3U1P2mS6ezG3KPmTfq4uQubJiGWSzier3DW',
      imageUrl: '',
      isNotification: false,
      text: 'Hi, this is Arthur! How are you doing? I hope you are good. Looking forward to meet you soon.',
      sentAt: '2021-07-30 23:08:40',
      isRead: false,
    },
  ],
  [
    {
      msgId: 56,
      candidateId: 2,
      profilePic: 'https://ipfs.telos.miami/ipfs/Qmf8WukCjBqbEizmvtL8BRtSwCNqmpZDrj2rxq5XuBagZk',
      isNotification: false,
      text: 'Hi, this is Client 2!',
      sentAt: '2021-08-01 10:15:40',
      isRead: false,
    },
    {
      msgId: 78,
      candidateId: 3,
      profilePic: 'https://ipfs.telos.miami/ipfs/QmPRkEvfv22rXQDtpaDGMfn3E93Dmxuc2YCS2QrYnVieTj',
      isNotification: false,
      text: 'Hi, this is Arthur! How are you doing? I hope you are good. Looking forward to meet you soon.',
      sentAt: '2021-08-03 11:08:40',
      isRead: false,
    },
    {
      msgId: 2345,
      candidateId: 3,
      profilePic: 'https://ipfs.telos.miami/ipfs/QmPRkEvfv22rXQDtpaDGMfn3E93Dmxuc2YCS2QrYnVieTj',
      isNotification: false,
      text: 'Hi, this is Arthur! How are you doing? I hope you are good. Looking forward to meet you soon.',
      sentAt: '2021-08-03 19:08:40',
      isRead: false,
    },
    {
      msgId: 23456,
      candidateId: null,
      profilePic: '',
      isNotification: true,
      text: '<span><b>Arthur Castle</b> was added by <b>Jack Downey</b></span>',
      sentAt: '2021-08-03 21:08:40',
      isRead: false,
    },
    {
      msgId: 234567,
      candidateId: 2,
      profilePic: 'https://ipfs.telos.miami/ipfs/Qmf8WukCjBqbEizmvtL8BRtSwCNqmpZDrj2rxq5XuBagZk',
      isNotification: false,
      text: 'Hi, this is Arthur! How are you doing? I hope you are good. Looking forward to meet you soon.',
      sentAt: '2021-08-04 23:08:40',
      isRead: false,
    },
  ],
]

const chats = [
  {
    conversationId: 1,
    isGroup: false,
    groupName: '',
    data: chatData[ 0 ],
    candidatesInfo: [
      {
        id: 2,
        name: 'Jack Downey',
        profilePic: 'https://ipfs.telos.miami/ipfs/QmaoSD6dZHNB3xMQrpxd4cMAHaGH4c9mMXNg79cAmtuvPF',
        location: 'Nesterovskaya',
        title: 'Teacher',
        userCode: 'agent',
      },
    ],
  },
  {
    conversationId: 2,
    isGroup: true,
    groupName: 'Incognito',
    data: chatData[ 1 ],
    candidatesInfo: members,
  },
]

const popupChats = [
  {
    isLoading: false,
    success: true,
    error: false,
    requestType: '',
    dataType: '',
    data: {
      conversationId: 1,
      name: 'Kautzer LLC',
      profilePic: 'https://ipfs.telos.miami/ipfs/QmaoSD6dZHNB3xMQrpxd4cMAHaGH4c9mMXNg79cAmtuvPF',
      isGroup: false,
      chats: chatData[ 0 ],
    },
  },
  {
    isLoading: false,
    success: true,
    error: false,
    requestType: '',
    dataType: '',
    data: {
      conversationId: 2,
      name: 'Delainey Blackadder',
      profilePic: 'https://ipfs.telos.miami/ipfs/Qmf8WukCjBqbEizmvtL8BRtSwCNqmpZDrj2rxq5XuBagZk',
      isGroup: true,
      chats: chatData[ 1 ],
    },
  },
  {
    isLoading: false,
    success: true,
    error: false,
    requestType: '',
    dataType: '',
    data: {
      conversationId: 3,
      name: 'Pebrook Lias',
      profilePic: 'https://ipfs.telos.miami/ipfs/QmU5gDcgrQUdyaV5vTxLnxouu7SomBCSxHpBCWbRDwzRqj',
      isGroup: false,
      chats: chatData[ 0 ],
    },
  },
  {
    isLoading: false,
    success: true,
    error: false,
    requestType: '',
    dataType: '',
    data: {
      conversationId: 4,
      name: 'Ingar Durante',
      profilePic: 'https://robohash.org/cupiditateetplaceat.jpg?size=300x328&set=set1',
      isGroup: false,
      chats: chatData[ 1 ],
    },
  },
  {
    isLoading: false,
    success: true,
    error: false,
    requestType: '',
    dataType: '',
    data: {
      conversationId: 5,
      name: 'Abeu Bringloe',
      profilePic: 'https://robohash.org/vitaenihildistinctio.jpg?size=300x328&set=set1',
      isGroup: true,
      chats: chatData[ 0 ],
    },
  },
]

export {
  userList,
  chats,
  members,
  popupChats,
}
