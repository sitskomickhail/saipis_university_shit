var React = require('react');
var PropTypes = require('prop-types');

function MailsList(props) {
  
  console.log(props);

  let showingElements = props.mails.map((mail, index) => {
    return (
      <tr className="mailElement">
        <td>#{index + 1}</td>
        <td>{mail.sender}</td>
        <td>{mail.reciever}</td>
        <td>{mail.message}</td>
        <td>{mail.sendDate}</td>
        <td>{mail.messageType}</td>
        <td className="editMailCol"><button className="editMailBtn" id={mail.id}>Подробнее...</button></td>
      </tr>
    );
  });
  
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Отправитель</th>
          <th>Получатель</th>
          <th>Сообщение</th>
          <th>Дата отправки</th>
          <th>Тип сообщения</th>
          <th className="editMailCol"></th>
        </tr>
      </thead>
      <tbody>
        {showingElements}
      </tbody>
    </table>
  );
}

MailsList.propTypes = {
  mails: PropTypes.array,
};

module.exports = MailsList;