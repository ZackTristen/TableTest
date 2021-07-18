import React from 'react';
import ModalEdit from '../modal-edit/modal-edit';
import ServiceEmploy from '../services/service';
import './item.css';
import ModalDelete from '../modal-delete/modal-delete';

const serviceEmploy = new ServiceEmploy();

/**
 * Классовый компонент возвращающий строку в таблице компонента ListItem
 */
class Item extends React.Component {
    state = {
      active: false,
      itemEdited: {
        firstName: this.props.item.firstName,
        lastName: this.props.item.lastName,
      },
      activeDelete: false,
    }

    /**
     * Функция получает на вход строковый параметр из e.target.value
     * и помещает ее в соответствующее поле стейта
     * @param {string} value
     */
    onChangeLastName = (value) => {
      this.setState({
        itemEdited: {
          ...this.state.itemEdited,
          lastName: value,
        },
      });
    }
    /**
 * Работает по аналогии с функцией onChangeLastName
 * @param {string} value
 */
    onChangeFirstName = (value) => {
      this.setState({
        itemEdited: {
          ...this.state.itemEdited,
          firstName: value,
        },
      });
    }

    clearInputForms = () => {
      this.setState({
        itemEdited: {
          firstName: '',
          lastName: '',
        },
      });
    }
    /**
 * Функция принимает на вход булевый параметр, который отвечает
 * за переключение модального окна в видимый/невидимый статус
 * @param {boolean} value
 */
    setActive = (value) => {
      if (this.state.active) {
        this.setState({active: value});
      } else if (this.state.active === false) {
        this.setState({active: value});
      }
    }
    /**
 * Функция принимает на вход булевый параметр, который отвечает
 * за переключение модального окна в видимый/невидимый статус
 * @param {boolean} value
 */
    setActiveDelete = (value) => {
      if (this.state.activeDelete) {
        this.setState({activeDelete: value});
      } else if (this.state.activeDelete === false) {
        this.setState({activeDelete: value});
      }
    }
    /**
   * Функция редактирует поле в главном стейте ListItem, посылая запрос
   * @param {int} id идентифицирует строку на котором произошло событие
   * @param {global} e глобальный объект event для остановки стандартного
   * поведения
   */
    editPerson = async (id, e) => {
      e.preventDefault();
      const {active} = this.state;

      const {firstName, lastName} = this.state.itemEdited;

      const editedPerson = {
        id: id,
        firstName: firstName,
        lastName: lastName,
      };

      const {changeData, data, onStatusChange} = this.props;
      if (firstName.trim().length > 0 && lastName.trim().length > 0 && active) {
        const resStatus = await serviceEmploy.editPerson(id, editedPerson);
        if (resStatus === 200 || resStatus === 201) {
          const idx = data.findIndex((item) => item.id === id);
          changeData(editedPerson, idx);
          onStatusChange(resStatus);
          this.clearInputForms();
          this.setActive(false);
        }
      }
    }
    /**
 *
 * @return { string } готовое html+js представление компонента
 */
    render() {
      const {item: {firstName, lastName, id}, deleteEmploy} = this.props;
      return (

        <tr>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>
            <i className="fas fa-user-edit"
              onClick={() => this.setActive(true)}>
              <button
                onClick={() => this.setActive(true)}>
              </button>
            </i>
            <i className="fas fa-user-slash"
              onClick={() => this.setActiveDelete(true)}>
              <button onClick={() => this.setActiveDelete(true)}>
              </button>
            </i>
            <ModalDelete
              setActive={this.setActiveDelete}
              active={this.state.activeDelete}
              item={this.state.itemEdited}
              deleteEmploy={deleteEmploy}
              id={id}
            />

            <ModalEdit
              setActive={this.setActive}
              item={this.state.itemEdited}
              active={this.state.active}
              onChangeFirstName={this.onChangeFirstName}
              onChangeLastName={this.onChangeLastName}
              editPerson={this.editPerson}
              id={id}
            />
          </td>
        </tr>

      );
    }
}
export default Item;
