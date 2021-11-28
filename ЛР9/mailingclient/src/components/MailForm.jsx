import React, {useState} from 'react';
import * as axios from "axios";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";


export default function MailForm() {
    const [messageType, setMessageType] = useState("");

    const handleSelectChange = (event) => {
        setMessageType(event.target.value);
    }

    const saveData = async (e) => {
        e.preventDefault();

        const postData = {
            sender: e.target.sender.value,
            reciever: e.target.reciever.value,
            message: e.target.message.value,
            messageType: messageType,
        };

        if (postData.sender === "" || postData.reciever === "" ||
            postData.message === "" || postData.messageType === "") {
            alert("Все поля должны быть заполнены!")
            return;
        }

        const headers = {
            "Content-Type": "application/json"
        };

        axios.post('http://localhost:5000/api/mail', postData, {headers});

        alert("Успешно сохранено!");
    }

    return (
        <form noValidate autoComplete="off" onSubmit={saveData}>
            <div className="inputFormElement">
                <TextField id="sender" className="inputElement" label="Отправитель" variant="outlined"/>
            </div>
            <div className="inputFormElement">
                <TextField id="reciever" className="inputElement" label="Получатель" variant="outlined"/>
            </div>
            <div className="inputFormElement">
                <TextField id="message" className="inputElement" label="Сообщение" variant="outlined"/>
            </div>
            <div className="inputFormElement">
                <FormControl variant="outlined" className="inputElement">
                    <InputLabel htmlFor="demo-simple-select-outlined">Тип сообщения</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={messageType}
                        onChange={handleSelectChange}
                        label="Age">
                        <MenuItem value="">
                            <em>Не выбрано...</em>
                        </MenuItem>
                        <MenuItem value="Заказное">Заказное</MenuItem>
                        <MenuItem value="Обычное">Обычное</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="inputFormElement">
                <Button type="submit" variant="outlined" className="submitButton" color="secondary">
                    Отправить сообщение
                </Button>
            </div>
        </form>
    );
}