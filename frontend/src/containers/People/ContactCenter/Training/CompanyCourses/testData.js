const companyDetails = [
  {
    companyId: 1,
    companyName: 'Kautzer LLC',
  },
  {
    companyId: 2,
    companyName: 'Walker, Runolfsson and Bauch',
  },
  {
    companyId: 3,
    companyName: 'Globex Corporation',
  },
  {
    companyId: 4,
    companyName: 'Marlon Inc',
  },
]

const companyTitle = 'Kautzer LLC'

const courses = [
  {
    companyId: 1,
    courseId: 5,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmWasm1HMen7oa6YaB3qBTbrAnAVAnDSV7w5RC2UYqYGzL',
    language: 'English',
    price: 23,
    rating: 4.2,
    studentsCount: 3,
    sectionsCount: 2,
    title: 'Sample Course 1',
  },
  {
    companyId: 4,
    courseId: 1,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmWasm1HMen7oa6YaB3qBTbrAnAVAnDSV7w5RC2UYqYGzL',
    language: 'French',
    price: 5,
    rating: 3.1,
    sectionsCount: 1,
    studentsCount: 4,
    title: 'Sample course 1',
  },
  {
    companyId: 2,
    courseId: 3,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmbmLZySc4h4cnpXPwVRCmGsZVXRxF4uj8Q2ujKigdcagE',
    language: 'English',
    price: 6,
    rating: 3.5,
    sectionsCount: 2,
    studentsCount: 3,
    title: 'Sample course 3',
  },
  {
    companyId: 2,
    courseId: 4,
    creatorDetails: { firstName: 'Rickey', lastName: 'Morgan' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmUcmDFKoq7TJGwH5fF21kRdgRiCeJRTLvFyrEGVoxJ2wt',
    language: 'French',
    price: 15,
    rating: 0,
    sectionsCount: 1,
    studentsCount: 3,
    title: 'Sample Course',
  },
  {
    companyId: 1,
    courseId: 6,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmWasm1HMen7oa6YaB3qBTbrAnAVAnDSV7w5RC2UYqYGzL',
    language: 'English',
    price: 23,
    rating: 4.2,
    studentsCount: 3,
    sectionsCount: 2,
    title: 'Sample Course 1',
  },
  {
    companyId: 4,
    courseId: 7,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmWasm1HMen7oa6YaB3qBTbrAnAVAnDSV7w5RC2UYqYGzL',
    language: 'French',
    price: 5,
    rating: 3.1,
    sectionsCount: 1,
    studentsCount: 4,
    title: 'Sample course 1',
  },
  {
    companyId: 2,
    courseId: 8,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmbmLZySc4h4cnpXPwVRCmGsZVXRxF4uj8Q2ujKigdcagE',
    language: 'English',
    price: 6,
    rating: 3.5,
    sectionsCount: 2,
    studentsCount: 3,
    title: 'Sample course 3',
  },
  {
    companyId: 2,
    courseId: 9,
    creatorDetails: { firstName: 'Rickey', lastName: 'Morgan' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmUcmDFKoq7TJGwH5fF21kRdgRiCeJRTLvFyrEGVoxJ2wt',
    language: 'French',
    price: 15,
    rating: 0,
    sectionsCount: 1,
    studentsCount: 3,
    title: 'Sample Course',
  },
  {
    companyId: 1,
    courseId: 10,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmWasm1HMen7oa6YaB3qBTbrAnAVAnDSV7w5RC2UYqYGzL',
    language: 'English',
    price: 23,
    rating: 4.2,
    studentsCount: 3,
    sectionsCount: 2,
    title: 'Sample Course 1',
  },
  {
    companyId: 4,
    courseId: 11,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmWasm1HMen7oa6YaB3qBTbrAnAVAnDSV7w5RC2UYqYGzL',
    language: 'French',
    price: 5,
    rating: 3.1,
    sectionsCount: 1,
    studentsCount: 4,
    title: 'Sample course 1',
  },
  {
    companyId: 2,
    courseId: 12,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmbmLZySc4h4cnpXPwVRCmGsZVXRxF4uj8Q2ujKigdcagE',
    language: 'English',
    price: 6,
    rating: 3.5,
    sectionsCount: 2,
    studentsCount: 3,
    title: 'Sample course 3',
  },
  {
    companyId: 2,
    courseId: 13,
    creatorDetails: { firstName: 'Rickey', lastName: 'Morgan' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmUcmDFKoq7TJGwH5fF21kRdgRiCeJRTLvFyrEGVoxJ2wt',
    language: 'French',
    price: 15,
    rating: 0,
    sectionsCount: 1,
    studentsCount: 3,
    title: 'Sample Course',
  },
  {
    companyId: 1,
    courseId: 14,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmWasm1HMen7oa6YaB3qBTbrAnAVAnDSV7w5RC2UYqYGzL',
    language: 'English',
    price: 23,
    rating: 4.2,
    studentsCount: 3,
    sectionsCount: 2,
    title: 'Sample Course 1',
  },
  {
    companyId: 4,
    courseId: 15,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmWasm1HMen7oa6YaB3qBTbrAnAVAnDSV7w5RC2UYqYGzL',
    language: 'French',
    price: 5,
    rating: 3.1,
    sectionsCount: 1,
    studentsCount: 4,
    title: 'Sample course 1',
  },
  {
    companyId: 2,
    courseId: 16,
    creatorDetails: { firstName: 'James', lastName: 'Decker' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmbmLZySc4h4cnpXPwVRCmGsZVXRxF4uj8Q2ujKigdcagE',
    language: 'English',
    price: 6,
    rating: 3.5,
    sectionsCount: 2,
    studentsCount: 3,
    title: 'Sample course 3',
  },
  {
    companyId: 2,
    courseId: 17,
    creatorDetails: { firstName: 'Rickey', lastName: 'Morgan' },
    imageUrl: 'https://ipfs.telos.miami/ipfs/QmUcmDFKoq7TJGwH5fF21kRdgRiCeJRTLvFyrEGVoxJ2wt',
    language: 'French',
    price: 15,
    rating: 0,
    sectionsCount: 1,
    studentsCount: 3,
    title: 'Sample Course',
  },
]

const companyCoursesData = {
  count: 12,
  courses,
}

// eslint-disable-next-line import/prefer-default-export
export {
  companyDetails, companyTitle, courses, companyCoursesData,
}
