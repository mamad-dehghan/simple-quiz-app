import {createSlice} from "@reduxjs/toolkit";

const SpendTime = createSlice({
	name:'spendTime',
	initialState: {
		startTime: 0,
		endTime: 0,
	},
	reducers: {
		startTime(state) {
			state.startTime = Date.now();
		},
		endTime(state) {
			state.endTime = Date.now();
		}
	}
})
export default SpendTime.reducer

export const {startTime, endTime} = SpendTime.actions