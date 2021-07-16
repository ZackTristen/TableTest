import React from 'react';
import './modal-edit.css'

const ModalEdit = (props) => {
    const { onChangeFirstName, onChangeLastName, editPerson, setActive, active, item, id } = props;

    return (
        <div
            className={`modal_container_${active ? 'active' : ''} modal_container`} onClick={() => setActive(false)}>
            <div className='modal_edit_content' onClick={(e) => e.stopPropagation()}>
                <span> Редактирование сотрудника </span>
                <form onSubmit={(e) => editPerson(id, e)}>
                    <input placeholder='Введите имя' value={item.firstName} onChange={(e) => onChangeFirstName(e.target.value)} />
                    <input placeholder='Введите фамилию' value={item.lastName} onChange={(e) => onChangeLastName(e.target.value)} />
                    <button type='submit' onClick={(e) => editPerson(id, e)}> Редактировать </button>
                    <button type='close' onClick={() => setActive(false)}>Закрыть окно</button>
                </form>
            </div>
        </div>
    )
}

export default ModalEdit;