
import React from 'react';
import './modal-add.css'


class ModalAdd extends React.Component {

    

    render() {
        
        const {active, setActive, onChangeFirstName, onChangeLastName, addEmploy, newEmploy } = this.props; 
        return (
            <div className={`modal_container_${active ? 'active' : ''} modal_container`} onClick={() => setActive(false)}>
                <div className='modal_add_content' onClick={(e) => e.stopPropagation()}>
                    <span>Добавление сотрудника</span>
                    <form onSubmit={(e) => addEmploy(e)}>
                        <input placeholder='Введите имя' onChange={(e) => onChangeFirstName(e.target.value)} value={newEmploy.firstName}/>
                        <input placeholder='Введите фамилию' onChange={(e) => onChangeLastName(e.target.value)} value={newEmploy.lastName}/>
                        <button type='submit' onClick={(e) => addEmploy(e)}> Добавить </button>
                        <button type='close' onClick={() => setActive(false)}> Закрыть окно</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ModalAdd;

