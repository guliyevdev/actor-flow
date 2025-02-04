import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Birinci interfeys
interface Coordinates {
    originLatitude: number;
    originLongitude: number;
    destinationLatitude: number;
    destinationLongitude: number;
}

interface DistanceInfo {
    distance: number;
}

interface MapState extends Coordinates, DistanceInfo {}

const initialState: MapState = {
    originLatitude: 0,
    originLongitude: 0,
    destinationLatitude: 0,
    destinationLongitude: 0,
    distance: 0,
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setOriginCoordinates(state, action: PayloadAction<Coordinates>) {
            state.originLatitude = action.payload.originLatitude;
            state.originLongitude = action.payload.originLongitude;
        },
        setDestinationCoordinates(state, action: PayloadAction<Coordinates>) {
            state.destinationLatitude = action.payload.destinationLatitude;
            state.destinationLongitude = action.payload.destinationLongitude;
        },
        setAllCoordinates(state, action: PayloadAction<Coordinates>) {
            console.log("setAllCoordinates", action.payload);
            state.originLatitude = action.payload.originLatitude;
            state.originLongitude = action.payload.originLongitude;
            state.destinationLatitude = action.payload.destinationLatitude;
            state.destinationLongitude = action.payload.destinationLongitude;
        },
        setDistance(state, action) {
            console.log("setDistance", action.payload);
            state.distance = action.payload;
        },
        resetMap(state) {
            state.originLatitude = 0;
            state.originLongitude = 0;
            state.destinationLatitude = 0;
            state.destinationLongitude = 0;
            state.distance = 0;
        },
    },
});

export const { setOriginCoordinates, setDestinationCoordinates,setAllCoordinates, resetMap,setDistance } = mapSlice.actions;
export default mapSlice.reducer;