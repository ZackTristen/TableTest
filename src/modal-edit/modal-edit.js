import React from 'react';
import './modal-edit.css';

const ModalEdit = (props) => {
  const {onChangeFirstName,
    onChangeLastName,
    editPerson,
    setActive,
    active,
    item,
    id} = props;

  return (
    <div
      className={`modal_container_${active ? 'active' : ''} modal_container`}
      onClick={() => setActive(false)}>
      <div className='modal_content' onClick={(e) => e.stopPropagation()}>
        <span className='description'> Редактирование сотрудника </span>
        <form onSubmit={(e) => editPerson(id, e)} className='form'>
          <input
            placeholder='Введите имя'
            value={item.firstName}
            onChange={(e) => onChangeFirstName(e.target.value)} />
          <input
            placeholder='Введите фамилию'
            value={item.lastName}
            onChange={(e) => onChangeLastName(e.target.value)} />
          <div className='button_container'>
            <i className="fas fa-check-square"
              onClick={(e) => editPerson(id, e)}>
              <button type='submit' onClick={(e) => editPerson(id, e)}>
              </button></i>
            <i className="fas fa-window-close"
              onClick={() => setActive(false)} >
              <button type='close' onClick={() => setActive(false)}>
              </button></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
