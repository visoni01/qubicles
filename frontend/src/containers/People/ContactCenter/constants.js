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
