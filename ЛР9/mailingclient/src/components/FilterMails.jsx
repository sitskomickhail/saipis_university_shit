import 'date-fns';
import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import * as axios from "axios";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

export default function FilterMails() {

    const [searchResult, setSearchResult] = useState("");
    const [searchDate, setSearchDate] = useState(new Date())

    const handleDateChange = (date) => {
        setSearchDate(new Date(date.target.value));
    };

    const searchMails = () => {
        const preparedDate = `${searchDate.getDate()}.${searchDate.getMonth() + 1}.${searchDate.getFullYear()}`

        axios.get(`http://localhost:5000/api/mail/filters?messageForDate=${preparedDate}`)
            .then(function (response) {
                console.clear();
                console.log(response.data);
                setSearchResult("Откройте консоль для просмотра результата")
            })
    }

    return (
        <div className="filterResult">
            <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue="28.11.2021"
                className="filterElement"
                onChange={handleDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button variant="contained"
                    className="filterElement"
                    color="primary"
                    onClick={searchMails}>Найти заказные письма</Button>
            <div>{searchResult}</div>
        </div>
    );
}