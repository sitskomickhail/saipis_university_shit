import {useState} from 'react';
import * as axios from "axios";
import './App.css';
import Form from "./components/formComponent";

async function saveData(e) {
    e.preventDefault();

    const postData = {
        name: e.target.first_name.value,
        surname: e.target.first_surname.value,
        phone: e.target.first_phone.value,
        mail: e.target.first_mail.value,
        sex: e.target.first_man.checked ? "Мужской" : "Женский",
        skills: e.target.first_skills.value,
        communication: [e.target.first_connection_phone.checked, e.target.first_connection_mail.checked]
    };

    const headers = {
        "Content-Type": "application/json"
    };

    axios.post('http://localhost:5000/api/data', postData, {headers});
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
                      curiculumObject={null}/>
                <Form idPrefix="second"
                      disabled={secondAreaAvailability}
                      buttonText="Получить и отобразить данные"
                      buttonCallback={getData}
                      curiculumObject={curiculumObject}/>
            </div>
        </div>
    );
}

export default App;
