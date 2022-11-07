import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import { AddCircleOutline, Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { deleteItem, deleteItems, updateItem } from '../redux/actions';



const useStyles = makeStyles(() => ({
    flex: {
        display: "flex",
    },
}));

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: 5,
};

const ProductsTable = () => {
    const [open, setOpen] = useState(false);
    const [item, setItems] = useState([]);
    const navigate = useNavigate();
    const productReducer = useSelector(state => state.productReducer.products);

    const classes = useStyles();
    const dispatch = useDispatch();



    const handleDeleteItem = (id) => {
        dispatch(deleteItem(id));
    };

    const handleDeleteItems = (id) => {
        if (item.length) {
            dispatch(deleteItems(item));
            setItems([]);
            setOpen(false);
        } else {
            alert('please select items from table');
        }
    };

    const editProduct = (obj, data) => {
        console.log({ obj, data });
        navigate('/edit-product/' + data[0])
    }

    const options = {
        filter: true,
        print: false,
        viewColumns: false,
        download: false,
        pagination: false,
        customToolbar: () => (
            <IconButton>
                <AddCircleOutline onClick={() => navigate("/add-product")} />
            </IconButton>
        ),
        onRowsDelete: ({ data }) => {
            setOpen((a) => !a);
            const ids = data.map((a) => {
                const item = productReducer[a.dataIndex];
                return item.id;
            });
            setItems(ids);
            return false;
        },
    };
    const columns = [
        {
            name: "id",
            label: "id",
            options: {
                display: "excluded",
                filter: true,
                sort: true,
            },
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "category",
            label: "Category",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "desc",
            label: "Description",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "expiryDate",
            label: "Expiry Date",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "price",
            label: "Cost Price",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "discount",
            label: "Discount",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "sellPrice",
            label: "Sell Price",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "finalPrice",
            label: "Final Price",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (_, { rowData }) => {
                    console.log(rowData);
                    const data = productReducer.find((a) => a.id === rowData[0]);
                    return (
                        <div className={classes.flex}>
                            <IconButton onClick={() =>navigate("/edit-product", { state: data })}>
                                <Edit />
                            </IconButton>
                            <IconButton
                                color="error" onClick={() => handleDeleteItem(data.id)}>
                                <Delete />
                            </IconButton>
                        </div>
                    );
                },
            },
        },
    ];
    return (
        <div className='table'>
            <Container>
                <MUIDataTable
                    title={"Add Products"}
                    data={productReducer}
                    columns={columns}
                    options={options}
                />
                <Modal
                    keepMounted
                    open={open}
                    onClose={() => {
                        setItems([]);
                        setOpen((a) => !a);
                    }}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            Confirmation!
                        </Typography>
                        <Typography id="keep-mounted-modal-description" item sx={{ mt: 2 }}>
                            You are About to delete selected products.

                            <h6 className='lead'>This will delete your products from list<br />
                                Are you sure?
                            </h6>

                        </Typography>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: 25,
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setItems([]);
                                    setOpen((a) => !a);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button color="error" onClick={() => handleDeleteItems(item)}>
                                Delete
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </Container>
        </div>
    )
}

export default ProductsTable