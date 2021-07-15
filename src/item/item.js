
import React from 'react';
import ModalEdit from '../modal-edit/modal-edit';



class Item extends React.Component {

    state = {
        active: false
    }
    setActive = (value) => {
        this.setState({ active: value })
    }

    render() {
        return (
            <tr>
                <td>John</td>
                <td>Down</td>
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