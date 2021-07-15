import React from 'react';
import Item from '../item/item'
import ModalAdd from '../modal-add/modal-add';
import ServiceEmploy from '../services/service';

class ListItem extends React.Component {

    async componentDidMount() {

    const serviceEmploy = new ServiceEmploy();
    serviceEmploy.getResource().then(res => this.setState({data: [...res]}))

    }

    componentDidUpdate() {
        console.log(this.state)
    }
    state = {
        active: false,
        data: []
    }
    setActive = (value) => {
        this.setState({active: value})
    }

    render() {
        const {data} = this.state;
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
                    {
                        data.map((item) => {
                            return <Item item={item} key={item.id}/>
                        })
                    }
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