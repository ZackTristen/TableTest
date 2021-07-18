
/**
 * Класс сервис реализующий сетевые функции
 */
class ServiceEmploy {
    _baseUrl = 'http://localhost:3000/persons/';
    /**
 *
 * @return {string} тело ответа в виде массива пользвателей
 */
    getResource = async () => {
      const res = await fetch(this._baseUrl);
      const body = res.json();
      return body;
    }
    /**
 *
 * @param {string} dataPost объект содержащий информацию о новом пользователе
 * @return {string} статус запроса
 */
    postPerson = async (dataPost) => {
      const res = await fetch(this._baseUrl, {
        method: 'POST',
        body: JSON.stringify(dataPost),
        headers: {
          'Content-type': 'application/json',
        },
      });
      return res.status;
    }
    /**
 *
 * @param {int} id параметр для идентификации пользователя в массиве по id
 * @return {string} статус запроса
 */
    deletePerson = async (id) => {
      const res = await fetch(`${this._baseUrl}${id}`, {
        method: 'DELETE',
      });
      return res.status;
    }
    /**
 *
 * @param {string} id параметр для идентификации пользователя в массиве по id
 * @param {string} editedData  объект содержащий информацию о пользователе
 * которого нужно отредактировать в базе
 * @return {string} статус запроса
 */
    editPerson = async (id, editedData) => {
      const res = await fetch(`${this._baseUrl}${id}`, {
        method: 'PUT',
        body: JSON.stringify(editedData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      return res.status;
    }
}

export default ServiceEmploy;
