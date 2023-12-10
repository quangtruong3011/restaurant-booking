import React from "react";
import { List, ListItem, ListItemText, ButtonGroup, Button, FormControl, TextField } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";

const SelectedMenuList = ({
    formData,
    selectedMenu,
    handleIncrement,
    handleDecrement,
    handleChange,
}) => {
    return (
        <List>
            {selectedMenu.map((menuItem, index) => (
                <ListItem key={index}>
                    <ListItemText primary={menuItem.productName} />
                    <ButtonGroup>
                        <Button onClick={() => handleDecrement(menuItem.productId)}>
                            <Remove fontSize="small" />
                        </Button>
                        <FormControl sx={{ width: 50 }}>
                            <TextField
                                type="text"
                                id="quantity"
                                name="quantity"
                                size="small"
                                value={formData.menuBooking[index]?.quantity || 1}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        </FormControl>
                        <Button onClick={() => handleIncrement(menuItem.productId)}>
                            <Add fontSize="small" />
                        </Button>
                    </ButtonGroup>
                </ListItem>
            ))}
        </List>
    );
};

export default SelectedMenuList;