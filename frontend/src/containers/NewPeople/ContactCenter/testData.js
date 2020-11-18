import {
  kareem, terry, sally, good, carolin, helen, thomas,
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
    courseDescription: `Lorem Ipsum
     is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`,
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
     is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`,
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
     is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`,
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
     is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`,
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
     is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`,
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
     is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`,
    sectionsCount: 8,
    language: 'English',
    imageUrl: 'https://picsum.photos/400/300',
  },
  {
    courseId: 6,
    priceQbe: 18,
    priceUsd: 18,
    ratingValue: 4,
    studentsCount: 503,
    courseDescription: `Lorem Ipsum
     is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`,
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

const jobsCards = [
  {
    categoryId: 0,
    categoryName: 'Accounting',
    jobs: [
      {
        jobId: 0,
        title: 'Looking for Experienced Customer Service Specialist',
        required: 50,
        hired: 6,
        evaluating: 3,
        pending: 2,
      },
      {
        jobId: 1,
        title: 'Looking for Outbound Sales Agent',
        required: 20,
        hired: 2,
        evaluating: 6,
        pending: 0,
      },
      {
        jobId: 2,
        title: 'Seeking Inbound Closer',
        required: 60,
        hired: 42,
        evaluating: 10,
        pending: 0,
      },
    ],
  },
  {
    categoryId: 1,
    categoryName: 'Client Services',
    jobs: [
      {
        jobId: 3,
        title: 'Looking for Client Service Manager',
        required: 1,
        hired: 0,
        evaluating: 1,
        pending: 0,
      },
      {
        jobId: 4,
        title: 'Seeking Client Account Manager',
        required: 5,
        hired: 3,
        evaluating: 0,
        pending: 0,
      },
      {
        jobId: 5,
        title: 'Looking for Director of Client Support',
        required: 1,
        hired: 0,
        evaluating: 0,
        pending: 0,
      },
    ],
  },
]

const jobPostCard = {
  jobId: 1,
  jobPostHeading: 'Looking for Experienced Customer service specialist',
  createdAt: 'Posted 2 days ago',
  jobDescription: `ICC is a strategic partner to the world's leading companies, bringing solutions and enhancing
  customer experience during each interaction. We are the largest interaction expert team in the market: multicultural,
  highly skilled, and deeply knowlegdeable, with a wide range of integrated omnichannel solutions, technology,
  and the highest security standards.

  Whether you're looking for work in a contact center, seeking cloud-based contact center software or you're in
  the market for talent, we've got you covered. Powered by blockchain smart contracts with no middlemen
  involved, our patent-pending technology ensures the right agent is matched to the right position at the
  right time. Members of our team have been on the battlefield as agents, supervisors and executives.
  We know firsthand how irate customers respond, what makes employees happy, the key performance metrics
  for contact centers, and how the right technology can make a difference.
  `,
  payment: '$10/hr',
  duration: '6 months',
  jobType: 'Part Time',
  location: 'Remote',
  experienceLevel: 'Entry',
  needed: '6/50 hired',
  skillsTags: [ 'Customer Service', 'Phone Calling', 'Email Support', 'Business Studies', 'Agent Support' ],
  courses: {
    requiredCourses:
      [
        {
          courseName: 'How to talk to clients?',
          courseAuthor: 'Chris Porter, 2020',
        }, {
          courseName: 'Email Communication',
          courseAuthor: 'Martha Riley, 2020',
        },
      ],
    bonusCourses: {
      courseName: 'Managing Difficult Situation',
      courseAuthor: 'Roy Gordon, 2020',
    },
  },
}

const contactCenterIntroduction = {
  imageName: 'good',
  rating: 5,
  imageSrc: good,
  name: 'Good Call Center',
  location: 'San Francisco, CA',
  date: 'Member since 11/2020',
  title: 'Innovative Call Center',
  description: `Whether you are looking for work in a contact center, seeking cloud-based contact center software
  or you are in the market for talent, we have got you covered. Powered by blockchain smart contracts with no
  middlemen involved, our patent-pending technology ensures the right agent is matched to the right position at
  the right time. Members of our team have been on the battlefield as agents, supervisors and executives. We know
  firsthand how irate customers respond, what makes employees happy, the key performance metrics for contact centers,
  and how the right technology can make a difference.`,
}

const testResumeIntroduction = {
  imageName: 'terry',
  rating: 5,
  imageSrc: terry,
  name: 'Terry Garret',
  location: 'San Francisco, CA',
  date: 'Member since 11/2020',
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
    it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
    typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
    versions of Lorem Ipsum.`,
  }, {
    imageName: 'helen',
    rating: 5,
    imageSrc: helen,
    reviewerName: 'Helen Valdez',
    date: 'September 06, 2020',
    position: 'Customer Service Manager at Microsoft',
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
    it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
    typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
    versions of Lorem Ipsum.`,
  }, {
    imageName: 'thomas',
    rating: 5,
    imageSrc: thomas,
    reviewerName: 'Thomas Gray',
    date: 'September 06, 2020',
    position: 'Customer Service Manager at Microsoft',
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
    it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
    typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
    versions of Lorem Ipsum.`,
  },
]

export {
  courseCategories,
  courseCards,
  talentCards,
  jobsCards,
  topTalents,
  contactCenterIntroduction,
  testResumeIntroduction,
  jobPostCard,
  reviews,
}
