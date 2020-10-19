import { kareem, terry, sally } from '../../../assets/images/avatar'

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

export {
  courseCategories, courseCards, talentCards, jobsCards,
}
