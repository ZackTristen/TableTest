import React from 'react';
import ModalEdit from '../modal-edit/modal-edit';
import ServiceEmploy from '../services/service';

const serviceEmploy = new ServiceEmploy()
class Item extends React.Component {


    state = {
        active: false,
        itemEdited: {
            firstName: this.props.item.firstName,
            lastName: this.props.item.lastName
        }
    }

    onChangeLastName = (value) => {
        this.setState({
            itemEdited: {
                ...this.state.itemEdited,
                lastName: value
            }
        })

    }

    onChangeFirstName = (value) => {
        this.setState({
            itemEdited: {
                ...this.state.itemEdited,
                firstName: value
            }
        })

    }

    clearInputForms = () => {
        this.setState({
            itemEdited: {
                firstName: '',
                lastName: ''
            }
        })
    }

    setActive = (value) => {

        if (this.state.active) {
            this.setState({ active: value })

        } else if (this.state.active === false) {
            this.setState({ active: value })
        }
    }

    editPerson = async (id, e) => {
        e.preventDefault()
        const { active } = this.state;

        const { firstName, lastName } = this.state.itemEdited

        const editedPerson = {
            id: id,
            firstName: firstName,
            lastName: lastName
        }

        const { changeData, data } = this.props;
        if (firstName.trim().length > 0 && lastName.trim().length > 0 && active) {
            const resStatus = await serviceEmploy.editPerson(id, editedPerson)
            if (resStatus === 200 || resStatus === 201) {
                const idx = data.findIndex(item => item.id === id);
                changeData(editedPerson, idx)
                this.clearInputForms()
                this.setActive(false)
            }
        }
    }
    render() {

        const { item: { firstName, lastName, id }, deleteEmploy } = this.props
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
                        item={this.state.itemEdited}
                        active={this.state.active}
                        onChangeFirstName={this.onChangeFirstName}
                        onChangeLastName={this.onChangeLastName}
                        editPerson={this.editPerson}
                        id={id}
                    />
                </td>
            </tr>
        )
    }
}
export default Item;