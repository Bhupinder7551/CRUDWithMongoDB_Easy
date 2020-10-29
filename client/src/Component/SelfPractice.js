
import React, { Component } from 'react';
import axios from 'axios'
import { Card, Button, Icon, Image, Input, TextArea } from 'semantic-ui-react'
import '../App.css'

class Self extends Component {
    constructor(props) {

        super(props);
        this.state = {
            name: '',
            email: '',
            address: '',
            role: '',
            team: '',
            image: '',
            items: [],
            editData: '',
            id: '',
            file: ''


        }
    }
    componentDidMount() {
        this.getAll();
    }



    getAll = () => {

        axios.get('api/tasks', {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                const data = response.data;
                this.setState({ items: data });
            })
            .catch(() => {
                alert('Error retrieving data!!!');
            });
    }



    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    submit = (e) => {
        e.preventDefault();
        const payload = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            role: this.state.role,
            team: this.state.team,
            image: this.state.image


        };
        axios({
            url: '/api/task ',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('data has been sent to the server');
                this.resetUserInputs();
                this.getAll();

                console.log("successfullyrrrrr get the data");
            })
            .catch(() => {
                console.log('Internal server error')
            });
    };



    resetUserInputs = () => {
        this.setState({
            name: '',
            email: '',
            address: '',
            role: '',
            team: '',
            image: ''
        });
    };

    onDelete(id) {
        console.log("deleted item is", id)
        axios.delete('api/task/' + id)
            .then((res) => {
                console.log('Successfully deleted!', res)
                this.getAll()
            }).catch((error) => {
                console.log(error)
            })
    }
    onUpdate = (id, name, email, address, role, team, image, e) => {
        e.preventDefault()
        const updatedValue = { name: name, email: email, address: address, role: role, team: team, image: image }
        axios.put(`api/task/${id}`, updatedValue)
            .then((res) => {
                console.log(res.data)
                console.log('Successfully updated')
                this.getAll();
                this.resetUserInputs();
            }).catch((error) => {
                console.log(error)
            })

    }

    onEdit = (name, id, email, address, role, team, image, e) => {
        e.preventDefault()
        this.setState({
            id: id,
            name: name,
            email: email,
            address: address,
            role: role,
            team: team,
            image: image


        })

    }


    displayBlogPost = (items) => {

        if (!items.length) return null;


        return items.map((post, index) => (

            <Card style={{ width: '30%', height: '30vh', margin: '10px', float: 'left', boxShadow: '2px 3px 8px 1px black', backgroundColor: '#E6E6FA' }} key={index} >

                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src={post.productImage}
                    />
                    <p>{post.name} </p>

                    <Card.Meta>{post.email}</Card.Meta>
                    <Card.Meta>{post.role}</Card.Meta>
                    <Card.Meta>{post.team}</Card.Meta>

                    <Card.Description>
                        {post.address}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button onClick={this.onEdit.bind(this, post.name, post._id, post.email, post.address, post.role, post.team, post.image
                        )} basic color='green'>
                            Edit
          </Button>
                        <Button onClick={this.onDelete.bind(this, post._id)} basic color='red'>
                            Delete
          </Button>
                    </div>
                </Card.Content>
            </Card>
        ));
    };
    render() {
        console.log('state', this.state)
        console.log('items', this.state.items)



        const data = this.state
        return (

            <div className='self'>
                <form class="ui form app">
                    <div class="field">
                        <label>Name</label>
                        <input type="text" name='name'
                            placeholder='Enter task name'
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div class="field">
                        <label>Email address</label>
                        <input type="text" name='email'
                            placeholder='Enter last name'
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div class="field">
                        <label>Role</label>
                        <input type="text" name='role'
                            placeholder='Enter your aim'
                            value={this.state.role}
                            onChange={this.handleChange}

                        />
                    </div>
                    <div class="field">
                        <label>Team</label>
                        <input type="text" name='team'
                            placeholder='Enter body details'
                            value={this.state.team}
                            onChange={this.handleChange}

                        />
                    </div>
                    <div class="field">
                        <label>Address</label>
                        <input type="text" name='address'
                            placeholder='Enter body details'
                            value={this.state.address}
                            onChange={this.handleChange}

                        />
                    </div>
                    { //<div class="field">
                        //    <label>File</label>
                      //  <input type="file" name='file'
                        //        onChange={this.handleChange}




                        //    />
                        //</div>
                    }
                    <div className='subBtn'>
                        <Button className='orange'
                            onClick={this.onUpdate.bind(this, data.id, data.name, data.email, data.role, data.team, data.address)}
                        >
                            UPDATE EMPLOYEE
                </Button>
                        <Button className='green' onClick={this.submit}>ADD EMPLOYEE</Button>
                     
                    </div>
                </form>


                <div className='cardDetail'>
                    {this.displayBlogPost(this.state.items)}
                </div>


            </div>
        )
    }
}

export default Self;
