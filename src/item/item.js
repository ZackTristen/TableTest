
import React from 'react';
import ModalEdit from '../modal-edit/modal-edit';



class Item extends React.Component {

 
    state = {
        active: false,
        person: this.props.item
    }
    setActive = (value) => {
        this.setState({ active: value })
    }

    render() {

        const {id, firstName, lastName} = this.state.person;

        return (
            <tr >
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>
                    <button
                        onClick={() => this.setActive(true)}>
                        Редактировать сотрудника
                    </button>
                    <button>Удалить сотрудника</button>
                    <ModalEdit
                        setActive={this.setActive}
                        active={this.state.active} />
                </td>
            </tr>
        )
    }
}

export default Item;