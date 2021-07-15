import React from 'react';
import './modal-edit.css'

const ModalEdit = (props) => {

    return(
        <div 
        className = {`modal_container modal_container_${props.active ? 'active' : ''}`}
        onClick={() => props.setActive(false)}>
        <div className='modal_edit_content' onClick={(e) => e.stopPropagation()}>
            
            <span> Редактирование сотрудника </span>
            <form >
                <input placeholder='Введите имя'/>
                <input placeholder='Введите фамилию'/>
                <button type='submit'> Редактировать </button>
                <button type='close' onClick={() => props.setActive(false)}>Закрыть окно</button>
            </form>
        </div>
        </div>
    )
}

export default ModalEdit;