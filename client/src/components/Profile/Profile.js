import React from "react";
import './Profile.css';

const baseUrl = 'http://localhost:8000';


class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet
        }
    }
    onFormChange = (event) => {
        switch (event.target.name) {
            case 'user-name':
                this.setState({ name: event.target.value })
                break;
            case 'user-age':
                this.setState({ age: event.target.value })
                break;
            case 'user-pet':
                this.setState({ pet: event.target.value })
                break;
            default:
                return;
        }
    }
    onSave = (data) => {
        console.log("ev:", data)
        const nameOfUser = this.state.name
        console.log('name:', nameOfUser)
        console.log("this prosp:",this.props)
        fetch(`/profile/${this.props.user.id}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json',
                        'Authorization' : window.sessionStorage.getItem('token')},
            body: JSON.stringify({
                formInput: data
            })
        })
            .then(response => {
                this.props.toggleModal();
                this.props.loadUser({...this.props.user, ...data});
                console.log('response,', response)
            })
            .catch(console.log)

    }

    render() {
        const { user } = this.props;
        const { name, age, pet } = this.state;
        return (
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80 w-80">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/008/663/881/non_2x/cool-funky-santa-claus-logo-christmas-on-december-line-neon-art-portrait-colorful-design-with-dark-background-abstract-illustration-vector.jpg"
                            class="br-100 ba h3 w3 dib" alt="avatar" >
                        </img>
                        <h1>Name: {this.state.name}</h1>
                        <h2>Member since: {user.joined}</h2>
                        <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                        <input
                            onChange={this.onFormChange}
                            placeholder={user.name}
                            className="pa2 ba w-100"
                            type="text"
                            name="user-name"
                            id="name"

                        />
                        <label className="mt2 fw6" htmlFor="user-age">Age:</label>
                        <input
                            onChange={this.onFormChange}
                            placeholder={user.age}
                            className="pa2 ba w-100"
                            type="text"
                            name="user-age"
                            id="name"

                        />
                        <label className="mt2 fw6" htmlFor="user-pet">Pet:</label>
                        <input
                            onChange={this.onFormChange}
                            placeholder={user.pet}
                            className="pa2 ba w-100"
                            type="text"
                            name="user-pet"
                            id="name"

                        />
                        <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <button onClick={() => this.onSave({ name, age, pet })} className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">Save</button>
                            <button onClick={this.props.toggleModal} className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20">Cancel</button>
                        </div>
                    </main>
                    <div className="modal-close" onClick={this.props.toggleModal}>&times;</div>
                </article>
            </div>
        )
    }
}





export default Profile;