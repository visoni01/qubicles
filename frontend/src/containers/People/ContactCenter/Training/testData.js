import {
  terry,
} from '../../../../assets/images/avatar'

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

const courseTrainerIntroduction = {
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
  appointment setting, market research surveys, phone sales, cold calling, and businees to business sales and
  appointments. I have experience in voice-over work as well for different businesses. Especially enjoying realestate,
  insurance, and healthcare field assignments. I have also done data scraping and skip tracing handling collections
  accounts..`,
}

const courseDescription = {
  title: 'Email Communication',
  description: `As someone who's made over 100,000 sales calls and sold tend of millions of dollars
  of services and products, I clearly understand how challenging it can be to gain appointments, demos, and sales.
  You can see by my ratings and reviews that i'm very effective at what I do. I can tell you, however, that many
  business owners I speak with about using a telesales component for their sales and marketing have not developed
  the other needed areas to lay the proper groundwork for as succesful telesales campaign.`,
  goals: `Successful sales and marketing is only possile through the correct choices. Do you understand how to make the
  best choices in each area when it comes to your sales and marketing... or are you guessing ? How crucial is it
  to you (and your income) to actually solve the problem ? Have you experience enough "pain" through delays and
  lack of results?`,
  outcomes: `Investment professional with over 15 years of experience blending qualitative and quantitative disciplines
  in both retail and institutional roles, providing solutions to clients' toughest challenges. Innovative
  problem-solver who optimizes portfolios as well as processes & procedures.`,
  prerequisites: `<ol className='ml-15'>
  <li> One year experience working as call-center professional </li>
  <li>
    Completed following course
    <br />
    How to talk to clients?
  </li>
</ol>`,
}

const viewCourseData = {
  isEnrolled: false,
  courseId: 1,
  createdOn: '01 February 2021',
  updatedOn: '30 April 2021',
  studentsEnrolled: 154,
  informationSection: {
    title: 'Email Communication',
    category: 10,
    categoryTitle: 'Sales',
    price: 25,
    visibility: 'public',
    description: `As someone who's made over 100,000 sales calls and sold tend of millions of dollars
    of services and products, I clearly understand how challenging it can be to gain appointments, demos, and sales.
    You can see by my ratings and reviews that i'm very effective at what I do. I can tell you, however, that many
    business owners I speak with about using a telesales component for their sales and marketing have not developed
    the other needed areas to lay the proper groundwork for as succesful telesales campaign.`,
    goals: `Successful sales and marketing is only possile through the correct choices. Do you understand how to make
    the best choices in each area when it comes to your sales and marketing... or are you guessing ? How crucial is it
    to you (and your income) to actually solve the problem ? Have you experience enough "pain" through delays and
    lack of results?`,
    outcomes: `Investment professional with over 15 years of experience blending qualitative and quantitative
    disciplines in both retail and institutional roles, providing solutions to clients' toughest challenges. Innovative
    problem-solver who optimizes portfolios as well as processes & procedures.`,
    requirements: 'Lorem ipsum',
    language: 'English',
    creatorId: 1,
    requiredCourses: [],
  },
  contentSection: {
    thumbnailImage: 'https://picsum.photos/400/300',
    introductionVideo: 'https://picsum.photos/400/300',
  },
  courseContent: {
    sections: [
      {
        id: 1,
        title: 'About Us',
        sectionNum: '1',
        status: 'inprogress',
        units: [
          {
            unitId: 2,
            unitNum: '2',
            title: 'About',
            length: 2,
            type: 'Article',
            details: 'Lorem ipsum article',
            status: '',
          },
          {
            unitId: 3,
            unitNum: '3',
            title: 'Values',
            length: 2,
            type: 'Article',
            status: '',
          },
        ],
      },
      {
        id: 2,
        title: 'Getting Started',
        sectionNum: '2',
        status: '',
        units: [
          {
            unitId: 4,
            unitNum: '4',
            title: 'Introduction to This Section',
            length: 10,
            type: 'Video',
            status: '',
          },
          {
            unitId: 5,
            unitNum: '5',
            title: 'Setting Up the Environment',
            length: 9,
            type: 'Video',
            status: '',
          },
          {
            unitId: 6,
            unitNum: '6',
            title: 'Points to Remember',
            length: 2,
            type: 'Article',
            status: '',
          },
        ],
      },
      {
        id: 3,
        title: 'Let\'s Start Writing',
        sectionNum: '3',
        status: '',
        units: [
          {
            unitId: 7,
            unitNum: '7',
            title: 'Write Effective Subject Lines',
            length: 10,
            type: 'Video',
            status: '',
          },
          {
            unitId: 8,
            unitNum: '8',
            title: 'Write Well-organized Email Text',
            length: 5,
            type: 'Video',
            status: '',
          },
          {
            unitId: 9,
            unitNum: '9',
            title: 'Additional Resources',
            length: 2,
            type: 'Article',
            status: '',
          },
          {
            unitId: 10,
            unitNum: '10',
            title: 'Important Tips',
            length: 3,
            type: 'Article',
            status: '',
          },
        ],
      },
    ],
  },
  courseDetail: { // Only for enrolled students (For un enrolled students it will be empty object)
    dateStarted: '01 April 2021',
    dateCompleted: '',
    status: 'inprogress',
    grade: '',
    certificate: '',
    endorsed: '',
  },
}

export {
  courseCategories, courseCards, courseTrainerIntroduction, courseDescription, viewCourseData,
}
