import React, { useEffect, useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import SearchRestaurant from "../forms/SearchRestaurantForm";
import bg from "../image/bg-filters.png";
import UserService from "../services/userService";
import RestaurantLists from "../components/RestaurantLists";

const userService = new UserService();

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        province: "",
        restaurantName: "",
    });
    const [restaurants, setRestaurants] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await userService.getRestaurantByProvince(formData);
                setRestaurants(response.data.data);
            } catch (error) {
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            };
        };
        fetchRestaurants();
    }, [formData]);

    const handleSearchRestaurantByName = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const response = await userService.getRestaurantByName(formData);
            setRestaurants(response.data.data);
        } catch (error) {
            const errorMessage = {};
            if (error?.response?.data?.message) {
                errorMessage.message = error?.response?.data?.message;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        };
    };

    return (
        <Box component="main">
            <Box
                component="section"
                sx={{
                    backgroundColor: "black",
                    backgroundImage: `url(${bg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    py: 4,
                    px: 2,
                }}
            >
                <Box sx={{ marginBottom: 2 }}>
                    <Typography sx={{ color: "white" }} variant="h4">
                        <span className="bg-yellow-400 text-black font-medium rounded-lg p-1">Đặt bàn</span>
                        dễ dàng tại chuỗi nhà hàng
                    </Typography>
                    <Typography sx={{ color: "gray" }} variant="body1">
                        Đặt bàn trực tuyến toàn quốc. Đảm bảo chất lượng dịch vụ, món ngon và địa điểm ưng thích cho mọi thực khách.
                    </Typography>
                </Box>
                <Container>
                    <SearchRestaurant
                        formData={formData}
                        handleChange={handleChange}
                        handleSearchRestaurantByName={handleSearchRestaurantByName}

                    />
                </Container>
            </Box>
            <Container>
                <Box component="section">
                    <Typography sx={{ fontWeight: 600, my: 2 }} variant="h6">
                        Gợi ý cho bạn
                    </Typography>
                    <Divider />
                    {error?.message ? (
                        <Typography sx={{ color: "red", textAlign: "center", my: 2 }} variant="body1">
                            {error.message}
                        </Typography>
                    ) : (
                        <RestaurantLists
                            loading={loading}
                            restaurants={restaurants}
                        />
                    )}

                </Box>
            </Container>
        </Box >
    );
};

export default Home;