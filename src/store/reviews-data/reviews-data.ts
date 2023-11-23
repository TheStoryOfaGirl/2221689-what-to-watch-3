import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { ReviewData } from '../../types/state.props';
import { fetchReviews } from '../api-actions';
import { ReviewProps } from '../../types/review.props';

const initialState: ReviewData = {
  reviews: [],
  reviewsFetchingStatus: RequestStatus.Idle
};

export const reviewData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<ReviewProps>) => {
      state.reviews.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.reviewsFetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviewsFetchingStatus = RequestStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.reviewsFetchingStatus = RequestStatus.Error;
      });
  }
});

export const { addReview } = reviewData.actions;
