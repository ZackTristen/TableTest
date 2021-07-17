
import React from 'react';
import './modal-delete.css'


const ModalDelete = (props) => {


        const {active, deleteEmploy, setActive, item, id } = props; 
        return (
            <div className={`modal_container_${active ? 'active' : ''} modal_container`} onClick={() => setActive(false)}>
                <div className='modal_content' onClick={(e) => e.stopPropagation()}>
                    <span className='description description_title'>Удаление сотрудника</span>
                        <div className='description'>
                            <span>{`${item.firstName} ${item.lastName}`}</span>
                            <span>Вы действительно хотите удалить?</span>
                        </div>
                        <div className='button_container'>
                        <button type='submit' onClick={() => deleteEmploy(id)}> Да </button>
                        <button type='close' onClick={() => setActive(false)}> Отменить</button>
                        </div>
                </div>
            </div>
        )
    }


export default ModalDelete;

