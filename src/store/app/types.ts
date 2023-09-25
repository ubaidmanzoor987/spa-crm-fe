export interface IBranchs {
  id: string;
  name: string;
  phone: string;
  address: number | string;
  default_currency: string;
  image?: string;
  branch_id?: string;
}
export interface ICurrency {
  currencyType: string;
  exchangeRate: string;
}
export interface IAmenities {
  id: number;
  name: string;
  branch_id: number | string;
  branch_name?: string;
}
export interface IService {
  id: number;
  name: string;
  actual_price: string;
  branch_id: number | string;
  amenitiesId: Array<string | number>;
  required_therapist: number | string;
  service_duration_price: IServiceDurationPrice[] | any;
  duration?: string;
  branch_name?: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  branch_id: number | string;
  branch_name?: string;
}

export interface IRoom {
  id: number;
  name: string;
  is_third_party: string | boolean;
  branch_id: number | string;
  amenities: Array<string>;
  amenitiesId?: Array<number>;
  branch_name?: string;
}

export interface IStaff {
  id: number;
  first_name: string;
  last_name: string;
  firstName?: string;
  lastName?: string;
  gender: string;
  dob: number | string;
  role: string;
  branch_id: number | string;
  phone: number | string;
  department: string;
  salary: number | string;
  present_address: string;
  permanent_address: string;
  permanentAddress?:string;
  presentAddress?:string;
  passport: number | string;
  idCard: number | string;
  email: string;
  commission_per_service: number | string;
  password: number | string;
  profile_picture: string;
  branch_name?: string;
}

export interface ICustomer {
  name: string;
  email: string;
  phone: string;
  dob?: string;
  street_address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  branch_id?: number;
  state_name?: string;
  remarks?: string;
  id?: number;
  previous_customer?: boolean;
}

export interface IServiceDurationPrice {
  duration: number;
  price: number;
}
export interface IBookingDurationService {
  duration: number;
  price: number;
}
export interface IBookingService {
  third_party_commission: string;
  time_slot: string;
  start_time: string;
  end_time: string;
  therapists: Array<string>;
  optional_therapists: Array<string>;
  // optional_therapists: Array<string>;
  // selected_duration: IBookingDurationService[];
  selected_duration: number;
  selected_price: number;
  service_name: string;
  room: string;
}
export interface IBookingProduct {
  product_ids: Array<string>;
}

export interface IBookingTherpaist {
  booking_id: string;
  service_id: string;
  user_ids: Array<string>;
}

export interface IBookings {
  id: number;
  date_time: string;
  is_driver_commission: Array<string> | string | undefined;
  is_other_commission?: Array<string> | string | undefined;
  branch_id: number | string;
  cutomer_id: string;
  discount: string;
  actual_price: string;
  services_fee: string;
  products_fee?: string;
  total_fee?: string;
  paid_price: string;
  payment_method: string | undefined;
  status: string;
  remarks: string;
  branch_name?: string;
}

export interface Itherapists_commission {
  id: string;
  commission: string;
}
export interface IProduct_detail {
  product_id: number;
  product_price: number;
}

export interface IBookingStatus {
  id: number;
  status: string;
  cash_payment: string;
  card_payment: string;
}

export interface IBooking extends Partial<IBookings> {
  customer_detail: ICustomer;
  service_detail: IBookingService[];
  product_detail: IProduct_detail[];
  tips?: Array<ITherapistTips>;
  driver_commission: string;
  cash_payment: string;
  card_payment: string;
  other_commission: string;
  therapists_commission: Itherapists_commission;
}

export interface ITherapistTips {
  user: IStaff;
  tip_amount: number;
  payment_method: string | undefined;
}
export interface IDeleteModal {
  title: string;
  description: string;
  onClickYes: () => void;
  visibile: boolean;
  isDeleting: boolean;
}

export interface IAppState {
  allServices: Array<IService>;
  allServicesPending: boolean;
  allServicesError: string | undefined;
  selectedService: IService;

  allProducts: Array<IProduct>;
  allProductsPending: boolean;
  allProductsError: string | undefined;
  selectedProduct: IProduct;

  allAmenities: Array<IAmenities>;
  allAmenitiesPending: boolean;
  allAmenitiesError: string | undefined;
  selectedAmenities: IAmenities;

  allRooms: Array<IRoom>;
  allRoomsPending: boolean;
  allRoomsError: string | undefined;
  selectedRoom: IRoom;

  allStaff: Array<IStaff>;
  allStaffPending: boolean;
  allStaffError: string | undefined;
  selectedStaff: IStaff;

  allBooking: Array<IBookings>;
  allBookingPending: boolean;
  allBookingError: string | undefined;
  selectedBooking: IBooking;

  allTherapist: Array<IStaff>;
  allTherapistPending: boolean;
  allTherapistError: string | undefined;

  allBranchs: Array<IBranchs>;
  allBranchsPending: boolean;
  allBranchsError: string | undefined;
  selectedBranchs: IBranchs;

  allCurrency: Array<ICurrency>;
  allCurrencyPending: boolean;
  allCurrencyError: string | undefined;
  selectedCurrency: ICurrency;

  branch: IBranchs;
  branchPending: boolean;
  branchError: string | undefined;

  openServiceModal: boolean;
  openProductModal: boolean;
  openAmenitesModal: boolean;
  openRoomModal: boolean;
  openStaffModal: boolean;
  openBookingModel: boolean;
  openBranchModel: boolean;

  deleteModal: IDeleteModal;

  selectedBranchSuperAdmin: string;
}
