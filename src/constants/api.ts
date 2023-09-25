export const REQUEST_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const API_BASE_URL =
  // process.env.REACT_APP_API_URL || "http://202.59.90.27:6789";
process.env.REACT_APP_API_URL || "http://localhost:8000";
export const API_SIGNIN = "/users/login";

//Service Api
export const API_GET_ALL_SERVICES = "/services/get-all-services";
export const API_CREATE_SERVICE = "/services/create-service";
export const API_UPDATE_SERVICE = "/services/update-service";
export const API_DELETE_SERVICE = "/services/delete-service/";

//Rooms Apis
export const API_GET_ALL_ROOMS = "/rooms/get-all-rooms";
export const API_CREATE_ROOM = "/rooms/create-room";
export const API_UPDATE_ROOM = "/rooms/update-room";
export const API_DELETE_ROOM = "/rooms/delete-room/";

//Amenities Apis
export const API_GET_ALL_AMENITIES = "/amenities/get-all-amenities";
export const API_CREATE_AMENITIES = "/amenities/create-amenitie";
export const API_UPDATE_AMENITIES = "/amenities/update-amenitie";
export const API_DELETE_AMENITIES = "/amenities/delete-amenitie/";

//Staff/User
export const API_GET_ALL_STAFF = "/users";
export const API_CREATE_STAFF = "/users/add-staff";
export const API_UPDATE_STAFF = "/users/update";
export const API_DELETE_STAFF = "/users/delete/";

//Staff/booking
export const API_GET_ALL_BOOKING = "/bookings/get-all-bookings";
export const API_CREATE_BOOKING = "/bookings/create-booking";
export const API_UPDATE_BOOKING = "/bookings/update-booking";
export const API_UPDATE_BOOKING_STATUS = "/bookings/update-booking-status";
export const API_GET_BOOKING = "/bookings/get-booking/";
export const API_GET_PRINT_BOOKING = "/bookings/get-print-booking/";
export const API_DELETE_BOOKING = "/bookings/delete-booking/";
//Product Api
export const API_GET_ALL_PRODUCTS = "/products/get-all-products";
export const API_CREATE_PRODUCTS = "/products/create-product";
export const API_UPDATE_PRODUCTS = "/products/update-product";
export const API_DELETE_PRODUCTS = "/products/delete-product/";

//Branch/User
export const API_GET_ALL_BRANCH = "/branch/get-all-branches";
export const API_GET_BRANCH = "/branch/get-branch/";
export const API_CREATE_BRANCH = "/branch/create-branch";
export const API_UPDATE_BRANCH = "/branch/update-branch";
export const API_DELETE_BRANCH = "/branch/delete-branch/";

//Currency API
export const API_GET_ALL_CURRENCY = "/currency/get-all-currency";
export const API_FIND_CURRENCY= "/currency/currency-findById/";
export const API_CREATE_CURRENCY = "/currency/create-currency";
export const API_UPDATE_CURRENCY = "/currency/update-currency";
export const API_DELETE_CURRENCY = "/currency/delete-currency/";

//Therapist
export const API_GET_ALL_THERAPSIT = "/users/";
