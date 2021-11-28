import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MailForm from "./MailForm";
import MailsList from "./MailsList";
import FilterMails from "./FilterMails";


export default function TabPanel() {
    const [value, setValue] = useState(0);
    const [showingChildren, setShowingChildren] = useState(<MailForm/>)

    const handleChange = (event, newValue) => {
        setValue(newValue);

        switch (newValue) {
            case 0: {
                setShowingChildren(<MailForm/>)
                break;
            }
            case 1: {
                setShowingChildren(<MailsList/>)
                break;
            }
            case 2: {
                setShowingChildren(<FilterMails/>)
                break;
            }
            default: {
                break;
            }
        }
    };


    return (
        <div>
            <Paper>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered>
                    <Tab label="Отправка сообщения"/>
                    <Tab label="Список отправлений"/>
                    <Tab label="Фильтрация"/>
                </Tabs>
            </Paper>
            <div className="mainArea">
                {showingChildren}
            </div>
        </div>
    );
}
