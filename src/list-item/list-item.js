import React from 'react';
import Item from '../item/item'
import ModalAdd from '../modal-add/modal-add';

class ListItem extends React.Component {

    state = {
        active: false
    }
    setActive = (value) => {
        this.setState({active: value})
    }

    render() {
    return (
        <div className='list_item'>
            <table>
                <thead>
                    <tr>
                        <td>Имя</td>
                        <td>Фамилия</td>
                        <td>Действия</td>
                    </tr>
                </thead>
                <tbody>
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </tbody>
            </table>
            <div className='btn_add_user'>
                <button onClick={() => this.setActive(true)}>Добавить пользователя</button>
                <ModalAdd active={this.state.active} setActive={this.setActive}/>
            </div>
        </div>
    )
}
}

export default ListItem;