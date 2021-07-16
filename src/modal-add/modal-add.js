
import React from 'react';
import './modal-add.css'


class ModalAdd extends React.Component {

    

    render() {
        
        const {activeModalAdd, setActiveModalAdd, onChangeFirstName, onChangeLastName, addEmploy, newEmploy } = this.props; 
        return (
            <div className={`modal_container_${activeModalAdd ? 'active' : ''} modal_container`} onClick={() => setActiveModalAdd(false)}>
                <div className='modal_add_content' onClick={(e) => e.stopPropagation()}>
                    <span>Добавление сотрудника</span>
                    <form onSubmit={(e) => addEmploy(e)}>
                        <input placeholder='Введите имя' onChange={(e) => onChangeFirstName(e.target.value)} value={newEmploy.firstName}/>
                        <input placeholder='Введите фамилию' onChange={(e) => onChangeLastName(e.target.value)} value={newEmploy.lastName}/>
                        <button type='submit' onClick={(e) => addEmploy(e)}> Добавить </button>
                        <button type='close' onClick={() => setActiveModalAdd(false)}> Закрыть окно</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ModalAdd;

