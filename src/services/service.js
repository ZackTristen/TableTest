

class ServiceEmploy {

    _baseUrl = 'http://localhost:3000/persons/';

     getResource = async () => {
       const res = await fetch(this._baseUrl);
       const body = res.json()
       return body;
    }

    postPerson = async (dataPost) => {
        
        const res = await fetch(this._baseUrl, {
            method: 'POST',
            body: JSON.stringify(dataPost),
            headers: {
                "Content-type": "application/json"
            }
        })
        return res.status
    }

    deletePerson = async (id) => {
        const res = await fetch(`${this._baseUrl}/${id}`, {
        method: 'DELETE'
        })
        return res.status;
    }
}

export default ServiceEmploy;