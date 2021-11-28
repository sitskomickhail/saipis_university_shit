import React, {useEffect, useState} from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as axios from "axios";

export default function MailsList() {
    const [mailsTable, setMailsTable] = useState(undefined);

    useEffect(() => {
        axios.get('http://localhost:5000/api/mail')
            .then(function (response) {
                console.log(response);
                setMailsTable(response.data);
            })

    }, [])

    return(
      <div>
          {ReactHtmlParser(mailsTable)}
      </div>
    );
}