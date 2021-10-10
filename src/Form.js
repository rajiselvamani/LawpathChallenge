import React, { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import logo from "./assests/Lawpath_logo.png"
import './App.css';

function Form() {


     //state hooks used inside this component 
    const [Postcode, setPostcode] = useState("");
    const [SuburbName, setSuburbName] = useState("");
    const [StateName, setStateName] = useState("");
    const [Message, setMessage] = useState("");
    const [SnackColor, setSnackColor] = useState("");
    const [open, setOpen] = useState(false);

    //handle change function for value change in text fields

    const handleChange = (e) => {
        let value = e.target.value.toUpperCase();
        if (e.target.name === "Postcode")
            setPostcode(value);
        else if (e.target.name === "Suburb")
            setSuburbName(value);
        else if (e.target.name === "State")
            setStateName(value);
    }

    //setting state to close for snackbar
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    //function invoked after submitting button
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);

        //error message for missing fields
        if (Postcode === "" || StateName === "" || SuburbName === "")
        {
            setOpen(true);
            setSnackColor("error")
            setMessage("Mandatory fields missing")
        }
           
        else {
            //calling api with postcode
            axios.get(`http://localhost:8000/postcode/search/${Postcode}`)
                .then((response) => {
                    if (response.status !== 200)
                    {
                        //sending error message if response is not ok
                        setOpen(true);
                        setSnackColor("error")
                        setMessage("Failed to validate the address")
                    }
                    else {

                        //validating backend response with form inputs

                        let suburbs = {};
                        const postcode = response.data.body.split("\n")
                        postcode.forEach(function (post) {
                            suburbs[post.split("|")[2]] = post.split("|")[3];
                        });

                        if (!(SuburbName in suburbs))
                        {
                            setOpen(true);
                            setSnackColor("error")
                            setMessage(`The postcode ${Postcode} does not match the suburb ${SuburbName}`)
                        }
                        else if (suburbs[SuburbName] !== StateName)
                        {
                            setOpen(true);
                            setSnackColor("error")
                            setMessage(`The suburb ${SuburbName}  does not exist in the state ${StateName}`)
                        } 
                        else {
                            setOpen(true);
                            setSnackColor("success")
                            setMessage("The postcode, suburb and state entered are valid")
                        }
                    }

                })
                .catch((error) => {
                    //catch block for hadling errors
                    setOpen(true);
                    setSnackColor("error")
                    setMessage("Failed to validate the address")
                })
        }
    };

    //Alert component inside snack bar
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <div>
            <div className="center-image">
            <img src={logo} alt="Logo" style={{width:200,height:120}}/>
            </div>
            <Grid>
                <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" align="center">
                            Address Validation
                        </Typography>
                        <form>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={6} item>
                                    <TextField type="number" name="Postcode" placeholder="Post Code" label="Post Code" variant="outlined" onChange={handleChange} fullWidth required error={Postcode === "" && open} />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField type="text" name="Suburb" placeholder="Suburb" label="Suburb" variant="outlined" onChange={handleChange} fullWidth required error={SuburbName === "" && open} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField type="text" name="State" placeholder="State" label="State" variant="outlined" onChange={handleChange} fullWidth required error={StateName === "" && open} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} fullWidth>Submit</Button>
                                </Grid>
                                <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                    <Alert onClose={handleClose} severity={SnackColor} sx={{ width: '100%' }}>
                                        {Message}
                                    </Alert>
                                </Snackbar>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    );
}

export default Form;