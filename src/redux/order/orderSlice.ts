import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  originPlaceId: null,
  destination: null,
  destinationPlaceId: null,
  distance: null,
  phoneNumber: null,
  truckCategory: null,
  steps: null,
  payment: null, // 'payment' sahəsi əlavə edildi
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrigin: (state, action) => {
      state.origin = action.payload;
    },
    updateOriginPlaceId: (state, action) => {
      state.originPlaceId = action.payload;
    },
    updateDestination: (state, action) => {
      state.destination = action.payload;
    },
    updateDestinationPlaceId: (state, action) => {
      state.destinationPlaceId = action.payload;
    },
    updateDistance: (state, action) => {
      state.distance = action.payload;
    },
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    updateTruckCategory: (state, action) => {
      state.truckCategory = action.payload;
    },
    updateSteps: (state, action) => {
      state.steps = action.payload;
    },
    updatePayment: (state, action) => { // Yeni `updatePayment` reducer funksiyası əlavə edildi
      state.payment = action.payload;
    },
  },
});

export const {
  updateOrigin,
  updateOriginPlaceId,
  updateDestination,
  updateDestinationPlaceId,
  updateDistance,
  updatePhoneNumber,
  updateTruckCategory,
  updateSteps,
  updatePayment, // `updatePayment` action-ı əlavə edildi
} = orderSlice.actions;

export default orderSlice.reducer;