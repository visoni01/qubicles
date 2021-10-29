import {
  kareem, terry, sally, carolin, helen, thomas,
} from '../../../assets/images/avatar'

const courseCategories = [
  'Accounting',
  'Client Service',
  'Human Resources',
  'Inbound',
  'Operations',
  'Outbound',
  'Quality Assurance',
  'Sales',
  'Support',
  'Telemarketing',
]

const courseCards = [
  {
    courseId: 1,
    priceQbe: 15,
    priceUsd: 15,
    ratingValue: 4,
    studentsCount: 503,
    courseDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    sectionsCount: 8,
    language: 'English',
    imageUrl: 'https://picsum.photos/400/300',
  },
  {
    courseId: 2,
    priceQbe: 12,
    priceUsd: 12,
    ratingValue: 4.3,
    studentsCount: 338,
    courseDescription: `Lorem Ipsum
     is simply dummy text of the printing and typesetting industry`,
    sectionsCount: 5,
    language: 'English',
    imageUrl: 'https://picsum.photos/400/300',
  },
  {
    courseId: 3,
    priceQbe: 20,
    priceUsd: 20,
    ratingValue: 5,
    studentsCount: 1032,
    courseDescription: `Lorem Ipsum
     is simply dummy text of the printing and typesetting industry`,
    sectionsCount: 9,
    language: 'English, French',
    imageUrl: 'https://picsum.photos/400/300',
  },
  {
    courseId: 4,
    priceQbe: 10,
    priceUsd: 10,
    ratingValue: 3.4,
    studentsCount: 274,
    courseDescription: `Lorem Ipsum
     is simply dummy text of the printing and typesetting industry`,
    sectionsCount: 8,
    language: 'English',
    imageUrl: 'https://picsum.photos/400/300',
  },
  {
    courseId: 5,
    priceQbe: 12,
    priceUsd: 12,
    ratingValue: 4.5,
    studentsCount: 503,
    courseDescription: `Lorem Ipsum
     is simply dummy text of the printing and typesetting industry`,
    sectionsCount: 8,
    language: 'English',
    imageUrl: 'https://picsum.photos/400/300',
  },
  {
    courseId: 6,
    priceQbe: 9,
    priceUsd: 9,
    ratingValue: 4,
    studentsCount: 503,
    courseDescription: `Lorem Ipsum
     is simply dummy text of the printing and typesetting industry`,
    sectionsCount: 8,
    language: 'English',
    imageUrl: 'https://picsum.photos/400/300',
  },
  {
    courseId: 7,
    priceQbe: 18,
    priceUsd: 18,
    ratingValue: 4,
    studentsCount: 503,
    courseDescription: `Lorem Ipsum
     is simply dummy text of the printing and typesetting industry`,
    sectionsCount: 8,
    language: 'English',
    imageUrl: 'https://picsum.photos/400/300',
  },
]

const talentCards = [
  {
    candidateId: 0,
    candidateName: 'Terry Garret',
    candidatePic: terry,
    availability: 'Available',
    candidateRating: 5,
    location: 'San Francisco, CA',
    languages: 'English, French',
    ratePerHourDollar: 12.50,
    profileName: 'Customer Service Specialist',
    profileDescription: `I have over 15 years of experience in telemarketing and lead generation.
    I also have over 5 years of experience in management, quality control and supervision.
    I do have the ability and update your contact list in real time...`,
    profileTags: [ 'Customer Service', 'Phone Calling', 'Active Sales', 'Business Studies' ],
  },
  {
    candidateId: 1,
    candidateName: 'Chad Green',
    candidatePic: kareem,
    availability: 'Available',
    candidateRating: 4.5,
    location: 'San Francisco, CA',
    languages: 'English',
    ratePerHourDollar: 10.50,
    profileName: 'Customer Service Expert',
    profileDescription: `I have over 15 years of experience in telemarketing and lead generation.
    I also have over 5 years of experience in management, quality control and supervision.
    I do have the ability and update your contact list in real time...`,
    profileTags: [ 'Customer Service', 'Phone Calling', 'Email Support', 'Business Studies', 'Agent Support' ],
  },
  {
    candidateId: 2,
    candidateName: 'Janice Fox',
    candidatePic: sally,
    availability: 'Available',
    candidateRating: 5,
    location: 'San Francisco, CA',
    languages: 'English, German',
    ratePerHourDollar: 15,
    profileName: 'Customer Support Enthusiast',
    profileDescription: `I have over 15 years of experience in telemarketing and lead generation.
    I also have over 5 years of experience in management, quality control and supervision.
    I do have the ability and update your contact list in real time...`,
    profileTags: [ 'Customer Service', 'Phone Calling', 'Quick Support', 'Email Support' ],
  },
]

