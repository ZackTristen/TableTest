
import React from 'react';
import './modal-add.css';

/**
 * класс компонент возвращающий модальное окно
 */
class ModalAdd extends React.Component {
  /**
   *
   * @return {string} возвращает готовую верстку
   */
  render() {
    const {activeModalAdd,
      setActiveModalAdd,
      onChangeFirstName,
      onChangeLastName,
      addEmploy,
      newEmploy} = this.props;
    return (
      <div
        className=
          {`modal_container_${activeModalAdd ? 'active' : ''} modal_container`}
        onClick={() => setActiveModalAdd(false)}>
        <div className='modal_content' onClick={(e) => e.stopPropagation()}>
          <span className='description'>Добавление сотрудника</span>
          <form onSubmit={(e) => addEmploy(e)} className='form'>
            <input placeholder='Введите имя'
              onChange={(e) => onChangeFirstName(e.target.value)}
              value={newEmploy.firstName} />
            <input placeholder='Введите фамилию'
              onChange={(e) => onChangeLastName(e.target.value)}
              value={newEmploy.lastName} />
            <div className='button_container'>
              <i className="fas fa-check-square" onClick={(e) => addEmploy(e)}>
                <button type='submit' onClick={(e) => addEmploy(e)}>
                </button></i>
              <i className="fas fa-window-close"
                onClick={() => setActiveModalAdd(false)}>
                <button type='close' onClick={() => setActiveModalAdd(false)}>
                </button></i>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ModalAdd;

