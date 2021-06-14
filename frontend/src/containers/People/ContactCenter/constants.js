export const availableCourses = [
  { id: 1, title: 'How to talk to clients?', subtitle: 'Chris Porter, 2020' },
  { id: 2, title: 'Email Communication', subtitle: 'Chris Porter, 2020' },
  { id: 3, title: 'Managing Difficult Situation', subtitle: 'Roy Gordon, 2020' },
]

// Avilable Languages
export const availableLanguages = [
  { name: 'English', value: 'english' },
  { name: 'French', value: 'french' },
  { name: 'Spanish', value: 'spanish' },
]

export const jobFilterStatus = {
  all: 'Job Postings',
  recruiting: 'Open Positions',
  hired: 'Hired Positions',
  cancelled: 'Cancelled Positions',
  draft: 'Drafted Positions',
}

export const courseFilterStatus = {
  mostPopular: 'Most Popular',
  latest: 'Latest',
  bestRating: 'Best Rating',
}

export const courseReviewsFilterStatus = {
  latest: 'Latest',
  bestRating: 'Best Rating',
  worstRating: 'Worst Rating',
}

export const postStatusPermissions = {
  public: {
    label: 'Public',
    secondaryLabel: 'Anyone on Qubicles',
  },
  managers: {
    label: 'Managers',
    secondaryLabel: 'Managers of your company',
  },
  followers: {
    label: 'Followers',
    secondaryLabel: 'Your followers',
  },
  company: {
    label: 'Company',
    secondaryLabel: 'Members of your company',
  },
  admins: {
    label: 'Admins',
    secondaryLabel: 'Admins of your company',
  },
}

export const mediaPlaybackSpeed = [
  { label: '0.25x', value: 0.25 },
  { label: '0.5x', value: 0.5 },
  { label: 'Normal', value: 1 },
  { label: '1.25x', value: 1.25 },
  { label: '1.5x', value: 1.5 },
  { label: '2x', value: 2 },
]

export const noOfCoursesPerPage = 15
export const noOfReviewsPerPage = 6
export const maxVideoFileSize = 100 * 1024 * 1024
export const maxImageFileSize = 1024 * 1024
