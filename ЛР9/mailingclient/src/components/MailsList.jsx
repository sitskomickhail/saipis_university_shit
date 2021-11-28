import React, {useEffect, useState} from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as axios from "axios";
import {Button, FormControl, InputLabel, makeStyles, MenuItem, Modal, Select, TextField} from "@material-ui/core";

let buttonIds = [];

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function bindFunctionToButtonElement(elementNode) {
    for (const [key, value] of Object.entries(elementNode)) {
        if (value !== null && value.props !== undefined && value.props.children.length > 0) {
            if (value.type === 'button') {
                const existingId = buttonIds.find(b => b === value.props.id);
                if (existingId === undefined) {
                    buttonIds.push(value.props.id);
                }
            } else {
                bindFunctionToButtonElement(value.props.children);
            }
        }
    }
}

export default function MailsList() {
    const classes = useStyles();
    const [mailsTable, setMailsTable] = useState(undefined);
    const [prepareListClicked, setPrepareListClicked] = useState(false);
    const [open, setOpen] = React.useState(false);

    const [messageType, setMessageType] = useState("");
    const [sender, setSender] = useState("");
    const [reciever, setReciever] = useState("");
    const [message, setMessage] = useState("");
    const [editingId, setEditingId] = useState(-1);

    const [modalStyle] = React.useState(getModalStyle);

    const handleSelectChange = (event) => {
        setMessageType(event.target.value);
    }

    const saveData = async (e) => {
        e.preventDefault();

        const postData = {
            id: editingId,
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

        axios.post('http://localhost:5000/api/mail/update', postData, {headers});

        alert("Успешно сохранено!");
    }

    const deleteMail = () => {
        const postData = {
            id: editingId
        };

        const headers = {
            "Content-Type": "application/json"
        };

        axios.post('http://localhost:5000/api/mail/delete', postData, {headers});

        alert("Успешно сохранено!");
    }

    const handleOpen = async (id) => {
        let response = await axios.get('http://localhost:5000/api/getMailById?id=' + id);

        setSender(response.data.sender);
        setReciever(response.data.reciever);
        setMessage(response.data.message);
        setMessageType(response.data.messageType)

        setOpen(true);
        setEditingId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/mail')
            .then(function (response) {
                const parsedHtml = ReactHtmlParser(response.data)

                bindFunctionToButtonElement(parsedHtml);
                setMailsTable(parsedHtml);
            })
    }, [])

    const handleEnableEditingClick = () => {
        buttonIds.forEach(id => {
            document.getElementById(id).removeEventListener("click", () => {
            })
            document.getElementById(id).addEventListener("click", () => {
                handleOpen(id);
            })
        })

        const editColumns = document.getElementsByClassName("editMailCol");
        console.log(editColumns);

        Array.from(editColumns).forEach((col) => {
            col.style.display = "table-cell";
        })

        console.log(buttonIds);


        setPrepareListClicked(true);
    }

    return (
        <div>
            <Button variant="outlined"
                    onClick={handleEnableEditingClick}
                    disabled={prepareListClicked}>Разрешить редактирование</Button>
            {mailsTable}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <form noValidate autoComplete="off" style={modalStyle} className={classes.paper} onSubmit={saveData}>
                    <div className="inputFormElement">
                        <TextField id="sender"
                                   defaultValue={sender}
                                   className="inputElement" label="Отправитель" variant="outlined"/>
                    </div>
                    <div className="inputFormElement">
                        <TextField id="reciever"
                                   defaultValue={reciever}
                                   className="inputElement" label="Получатель" variant="outlined"/>
                    </div>
                    <div className="inputFormElement">
                        <TextField id="message"
                                   defaultValue={message}
                                   className="inputElement" label="Сообщение" variant="outlined"/>
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
                        <Button type="submit" variant="outlined" className="submitButton" color="primary">
                            Обновить сообщение
                        </Button>
                    </div>

                    <div className="inputFormElement">
                        <Button variant="outlined" onClick={deleteMail} className="submitButton" color="secondary">
                            Удалить сообщение
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}