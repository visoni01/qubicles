import { createSlice } from '@reduxjs/toolkit'
import { carolin, helen, thomas } from '../../../../assets/images/avatar'

const initialState = {
  fetchLoading: null,
  fetchError: null,
  fetchSuccess: false,
  viewRatings: {
    totalAverageRating: 0,
    totalAverageRaters: 0,
    cultureRating: 0,
    leadershipRating: 0,
    careerAdvancementRating: 0,
    compensationRating: 0,
  },
  recievedReviews: [
    {
      id: 0,
      imageName: 'carolin',
      rating: 4,
      imageSrc: carolin,
      reviewerName: 'Carolin Palmer',
      date: 'September 06, 2020',
      position: 'Customer Service Manager at Microsoft',
      review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
      it to make a type specimen book.`,
    },
  ],
  givenReviews: [
    {
      id: 1,
      imageName: 'helen',
      rating: 5,
      imageSrc: helen,
      reviewerName: 'Helen Valdez',
      date: 'September 06, 2020',
      position: 'Customer Service Manager at Microsoft',
      review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
      industry's standard dummy text ever since the 1500 It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged.`,
    },
    {
      id: 2,
      imageName: 'thomas',
      rating: 4.2,
      imageSrc: thomas,
      reviewerName: 'Thomas Gray',
      date: 'September 06, 2020',
      position: 'Customer Service Manager at Microsoft',
      review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
      industry's standard dummy text ever since the 1500 `,
    },
  ],
}

const {
  actions: {
    companyReviewsFetchStart,
    companyReviewsFetchSuccessful,
    companyReviewsFetchFailure,
    companyReviewPostStart,
    companyReviewPostSuccessful,
    companyReviewPostFailure,

  },
  reducer,
} = createSlice({
  name: 'companyReviews',
  initialState,
  reducers: {
    companyReviewsFetchStart: (state) => ({
      ...state,
      fetchLoading: true,
    }),
    companyReviewsFetchSuccessful: (state) => ({
      ...state,
      fetchSuccess: true,
    }),
    companyReviewsFetchFailure: (state) => ({
      ...state,
      fetchError: true,
    }),
    companyReviewPostStart: (state) => ({
      ...state,
      fetchLoading: true,
    }),
    companyReviewPostSuccessful: (state) => ({
      ...state,
      fetchSuccess: true,
    }),
    companyReviewPostFailure: (state) => ({
      ...state,
      fetchError: true,
    }),
  },
})

export default reducer
export {
  companyReviewsFetchStart,
  companyReviewsFetchSuccessful,
  companyReviewsFetchFailure,
  companyReviewPostStart,
  companyReviewPostSuccessful,
  companyReviewPostFailure,
}
