
import React from 'react';
import './modal-add.css'
import ServiceEmploy from '../services/service';

const serviceEmploy = new ServiceEmploy();

class ModalAdd extends React.Component {

    state = {
        id: null,
        firstName: '',
        lastName: ''
    }

    clearData = () => {
        this.setState({id: null, firstName: '', lastName: ''})
    }

    componentDidUpdate(prevProps) {
        if (prevProps.active !== this.props.active && this.props.active === false) {
            this.setState({firstName: '', lastName: ''})
        }
    }

    async componentDidMount() {
        this.setState({ id: await this.getPresentLengthData() + 1 })

    }

    getPresentLengthData = async () => {
        let data = null;
        await serviceEmploy.getResource().then(res => data = res.length)
        return data;
    }

   

    addEmploy = async (e) => {
        e.preventDefault()
        const newEmploy = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
        await serviceEmploy.postPerson(newEmploy)
        this.clearData()
    }

    onChangeFirstName = (value) => {   
        this.setState({firstName: value})
    }

    onChangeLastName = (value) => {
        this.setState({lastName: value})
    }

    render() {
        const {firstName, lastName, id} = this.state
        const {active, setActive} = this.props; 
        return (
            <div className={`modal_container_${active ? 'active' : ''} modal_container`} onClick={() => setActive(false)}>
                <div className='modal_add_content' onClick={(e) => e.stopPropagation()}>
                    <span>Добавление сотрудника</span>
                    <form onSubmit={this.addEmploy}>
                        <input placeholder='Введите имя' onChange={(e) => this.onChangeFirstName(e.target.value)} value={firstName}/>
                        <input placeholder='Введите фамилию' onChange={(e) => this.onChangeLastName(e.target.value)} value={lastName}/>
                        <button type='submit' onClick={(e) => this.addEmploy(e)}> Добавить </button>
                        <button type='close' onClick={() => setActive(false)}> Закрыть окно</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ModalAdd;

