import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  IAmenities,
  IAppState,
  IBooking,
  IBookings,
  IBranchs,
  ICurrency,
  IDeleteModal,
  IProduct,
  IRoom,
  IService,
  IStaff,
} from "./types";
import { getAllServices } from "@/services/app/services";
import { getAllAmenities } from "@/services/app/amenities";
import { getAllRooms } from "@/services/app/rooms";
import { getAllStaff } from "@/services/app/staff";
import { getAllBookings } from "@/services/app/booking";
import { getAllTherapsit } from "@/services/app/therapist";
import { getAllProducts } from "@/services/app/products";
import { getAllBranchs, getBranch } from "@/services/app/branchSetting";
import { getAllCurrency} from "@/services/app/currency"
export const getAllServicesThunk = createAsyncThunk(
  "app/getServices",
  async () => {
    return await getAllServices();
  }
);
export const getAllProductsThunk = createAsyncThunk(
  "app/getProducts",
  async () => {
    return await getAllProducts();
  }
);

export const getDefaultCurrency = createAsyncThunk(
  "app/getDefaultCurrency",
  async (branch_id:string | number) => {
    return await getBranch(branch_id);
  }
);

export const getCurrency = createAsyncThunk(
  "app/getCurrency",
  async () => {
    return await getAllCurrency();
  }
);
export const getAllAmenitiesThunk = createAsyncThunk(
  "app/getAmenities",
  async () => {
    return await getAllAmenities();
  }
);

export const getAllRoomsThunk = createAsyncThunk("app/getRooms", async () => {
  return await getAllRooms();
});

export const getAllStaffThunk = createAsyncThunk("app/getStaff", async () => {
  return await getAllStaff();
});

export const getAllBookingsThunk = createAsyncThunk(
  "app/getAllBooking",
  async () => {
    return await getAllBookings();
  }
);

export const getAllTherapistThunk = createAsyncThunk(
  "app/gettherapsit",
  async () => {
    return await getAllTherapsit();
  }
);

export const getAllBranchThunk = createAsyncThunk(
  "app/getbranchSetting",
  async () => {
    return await getAllBranchs();
  }
);

