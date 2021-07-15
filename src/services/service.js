

class ServiceEmploy {

    _baseUrl = 'http://localhost:3000/persons/';

     getResource = async () => {
       const res = await fetch(this._baseUrl).then(res => res.json());
       return res;
    }

    postPerson = async (dataPost) => {
        const res = await fetch(this._baseUrl, {
            method: 'POST',
            body: JSON.stringify(dataPost),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => console.log(res.json()));
        return res;
    }
}

export default ServiceEmploy;