const topTalents = [
  {
    candidateId: 0,
    candidateName: 'Terry Garret',
    candidateRating: 5,
    candidatePic: terry,
    profileName: 'Customer Service Specialist',
  },
  {
    candidateId: 1,
    candidateName: 'Chad Green',
    candidateRating: 4.5,
    candidatePic: kareem,
    profileName: 'Customer Service Expert',
  },
  {
    candidateId: 2,
    candidateName: 'Janice Fox',
    candidateRating: 5,
    candidatePic: sally,
    profileName: 'Customer Support Enthusiast',
  },
]

const topCompanies = [
  {
    clientId: 0,
    clientName: 'Lacus',
    clientRating: 5,
  },
  {
    clientId: 1,
    clientName: 'Oberlo',
    clientRating: 5,
  },
  {
    clientId: 2,
    clientName: 'Wordlab',
    clientRating: 5,
  },
  {
    clientId: 3,
    clientName: 'Canon',
    clientRating: 5,
  },
  {
    clientId: 4,
    clientName: 'Lacus',
    clientRating: 5,
  },
  {
    clientId: 5,
    clientName: 'Getsocio',
    clientRating: 5,
  },
  {
    clientId: 6,
    clientName: 'Lacus',
    clientRating: 5,
  },
  {
    clientId: 7,
    clientName: 'Good',
    clientRating: 5,
  },
]

const agentProfileData = {
  userName: 'arthurca',
  fullName: 'Arthur Castille',
  street: '92 Pride Avenue',
  city: 'Staten Islands',
  state: 'New York',
  zip: '10312',
  dob: '1998-10-01',
  ssn: '***-**-6757',
  gender: 'male',
  active: false,
  email: 'agent1@yopmail.com',
  homePhone: '718-356-3486',
  mobileNumber: '1 9173548628',
  smsNotification: true,
  emailNotification: true,
  rating: '4.5',
  title: 'Customer Service Specialist',
  summary: `
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.'s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting,
  remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
  sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
  PageMaker including versions of Lorem Ipsum.`,
  yearsOfExperience: '4',
  highestEducation: 'Bachelor\'s degree',
  profilePic: kareem,
  date: '1 January 2021',
}

const testResumeIntroduction = {
  imageName: 'terry',
  rating: 5,
  imageSrc: terry,
  name: 'Terry Garret',
  location: 'San Francisco, CA',
  date: '11 November 2020',
  title: 'Customer Service Specialist',
  description: ` Over 25 years of experience. I am a seasoned marketing professional. I work well in  a dedicated home
  office with a desk. I am able to adhere to a time schedule and am flexible in my availability. I am college educated
  and have a medical background as well in pharmaceutical customer service. I have experience in fundraising,
  appointment setting, market research surverys, phone sales, cold calling, and businees to business sales and
  appointments. I have experience in voice-over work as well for different businesses. Especially enjoying realestate,
  insurance, and healthcare field assignments. I have also done data scraping and skip tracing handling collections
  accounts..`,
}

const reviews = [
  {
    imageName: 'carolin',
    rating: 5,
    imageSrc: carolin,
    reviewerName: 'Carolin Palmer',
    date: 'September 06, 2020',
    position: 'Customer Service Manager at Microsoft',
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
    it to make a type specimen book.`,
  }, {
    imageName: 'helen',
    rating: 5,
    imageSrc: helen,
    reviewerName: 'Helen Valdez',
    date: 'September 06, 2020',
    position: 'Customer Service Manager at Microsoft',
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500 It has survived not only five centuries,
    but also the leap into electronic typesetting, remaining essentially unchanged.`,
  }, {
    imageName: 'thomas',
    rating: 5,
    imageSrc: thomas,
    reviewerName: 'Thomas Gray',
    date: 'September 06, 2020',
    position: 'Customer Service Manager at Microsoft',
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500 `,
  },
]

const newReviews = {
  received: [
    {
      id: 0,
      rating: 5,
      review: 'I have experience in voice-over work as well for different businesses.',
    },
    {
      id: 1,
      rating: 4,
      review: 'Lorem Ipsum passages, and more recently with desktop publishing software',
    },
    {
      id: 2,
      rating: 5,
      review: 'I have experience in voice-over work as well for different businesses.',
    },
  ],
  given: [
    {
      id: 3,
      rating: 5,
      review: 'I have experience in voice-over work as well for different businesses.',
    },
    {
      id: 4,
      rating: 4,
      review: 'Lorem Ipsum passages, and more recently with desktop publishing software',
    },
    {
      id: 5,
      rating: 5,
      review: 'I have experience in voice-over work as well for different businesses.',
    },
  ],
}

export {
  courseCategories, courseCards, talentCards, topTalents, topCompanies, agentProfileData, testResumeIntroduction,
  reviews, newReviews,
}