export const initialState: IAppState = {
  //Service
  allServices: [] as Array<IService>,
  allServicesPending: false,
  allServicesError: "",
  selectedService: {} as IService,
  openServiceModal: false,

  //Product
  allProducts: [] as Array<IProduct>,
  allProductsPending: false,
  allProductsError: "",
  selectedProduct: {} as IProduct,
  openProductModal: false,

  //Branch
  allBranchs: [] as Array<IBranchs>,
  allBranchsPending: false,
  allBranchsError: "",
  selectedBranchs: {} as IBranchs,
  openBranchModel: false,

  branch: {} as IBranchs,
  branchPending: false,
  branchError: "",

//Currency
  allCurrency: [] as Array<ICurrency>,
  allCurrencyPending: false,
  allCurrencyError: "",
  selectedCurrency: {} as ICurrency,


  //Amenities
  allAmenities: [] as Array<IAmenities>,
  allAmenitiesPending: false,
  allAmenitiesError: "",
  selectedAmenities: {} as IAmenities,
  openAmenitesModal: false,

  //Room
  allRooms: [] as Array<IRoom>,
  allRoomsPending: false,
  allRoomsError: "",
  selectedRoom: {} as IRoom,
  openRoomModal: false,

  //Staff
  allStaff: [] as Array<IStaff>,
  allStaffPending: false,
  allStaffError: "",
  selectedStaff: {} as IStaff,
  openStaffModal: false,

  //Booking
  allBooking: [] as Array<IBookings>,
  allBookingPending: false,
  allBookingError: "",
  selectedBooking: {} as IBooking,
  openBookingModel: false,

  //Therapsit
  allTherapist: [] as Array<IStaff>,
  allTherapistPending: false,
  allTherapistError: "",

  deleteModal: {
    title: "",
    description: "",
    visibile: false,
    onClickYes: () => {},
    isDeleting: false,
  },
  selectedBranchSuperAdmin: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clearErrors(state: IAppState) {
      state.allServicesError = "";
      state.allProductsError = "";
      state.allRoomsError = "";
      state.allAmenitiesError = "";
    },
    resetApp: () => {
      return initialState;
    },
    handleOpenServiceModal(
      state: IAppState,
      { payload }: PayloadAction<boolean>
    ) {
      state.openServiceModal = payload;
    },
    setSelectedService(state: IAppState, { payload }: PayloadAction<IService>) {
      state.selectedService = payload;
    },
    handleOpenAmenitesModal(
      state: IAppState,
      { payload }: PayloadAction<boolean>
    ) {
      state.openAmenitesModal = payload;
    },

    setSelectedAmenites(
      state: IAppState,
      { payload }: PayloadAction<IAmenities>
    ) {
      state.selectedAmenities = payload;
    },
    handleOpenRoomModal(state: IAppState, { payload }: PayloadAction<boolean>) {
      state.openRoomModal = payload;
    },
    setSelectedRoom(state: IAppState, { payload }: PayloadAction<IRoom>) {
      state.selectedRoom = payload;
    },
    handleOpenBranchModal(
      state: IAppState,
      { payload }: PayloadAction<boolean>
    ) {
      state.openBranchModel = payload;
    },
    setSelectedBranch(state: IAppState, { payload }: PayloadAction<IBranchs>) {
      state.selectedBranchs = payload;
    },
    handleOpenProductModal(
      state: IAppState,
      { payload }: PayloadAction<boolean>
    ) {
      state.openProductModal = payload;
    },
    setSelectedProduct(state: IAppState, { payload }: PayloadAction<IProduct>) {
      state.selectedProduct = payload;
    },
   
    handleOpenStaffModal(
      state: IAppState,
      { payload }: PayloadAction<boolean>
    ) {
      state.openStaffModal = payload;
    },
    handleOpenBookingModel(
      state: IAppState,
      { payload }: PayloadAction<boolean>
    ) {
      state.openBookingModel = payload;
    },
    setSelectedStaff(state: IAppState, { payload }: PayloadAction<IStaff>) {
      state.selectedStaff = payload;
    },
    setSelectedBooking(state: IAppState, { payload }: PayloadAction<IBooking>) {
      state.selectedBooking = payload;
    },
    setDeleteModal(state: IAppState, { payload }: PayloadAction<IDeleteModal>) {
      state.deleteModal = payload;
    },
    setBranchData(state: IAppState, { payload }: PayloadAction<IBranchs>) {
      state.branch = payload;
    },
    setSelectedBranchSuperAdmin(state: IAppState, { payload }: PayloadAction<string>) {
      state.selectedBranchSuperAdmin = payload;
    },
  },
  extraReducers: (builder) => {
    // services
    builder.addCase(getAllServicesThunk.pending, (state) => {
      state.allServicesPending = true;
    });
    builder.addCase(getAllServicesThunk.rejected, (state, { error }) => {
      state.allServicesError = error.message;
      state.allServicesPending = false;
    });
    builder.addCase(getAllServicesThunk.fulfilled, (state, action) => {
      state.allServices = action.payload;
      state.allServicesPending = false;
    });

    // products
    builder.addCase(getAllProductsThunk.pending, (state) => {
      state.allProductsPending = true;
    });
    builder.addCase(getAllProductsThunk.rejected, (state, { error }) => {
      state.allProductsError = error.message;
      state.allProductsPending = false;
    });
    builder.addCase(getAllProductsThunk.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.allProductsPending = false;
    });

    // amenities
    builder.addCase(getAllAmenitiesThunk.pending, (state) => {
      state.allAmenitiesPending = true;
    });
    builder.addCase(getAllAmenitiesThunk.rejected, (state, { error }) => {
      state.allRoomsError = error.message;
      state.allAmenitiesPending = false;
    });
    builder.addCase(getAllAmenitiesThunk.fulfilled, (state, action) => {
      state.allAmenities = action.payload;
      state.allAmenitiesPending = false;
    });

    // rooms
    builder.addCase(getAllRoomsThunk.pending, (state) => {
      state.allRoomsPending = true;
    });
    builder.addCase(getAllRoomsThunk.rejected, (state, { error }) => {
      state.allRoomsError = error.message;
      state.allRoomsPending = false;
    });
    builder.addCase(getAllRoomsThunk.fulfilled, (state, action) => {
      state.allRooms = action.payload;
      state.allRoomsPending = false;
    });

    // staff
    builder.addCase(getAllStaffThunk.pending, (state) => {
      state.allStaffPending = true;
    });
    builder.addCase(getAllStaffThunk.rejected, (state, { error }) => {
      state.allStaffError = error.message;
      state.allStaffPending = false;
    });
    builder.addCase(getAllStaffThunk.fulfilled, (state, action) => {
      state.allStaff = action.payload;
      state.allStaffPending = false;
    });

    // bookings
    builder.addCase(getAllBookingsThunk.pending, (state) => {
      state.allBookingPending = true;
    });
    builder.addCase(getAllBookingsThunk.rejected, (state, { error }) => {
      state.allBookingError = error.message;
      state.allBookingPending = false;
    });
    builder.addCase(getAllBookingsThunk.fulfilled, (state, action) => {
      state.allBooking = action.payload;
      state.allBookingPending = false;
    });

    //Therapist
    builder.addCase(getAllTherapistThunk.pending, (state) => {
      state.allTherapistPending = true;
    });
    builder.addCase(getAllTherapistThunk.rejected, (state, { error }) => {
      state.allTherapistError = error.message;
      state.allTherapistPending = false;
    });
    builder.addCase(getAllTherapistThunk.fulfilled, (state, action) => {
      state.allTherapist = action.payload;
      state.allTherapistPending = false;
    });

    // Branch
    builder.addCase(getAllBranchThunk.pending, (state) => {
      state.allBranchsPending = true;
    });
    builder.addCase(getAllBranchThunk.rejected, (state, { error }) => {
      state.allBranchsError = error.message;
      state.allBranchsPending = false;
    });
    builder.addCase(getAllBranchThunk.fulfilled, (state, action) => {
      state.allBranchs = action.payload;
      state.allBranchsPending = false;
    });

    // DefaultCurrency
    builder.addCase(getDefaultCurrency.pending, (state) => {
      state.branchPending = true;
    });
    builder.addCase(getDefaultCurrency.rejected, (state, { error }) => {
      state.branchError = error.message;
      state.branchPending = false;
    });
    builder.addCase(getDefaultCurrency.fulfilled, (state, action) => {
      state.branch = action.payload;
      state.branchPending = false;
    });

    // get all Currencies
    builder.addCase(getCurrency.pending, (state) => {
      state.allCurrencyPending = true;
    });
    builder.addCase(getCurrency.rejected, (state, { error }) => {
      state.allCurrencyError = error.message;
      state.allCurrencyPending = false;
    });
    builder.addCase(getCurrency.fulfilled, (state, action) => {
      state.allCurrency = action.payload;
      state.allCurrencyPending = false;
    });

  },
});

export const {
  clearErrors,
  resetApp,
  handleOpenServiceModal,
  setSelectedAmenites,
  setSelectedService,
  handleOpenAmenitesModal,
  handleOpenRoomModal,
  handleOpenBranchModal,
  handleOpenStaffModal,
  handleOpenBookingModel,
  setSelectedRoom,
  handleOpenProductModal,
  setSelectedProduct,
  setSelectedBranch,
  setSelectedStaff,
  setSelectedBooking,
  setDeleteModal,
  setBranchData,
  setSelectedBranchSuperAdmin,
} = appSlice.actions;

export default appSlice.reducer;
