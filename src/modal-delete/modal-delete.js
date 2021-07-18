
import React from 'react';
import './modal-delete.css';


const ModalDelete = (props) => {
  const {active, deleteEmploy, setActive, item, id} = props;
  return (
    <div
      className={`modal_container_${active ? 'active' : ''} modal_container`}
      onClick={() => setActive(false)}>
      <div className='modal_content'
        onClick={(e) => e.stopPropagation()}>
        <span className='description description_title'>
          Удаление сотрудника</span>
        <div className='description'>
          <span className='name'>{`${item.firstName} ${item.lastName}`}</span>
          <span className='ask'>Вы действительно хотите удалить?</span>
        </div>
        <div className='button_container'>
          <i className="fas fa-check-square"
            onClick={() => deleteEmploy(id)}>
            <button type='submit' onClick={() => deleteEmploy(id)}></button></i>
          <i className="fas fa-window-close"
            onClick={() => setActive(false)} >
            <button type='close' onClick={() => setActive(false)}></button> </i>
        </div>
      </div>
    </div>
  );
};


export default ModalDelete;

