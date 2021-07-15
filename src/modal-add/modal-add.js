
import React from 'react';
import './modal-add.css'

const ModalAdd = (props) => {

    
    return (
        <div className={`modal_container_${props.active ? 'active' : ''} modal_container`} onClick={() => props.setActive(false)}>
            <div className='modal_add_content' onClick={(e) => e.stopPropagation()}>
                <span>Добавление сотрудника</span>
                <form >
                    <input placeholder='Введите имя' />
                    <input placeholder='Введите фамилию' />
                    <button type='submit'> Добавить </button>
                    <button type='close' onClick={() => props.setActive(false)} > Закрыть окно</button>
                </form>
            </div>
        </div>
    )
}

export default ModalAdd;

