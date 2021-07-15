import React from 'react';
import Item from '../item/item'
import ModalAdd from '../modal-add/modal-add';
import ServiceEmploy from '../services/service';


const serviceEmploy = new ServiceEmploy();
class ListItem extends React.Component {

    async componentDidMount() {
        serviceEmploy.getResource().then(res => this.setState({ data: [...res] }))
    }

    componentDidUpdate() {
        // console.log(this.state)
    }
    state = {
        active: false,
        data: [],
        newEmploy: {
            id: null,
            firstName: '',
            lastName: ''
        }

    }
    setActive = (value) => {
        this.setState({ active: value })
    }

    calculateLength = () => {
        const lengthArray = this.state.data.length
        return lengthArray;
    }
    addEmploy = async (e) => {
        e.preventDefault()

        const { id, firstName, lastName } = this.state.newEmploy
        const newEmploy = {
            id: this.calculateLength() + 1,
            firstName: firstName,
            lastName: lastName
        }

        if (firstName.trim().length > 0 && lastName.trim().length) {
            const resStatus = await serviceEmploy.postPerson(newEmploy)
            if (resStatus === 201 || resStatus === 200) {
                this.setState({
                    data: [
                        ...this.state.data,
                        newEmploy
                    ]
                })
                this.setState({
                    newEmploy: {
                        id: null,
                        firstName: '',
                        lastName: ''
                    }
                })
            }
        }

    }

    onChangeFirstName = (value) => {
        this.setState({
            newEmploy: {
                ...this.state.newEmploy,
                firstName: value
            }
        })

    }

    onChangeLastName = (value) => {
        this.setState({
            newEmploy: {
                ...this.state.newEmploy,
                lastName: value
            }
        })

    }

    render() {
        const { data } = this.state;
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
                                return <Item item={item} key={item.id} />
                            })
                        }
                    </tbody>
                </table>
                <div className='btn_add_user'>
                    <button onClick={() => this.setActive(true)}>Добавить пользователя</button>
                    <ModalAdd
                        active={this.state.active}
                        setActive={this.setActive}
                        addEmploy={this.addEmploy}
                        onChangeFirstName={this.onChangeFirstName}
                        onChangeLastName={this.onChangeLastName}
                        newEmploy={this.state.newEmploy} />
                </div>
            </div>
        )
    }
}

export default ListItem;