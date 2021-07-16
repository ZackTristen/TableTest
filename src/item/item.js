
import React from 'react';
import ModalEdit from '../modal-edit/modal-edit';



class Item extends React.Component {

 
    state = {
        active: false,
    }
    setActive = (value) => {
        this.setState({ active: value })
    }

    render() {

        const {item :{ id, firstName, lastName}, deleteEmploy} = this.props;
        
        return (
            <tr >
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>
                    <button
                        onClick={() => this.setActive(true)}>
                        Редактировать сотрудника
                    </button>
                    <button onClick={() => deleteEmploy(id)}>Удалить сотрудника</button>
                    <ModalEdit
                        setActive={this.setActive}
                        active={this.state.active} />
                </td>
            </tr>
        )
    }
}

export default Item;