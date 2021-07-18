import React from 'react';
import Item from '../item/item';
import ModalAdd from '../modal-add/modal-add';
import ServiceEmploy from '../services/service';
import './list-item.css';


const serviceEmploy = new ServiceEmploy();
/**
 * Классовый компонент возвращающий готоую таблицу со строками
 * в виде пользователей
 */
class ListItem extends React.Component {
  /**
   * метод жизненного цикла
   * на этапе отрисовки компонента запрашивает данные с сервера
   * и устанавливает их в стейт
   */
  async componentDidMount() {
    serviceEmploy.getResource().then((res) => {
      this.onStatusChange(res);
      this.setState({data: [...res]});
    });
  }


    state = {
      active: false,
      data: [],
      newEmploy: {
        firstName: '',
        lastName: '',
      },
      status: {
        id: null,
        number: null,
      },
    }

    /**
 * функция для переключения статуса модального окна
 * из видимого в видимое и обратно
 * @param {boolean} value для переключения видимости модального окна
 */
    setActive = (value) => {
      if (this.state.active) {
        this.setState({active: value});
        this.clearInputForms();
      } else if (this.state.active === false) {
        this.setState({active: value});
      }
    }
    /**
 * функция расчета id для нового пользователя
 * @return {int} нового пользователя на основе длинны массива
 */
    calculateId = () => {
      const {data} = this.state;
      const id = Math.max(...data.map(({id}) => id));
      return id;
    }
    /**
 * функция для удаления пользователя из таблицы
 * @param {int} id параметр идентифицирующий строку пользователя
 * @return {array} измененный стейт, удаляя из него данные пользователя
 */
    deleteEmploy = async (id) => {
      const resStatus = await serviceEmploy.deletePerson(id);
      if (resStatus === 200) {
        const idx = this.state.data.findIndex((item) => item.id === id);
        this.onStatusChange(resStatus);
        return this.setState((state) => {
          return {
            ...state,
            data: [
              ...state.data.slice(0, idx),
              ...state.data.slice(idx + 1),
            ],
          };
        });
      }
    }
    /**
 * функция добавляющая нового пользователя в таблицу
 * @param {global} e для преостановки стандартного поведения в браузере
 * @return {string}
 */
    addEmploy = async (e) => {
      e.preventDefault();
      const {active} = this.state;
      const {firstName, lastName} = this.state.newEmploy;
      const newEmploy = {
        id: this.calculateId() + 1,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };

      if (firstName.trim().length > 0 && lastName.trim().length && active) {
        const resStatus = await serviceEmploy.postPerson(newEmploy);
        if (resStatus === 201 || resStatus === 200) {
          this.setState({
            data: [
              ...this.state.data,
              newEmploy,
            ],
          });
          this.onStatusChange(resStatus);
          this.clearInputForms();
          this.setActive(false);
        }
      }
    }

    /**
 * функция которая возвращает готовую jsx нотификацию
 * @param {int} status код ответа на запрос
 * @return  {string} готовый jsx элемент
 */
    renderNotify = (status) => {
      if (status === 200 || status === 201) {
        setTimeout(() => this.setState({
          status: {
            id: null,
            number: null,
          },
        }), 6000);

        return <div
          className={`notify notify_200`}>
          <span>Все отлично, запрос прошел успешно</span>
          <span>{status}</span>
        </div>;
      }
      if ( status === 400 ) {
        setTimeout(() => this.setState({
          status: {
            id: null,
            number: null,
          },
        }), 6000);

        return <div
          className={`notify notify_${status}`}>
          <span>Неверный запрос</span>
          <span>{status}</span>
        </div>;
      }
      if ( status === 404 ) {
        setTimeout(() => this.setState({
          status: {
            id: null,
            number: null,
          },
        }), 6000);

        return <div
          className={`notify notify_${status}`}>
          <span>Сущность не найдена в системе</span>
          <span>{status}</span>
        </div>;
      }
      if ( status === 500 ) {
        setTimeout(() => this.setState({
          status: {
            id: null,
            number: null,
          },
        }), 6000);

        return <div
          className={`notify notify_${status}`}>
          <span>Серверная ошибка</span>
          <span>{status}</span>
        </div>;
      }
      return (
        <>
        </>
      );
    }
    /**
 * функция добавляет в стейт объект созданного на основе кода ответа на запрос
 * @param {int} res параметр принимает код ответа на запрос
 */
    onStatusChange = (res) => {
      this.setState((state) => {
        return {
          ...state,
          status: {
            id: this.calculateId() + 1,
            number: res,
          },
        };
      });
    }

    clearInputForms = () => {
      this.setState({
        newEmploy: {
          firstName: '',
          lastName: '',
        },
      });
    }
    /**
 * функция для установки текста из форм в поля стейта
 * @param {string} value параметр в виде строки
 * устанавливающий значение в стейт из полей вода input
 */
    onChangeFirstName = (value) => {
      this.setState({
        newEmploy: {
          ...this.state.newEmploy,
          firstName: value,
        },
      });
    }
    /**
 * функция для установки текста из форм в поля стейта
 * @param {string} value параметр в виде строки
 * устанавливающий значение в стейт из полей ввода input
 */
    onChangeLastName = (value) => {
      this.setState({
        newEmploy: {
          ...this.state.newEmploy,
          lastName: value,
        },
      });
    }

    /**
 * функция которая редактирует стейт на основе работы запроса редактирования
 * @param {object} newData объект для установки в стейт
 * @param {int} idx параметр в котором содержится информация
 * об индексе элемента который нужно изменить
 */
    changeData = (newData, idx) => {
      this.setState({
        data: [
          ...this.state.data.slice(0, idx),
          newData,
          ...this.state.data.slice(idx + 1),
        ],
      });
    }

    /**
 * функция обрабатывающая jsx код
 * @return {string} готовую таблицу
 */
    render() {
      const {data} = this.state;
      return (
        <div className='list_item'>
          <div className='table'>
            <table >
              <thead >
                <tr>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item) => {
                    return <Item
                      item={item}
                      key={item.id}
                      deleteEmploy={this.deleteEmploy}
                      changeData={this.changeData}
                      data={this.state.data}
                      onStatusChange={this.onStatusChange}
                    />;
                  })
                }
              </tbody>
            </table>
          </div>
          <div className='btn_container'>
            <i className="far fa-plus-square"
              onClick={() => this.setActive(true)}>
              <button
                className='btn_add'
                onClick={() => this.setActive(true)}>
                <span> Добавить пользователя </span>
              </button>
            </i>
            <ModalAdd
              activeModalAdd={this.state.active}
              setActiveModalAdd={this.setActive}
              addEmploy={this.addEmploy}
              onChangeFirstName={this.onChangeFirstName}
              onChangeLastName={this.onChangeLastName}
              newEmploy={this.state.newEmploy} />
            <div>
              {
                this.renderNotify(this.state.status.number)
              }
            </div>
          </div>
        </div>
      );
    }
}

export default ListItem;
