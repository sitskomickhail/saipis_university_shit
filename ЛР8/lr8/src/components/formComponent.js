import React from "react";

export default function Form(props) {
    return (
        <div>
            <form className="formArea" onSubmit={(e) => props.buttonCallback(e)}>
                <div>
                    <label htmlFor={`${props.idPrefix}_name`}>Имя</label>
                    <div>
                        <input disabled={props.disabled}
                               defaultValue={props.curiculumObject == null ? "" : props.curiculumObject.name}
                               id={`${props.idPrefix}_name`}
                               type="text"/>
                    </div>
                </div>
                <div>
                    <label htmlFor={`${props.idPrefix}_surname`}>Фамилия</label>
                    <div><input disabled={props.disabled}
                                defaultValue={props.curiculumObject == null ? "" : props.curiculumObject.surname}
                                id={`${props.idPrefix}_surname`}
                                type="text"/></div>
                </div>
                <div>
                    <label htmlFor={`${props.idPrefix}_phone`}>Номер телефона</label>
                    <div>
                        <input disabled={props.disabled}
                               defaultValue={props.curiculumObject == null ? "" : props.curiculumObject.phone}
                               id={`${props.idPrefix}_phone`} type="text"/>
                    </div>
                </div>
                <div>
                    <label htmlFor={`${props.idPrefix}_mail`}>Email</label>
                    <div>
                        <input disabled={props.disabled}
                               defaultValue={props.curiculumObject == null ? "" : props.curiculumObject.mail}
                               id={`${props.idPrefix}_mail`} type="email"/>
                    </div>
                </div>
                <div>
                    <label>Пол</label>
                    <div>
                        <input disabled={props.disabled}
                               defaultChecked={props.curiculumObject == null ? "" : props.curiculumObject.sex === "Мужской"}
                               type="radio" name="sex" id={`${props.idPrefix}_man`}/>
                        <label htmlFor={`${props.idPrefix}_man`}>Мужской</label>
                        <input disabled={props.disabled}
                               defaultChecked={props.curiculumObject == null ? "" : props.curiculumObject.sex === "Женский"}
                               type="radio" name="sex" id={`${props.idPrefix}_woman`}/>
                        <label htmlFor={`${props.idPrefix}_woman`}>Женский</label>
                    </div>
                </div>
                <div>
                    <label htmlFor={`${props.idPrefix}_skills`}>Ваши ключевые навыки</label>
                    <div>
                        <textarea disabled={props.disabled}
                                  defaultValue={props.curiculumObject == null ? "" : props.curiculumObject.skills}
                                  rows="10" id={`${props.idPrefix}_skills`}/>
                    </div>
                </div>
                <div>
                    <label>Выберите удобные средства связи с вами</label>
                    <div>
                        <input disabled={props.disabled} type="checkbox"
                               defaultChecked={props.curiculumObject == null ? "" : props.curiculumObject.communication[0]}
                               id={`${props.idPrefix}_connection_phone`}
                               name={`${props.idPrefix}_connection_phone`}/>
                        <label htmlFor={`${props.idPrefix}_connection_phone`}>Через телефон</label>
                        <input disabled={props.disabled} type="checkbox"
                               defaultChecked={props.curiculumObject == null ? "" : props.curiculumObject.communication[1]}
                               id={`${props.idPrefix}_connection_mail`}
                               name={`${props.idPrefix}_connection_mail`}/>
                        <label htmlFor={`${props.idPrefix}_connection_mail`}>Через почту</label>
                    </div>
                </div>
                <button type="submit">{props.buttonText}</button>
            </form>
        </div>
    );
}