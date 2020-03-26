import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showUserModal: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleModal(state) {
      return { ...state, showUserModal: !state.showUserModal };
    }
  }
});

export const { toggleModal } = userSlice.actions;

export default userSlice.reducer;
