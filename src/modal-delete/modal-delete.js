import React from 'react';

const ModalDelete = () => {

    return(
        <div className ='modal_container'>
        <div className = 'modal_delete_content'>
            <span> Удаление сотрудника</span>
            <form >
                <input placeholder='Введите имя'/>
                <input placeholder='Введите фамилию'/>
                <button type='submit'> Удалить </button>
            </form>
        </div>
        </div>
    )
}

export default ModalDelete;