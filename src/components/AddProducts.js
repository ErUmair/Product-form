import React, { useEffect, useState } from 'react';
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useNavigate,useLocation } from "react-router-dom";
import { addItem, updateItem } from '../redux/actions';
import { Button, Container, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography, } from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import * as Yup from "yup";



const useStyles = makeStyles(() => ({
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
    },
    titleTypo: {
        flexGrow: 1,
    },
    container: {
        padding: 20,
    },
}));
const AddProducts = () => {
    console.log('here');

    const categories = [...Array(10)].map((_,i)=>({
        category:'Items' + (i+1),
    }))
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [state, setState] = useState({
        id: null, name: "", category: "", desc: "", expiryDate: "", price: "", discount: null, sellPrice: "", finalPrice: ""
    });

    const products = useSelector(state => state.productReducer.products);

    // useEffect(() => {
    //     let id = window.location?.href?.split('/')?.at(-1);
    //     if (id) {
    //         let obj = products.find(item => item.id == id) || {};
    //         if (Object.keys(obj).length) {
    //             console.log(obj);
    //             setState(obj)
    //         }
    //     }
    // }, [])

    useEffect(() => {
        if (location.state && location.state.id) {
          setState(location.state);
        }
      }, [location.state]);
   

    const handleAddItem = (data) => {
        if (data.id) {
            dispatch(
                updateItem({
                    ...data,
                    sellPrice: data.price - data.price * (data.discount / 100),
                })
            );
        } else
            dispatch(
                addItem({
                    ...data,
                    id: new Date().getTime(),
                    sellPrice: data.price - data.price * (data.discount / 100),
                })
            );
        navigate("/");
    };
    return (
        <div>
            <Container>
                <Grid container>
                    <Grid xs={12} className={classes.title}>
                        <IconButton onClick={() => navigate("/")}>
                            <ArrowBackIosNewRounded />
                        </IconButton>
                        <Typography variant="h5" className={classes.titleTypo}>
                            {state?.id ? "Update" : "Add"} Product
                        </Typography>
                    </Grid>
                    <Divider />
                </Grid>
                <Formik
                    initialValues={state}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleAddItem(values)}
                    enableReinitialize
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        isValid,
                        handleSubmit,
                    }) => (
                        <Grid container spacing={3} xs={12} className={classes.container}>
                            <Grid item xs={6}>
                                <TextField
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    value={values.name}
                                    label="Product name"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Category
                                    </InputLabel>
                                    <Select
                                        error={!!errors.category}
                                        helperText={errors.category}
                                        name="category"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        fullWidth
                                        value={values.category}
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Category"
                                    >
                                        {categories.map((c) => (
                                            <MenuItem value={c.category}>{c.category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    error={!!errors.desc}
                                    helperText={errors.desc}
                                    name="desc"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.desc}
                                    label="Desccription"
                                    multiline
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    error={!!errors.expiryDate}
                                    helperText={errors.expiryDate}
                                    name="expiryDate"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.expiryDate}
                                    type={"date"}
                                    label="Expiry date"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    type={"number"}
                                    label="Cost price"
                                    error={!!errors.price}
                                    helperText={errors.price}
                                    name="price"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    type={"number"}
                                    name="discount"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.discount}
                                    label="Discount(%)"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    disabled
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="sellPrice"
                                    value={values.price - values.price * (values.discount / 100)}
                                    onBlur={handleBlur}
                                    type={"number"}
                                    label="Sell price"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    disabled
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="finalPrice"
                                    value={(values.price - values.price * (values.discount / 100))-1}
                                    onBlur={handleBlur}
                                    type={"number"}
                                    label="Final price"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Container
                                    className={classes.title}
                                    style={{ justifyContent: "center", display: "flex" }}
                                >
                                    <Button
                                        disabled={!isValid}
                                        onClick={handleSubmit}
                                        variant="contained"
                                        type="submit"
                                    >
                                        {state.id ? "Update" : "Add"}
                                    </Button>
                                </Container>
                            </Grid>
                        </Grid>
                    )}
                </Formik>
            </Container>
        </div>
    )
}

const validationSchema = () =>
    Yup.object().shape({
        name: Yup.string().required("Name should not be empty"),
        category: Yup.string().required("Please select category"),
        desc: Yup.string().required("Desccription is required"),
        expiryDate: Yup.string().required("Expiry date require to be filled"),
        price: Yup.string().required("Price is required"),
        discount: Yup.string(),
    });

export default AddProducts