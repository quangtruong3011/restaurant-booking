import BaseService from "./baseService";

class UserService extends BaseService {
    // CREATE
    createBooking = (data) => {
        return this.post("/user/booking", data);
    }

    getRestaurantByProvince = (data) => {
        return this.post("/user/searchByProvince", data);
    };

    getRestaurantByName = (data) => {
        return this.post("/user/searchByName", data);
    };

    checkReservation = (data) => {
        return this.post("/user/booking/checkReservation", data);
    };

    // READ
    getAllRestaurant = () => {
        return this.get("/user/restaurant");
    }

    getInfoRestaurant = (id) => {
        return this.get(`/user/restaurant/${id}`);
    }

    getAllMenu = (id) => {
        return this.get(`/user/menu/${id}`);
    };

    getImageRestaurant = (id) => {
        return this.get(`/user/restaurant/image/${id}`);
    };

    getBookingById = (id) => {
        return this.get(`/user/booking/${id}`);
    };

    getSuggestRestaurant = (id) => {
        return this.get(`/user/suggest/${id}`);
    };

    getProvince = () => {
        return this.get("/user/province");
    };

    getOtp = (id) => {
        return this.get(`/user/otp/${id}`);
    };

    // UPDATE
    updateBooking = (id, data) => {
        return this.put(`/user/booking/${id}`, data);
    }

    // DELETE
    deleteBooking = (id) => {
        return this.delete(`/user/booking/${id}`);
    }
}

export default UserService;