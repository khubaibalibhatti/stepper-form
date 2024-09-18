import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to handle form submission
export const submitForm = createAsyncThunk(
  "submitForm",
  async (formData, { rejectWithValue }) => {
    const response = await fetch(
      "https://65a39419a54d8e805ed3bc4c.mockapi.io/admin-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
//read action

export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectwithvalue }) => {
    const response = await fetch(
      "https://65a39419a54d8e805ed3bc4c.mockapi.io/admin-user"
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectwithvalue(error);
    }
  }
);

// Delete action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectwithvalue }) => {
    const response = await fetch(
      `https://65a39419a54d8e805ed3bc4c.mockapi.io/admin-user/${id}`,
      { method: "DELETE" }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectwithvalue(error);
    }
  }
);

// Async thunk to handle form submission
export const updateUser = createAsyncThunk(
  "updateUser",
  async (formData, { rejectWithValue }) => {
    console.log("update data", formData);
    
    const response = await fetch(
      `https://65a39419a54d8e805ed3bc4c.mockapi.io/admin-user/${formData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  step: 1,
  data: {
    step1: {},
    step2: {},
    step3: {},
  },
  isValid: false,
  loading: false,
  errors: {},
  countries: ["pakistan", "USA", "Canada", "Mexico"],
  cities: {
    pakistan: ["Lahore", "Karachi", "Multan", "Islamabad"],
    USA: ["New York", "Los Angeles", "Chicago"],
    Canada: ["Toronto", "Vancouver", "Montreal"],
    Mexico: ["Mexico City", "Guadalajara", "Monterrey"],
  },
  selectedCountry: "",
  selectedCity: "",
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    updateFormData: (state, action) => {
      state.data[`step${state.step}`] = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setCountry: (state, action) => {
      state.selectedCountry = action.payload;
      state.selectedCity = ""; // Reset city when country changes
    },
    setCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: {
    [submitForm.pending]: (state) => {
      state.loading = true;
    },
    [submitForm.fulfilled]: (state, action) => {
      state.loading = false;
      state.userdata.push(action.payload);
    },
    [submitForm.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.massage;
    },
    // read action
    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userdata = action.payload;
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // delete action
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;

      const { id } = action.payload;

      if (id) {
        state.userdata = state.userdata.filter(
          (eachdata) => eachdata.id !== id
        );
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // update data action
  },
  [updateUser.pending]: (state) => {
    state.loading = true;
  },
  [updateUser.fulfilled]: (state, action) => {
    state.loading = false;
    state.userdata = state.userdata.map((eachData) =>
    eachData.id === action.payload.id ? action.payload : eachData
    );
  },
  [updateUser.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload.massage;
  },
});

export const {
  nextStep,
  prevStep,
  updateFormData,
  setErrors,
  setCountry,
  setCity,
} = formSlice.actions;
export default formSlice.reducer;
