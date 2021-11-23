import React from "react";
import {useState, useEffect} from 'react';

export default function Form(props) {

    const [sex, setSex] = useState("");
    const [mailConnection, setMailConnection] = useState(false);
    const [phoneConnection, setPhoneConnection] = useState(false);
    const [programmingLanguage, setProgrammingLanguage] = useState("");

    useEffect(() => {
        if (props.reloadAfterSubmit) {
            setPhoneConnection(props.curiculumObject === null ? false : props.curiculumObject.communication[1]);
            setMailConnection(props.curiculumObject === null ? false : props.curiculumObject.communication[0]);
            setSex(props.curiculumObject === null ? "" : props.curiculumObject.sex);
            setProgrammingLanguage(props.curiculumObject === null ? "" : props.curiculumObject.programmingLanguage);
        }
    }, [props])

    return (
        <div>
            <form className="formArea" onSubmit={(e) => props.buttonCallback(e)}>
                <div>
                    <label className="helpTagLabel" htmlFor={`${props.idPrefix}_name`}>Имя</label>
                    <div>
                        <input disabled={props.disabled}
                               defaultValue={props.curiculumObject == null ? "" : props.curiculumObject.name}
                               id={`${props.idPrefix}_name`}
                               type="text"
                               className="formValues"/>
                    </div>
                </div>
                <div>
                    <label className="helpTagLabel" htmlFor={`${props.idPrefix}_surname`}>Фамилия</label>
                    <div>
                        <input disabled={props.disabled}
                               defaultValue={props.curiculumObject == null ? "" : props.curiculumObject.surname}
                               id={`${props.idPrefix}_surname`}
                               type="text"
                               className="formValues"/>
                    </div>
                </div>
                <div>
                    <label className="helpTagLabel" htmlFor={`${props.idPrefix}_phone`}>Номер телефона</label>
                    <div>
                        <input disabled={props.disabled}
                               defaultValue={props.curiculumObject == null ? "" : props.curiculumObject.phone}
                               id={`${props.idPrefix}_phone`} type="text" className="formValues"/>
                    </div>
                </div>
                <div>
                    <label className="helpTagLabel" htmlFor={`${props.idPrefix}_mail`}>Email</label>
                    <div>
                        <input disabled={props.disabled}
                               defaultValue={props.curiculumObject == null ? "" : props.curiculumObject.mail}
                               id={`${props.idPrefix}_mail`} type="email"
                               className="formValues"/>
                    </div>
                </div>
                <div>
                    <label className="helpTagLabel">Пол</label>
                    <div>
                        <input disabled={props.disabled}
                               onChange={() => setSex("Мужской")}
                               checked={sex === "Мужской"}
                               type="radio" name="sex" id={`${props.idPrefix}_man`}/>
                        <label htmlFor={`${props.idPrefix}_man`} className="formValues">Мужской</label>
                        <input disabled={props.disabled}
                               onChange={() => setSex("Женский")}
                               checked={sex === "Женский"}
                               type="radio" name="sex" id={`${props.idPrefix}_woman`}/>
                        <label htmlFor={`${props.idPrefix}_woman`}
                               className="formValues">Женский</label>
                    </div>
                </div>
                <div>
                    <label htmlFor={`${props.idPrefix}_programmingLanguage`} className="helpTagLabel">Язык
                        программирования</label>
                    <select id={`${props.idPrefix}_programmingLanguage`}
                            className="formValues"
                            disabled={props.disabled}>
                        <option selected={programmingLanguage === "C#"} value="C#">C#</option>
                        <option selected={programmingLanguage === "Java"} value="Java">Java</option>
                        <option selected={programmingLanguage === "Ruby"} value="Ruby">Ruby</option>
                        <option selected={programmingLanguage === "Swift"} value="Swift">Swift</option>
                        <option selected={programmingLanguage === "C++"} value="C++">C++</option>
                        <option selected={programmingLanguage === "JavaScript"} value="JavaScript">JavaScript</option>
                    </select>
                </div>
                <div>
                    <label className="helpTagLabel" htmlFor={`${props.idPrefix}_skills`}>Ваши ключевые навыки</label>
                    <div>
                        <textarea disabled={props.disabled}
                                  defaultValue={props.curiculumObject == null ? "" : props.curiculumObject.skills}
                                  cols="65"
                                  className="formValues"
                                  rows="10" id={`${props.idPrefix}_skills`}/>
                    </div>
                </div>
                <div>
                    <label className="helpTagLabel">Выберите удобные средства связи с вами</label>
                    <div>
                        <input disabled={props.disabled} type="checkbox"
                               onChange={() => setPhoneConnection(!phoneConnection)}
                               checked={phoneConnection}
                               id={`${props.idPrefix}_connection_phone`}
                               name={`${props.idPrefix}_connection_phone`}/>
                        <label className="formValues" htmlFor={`${props.idPrefix}_connection_phone`}>Через телефон</label>
                        <input disabled={props.disabled} type="checkbox"
                               checked={mailConnection}
                               onChange={() => setMailConnection(!mailConnection)}
                               id={`${props.idPrefix}_connection_mail`}
                               name={`${props.idPrefix}_connection_mail`}/>
                        <label className="formValues" htmlFor={`${props.idPrefix}_connection_mail`}>Через почту</label>
                    </div>
                </div>
                <button type="submit">{props.buttonText}</button>
            </form>
        </div>
    );
}