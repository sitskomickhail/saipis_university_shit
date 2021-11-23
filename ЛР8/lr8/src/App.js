import {useState} from 'react';
import * as axios from "axios";
import './App.css';
import Form from "./components/formComponent";

async function saveData(e) {
    e.preventDefault();

    const email = e.target.first_mail.value;
    const phone = e.target.first_phone.value;

    if(!email.match('^[^@\\s]+@[^@\\s\\.]+\\.[^@\\.\\s]+$')) {
        alert("Некорректный email адрес!");
        return;
    }

    if(!phone.match("^[0-9\\-\\+]{9,15}$")) {
        alert("Некорректный телефонный номер!");
        return;
    }

    const postData = {
        name: e.target.first_name.value,
        surname: e.target.first_surname.value,
        phone: phone,
        mail: email,
        sex: e.target.first_man.checked ? "Мужской" : "Женский",
        skills: e.target.first_skills.value,
        programmingLanguage: e.target.first_programmingLanguage.value,
        communication: [e.target.first_connection_phone.checked, e.target.first_connection_mail.checked]
    };

    const headers = {
        "Content-Type": "application/json"
    };

    axios.post('http://localhost:5000/api/data', postData, {headers});

    alert("Успешно сохранено!");
}

function App() {
    const [secondAreaAvailability, setSecondAreaAvailability] = useState(true);
    const [curiculumObject, setCuriculumObject] = useState(null);

    const getData = (e) => {
        e.preventDefault();

        axios.get('http://localhost:5000/api/data')
            .then((response) => {
                setCuriculumObject(response.data);
                setSecondAreaAvailability(false);
            });
    }

    return (
        <div>
            <h1 className="headerArea">Заполните резюме на работу</h1>
            <div className="mainArea">
                <Form idPrefix="first"
                      disabled={false}
                      buttonText="Сохранить данные"
                      buttonCallback={saveData}
                      reloadAfterSubmit={false}
                      curiculumObject={null}/>
                <Form idPrefix="second"
                      disabled={secondAreaAvailability}
                      buttonText="Получить и отобразить данные"
                      reloadAfterSubmit={true}
                      buttonCallback={getData}
                      curiculumObject={curiculumObject}/>
            </div>
        </div>
    );
}

export default App;
