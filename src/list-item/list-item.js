import React from 'react';
import Item from '../item/item'
import ModalAdd from '../modal-add/modal-add';
import ServiceEmploy from '../services/service';
import './list-item.css'

const serviceEmploy = new ServiceEmploy();
class ListItem extends React.Component {

    async componentDidMount() {
        serviceEmploy.getResource().then(res => this.setState({ data: [...res] }))
    }

    

    state = {
        active: false,
        data: [],
        newEmploy: {
            firstName: '',
            lastName: ''
        }
    }


    setActive = (value) => {
        if (this.state.active) {
            this.setState({ active: value })
            this.clearInputForms()
        } else if (this.state.active === false) {
            this.setState({ active: value })
        }
    }
   
    calculateId = () => {
        const {data} = this.state
        const id = Math.max(...data.map(({id}) => id ))
        return id;
    }

    deleteEmploy = async (id) => {
        const resStatus = await serviceEmploy.deletePerson(id);
        if (resStatus === 200) {
            const idx = this.state.data.findIndex(item => item.id === id)
             return this.setState(state => {
                return {
                    ...state, 
                    data: [
                    ...state.data.slice(0, idx),
                    ...state.data.slice(idx + 1)
                    ]
                }
            })
        }
        
    }

    addEmploy = async (e) => {
        e.preventDefault()
        const {active} = this.state;
        const { firstName, lastName } = this.state.newEmploy
        const newEmploy = {
            id: this.calculateId() + 1,
            firstName: firstName,
            lastName: lastName
        }

        if (firstName.trim().length > 0 && lastName.trim().length && active) {
            
            const resStatus = await serviceEmploy.postPerson(newEmploy)
            if (resStatus === 201 || resStatus === 200) {
                
                this.setState({
                    data: [
                        ...this.state.data,
                        newEmploy
                    ]
                })
                this.clearInputForms()
                this.setActive(false)
            } 
        }
       

    }


    clearInputForms = () => {
        this.setState({
            newEmploy: {
                firstName: '',
                lastName: ''
            }
        })
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
    

    changeData = (newData, idx) => {
        this.setState({
            data: [
                ...this.state.data.slice(0, idx),
                newData,
                ...this.state.data.slice(idx + 1),
            ]})
    }

  

   

    render() {
        const { data } = this.state;
        return (
            <div className='list_item'>
                <div className='table'>
                <table cellPadding='7' cellSpacing='7' >
                    <thead >
                        <tr>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Действия</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => {
                                return <Item 
                                item={item} 
                                key={item.id}
                                deleteEmploy={this.deleteEmploy}
                                changeData={this.changeData}
                                data = {this.state.data}
                                 />
                            })
                        }
                    </tbody>
                </table>
                </div>
                   <i className="far fa-plus-square" onClick={() => this.setActive(true)}> <button className='btn_add' onClick={() => this.setActive(true)}> Добавить пользователя</button></i> 
                    <ModalAdd
                        activeModalAdd={this.state.active}
                        setActiveModalAdd={this.setActive}
                        addEmploy={this.addEmploy}
                        onChangeFirstName={this.onChangeFirstName}
                        onChangeLastName={this.onChangeLastName}
                        newEmploy={this.state.newEmploy} />
            </div>
        )
    }
}

export default ListItem;