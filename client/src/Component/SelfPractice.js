
import React, { Component } from 'react';
import axios from 'axios'
import { Card, Button, Icon, Image, Input, TextArea } from 'semantic-ui-react'
import '../App.css'

class Self extends Component {
    constructor(props) {

        super(props);
        this.state = {
            lastName: '',
            aim: '',
            body: '',
            firstName: '',
            items: [],
            editData: '',
            id: '',
            file: ''


        }
    }
    componentDidMount() {
        this.getAll()
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
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            aim: this.state.aim,
            body: this.state.body,
            productImage: this.state.file


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
            })
            .catch(() => {
                console.log('Internal server error')
            });
    };



    resetUserInputs = () => {
        this.setState({
            lastName: '',
            firstName: '',
            aim: '',
            body: '',
            file: ''
        });
    };

    onDelete(id) {
        console.log("deleted item is", id)
        axios.delete('api/task/' + id)
            .then((res) => {
                console.log('Student successfully deleted!', res)
                this.getAll()
            }).catch((error) => {
                console.log(error)
            })
    }
    onUpdate = (id, firstName, lastName, aim, body, e) => {
        e.preventDefault()
        const updatedValue = { firstName: firstName, lastName: lastName, aim: aim, body: body }
        axios.put(`api/task/${id}`, updatedValue)
            .then((res) => {
                console.log(res.data)
                console.log('Student successfully updated')
                this.getAll();
                this.resetUserInputs();
            }).catch((error) => {
                console.log(error)
            })

    }

    onEdit = (firstName, id, lastName, aim, body, e) => {
        e.preventDefault()
        this.setState({
            id: id,
            firstName: firstName,
            lastName: lastName,
            aim: aim,
            body: body


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
                    <p>{post.firstName}  {post.lastName}</p>

                    <Card.Meta>{post.aim}</Card.Meta>

                    <Card.Description>
                        {post.body}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button onClick={this.onEdit.bind(this, post.firstName, post._id, post.lastName, post.aim, post.body
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



        const data = this.state
        return (

            <div className='self'>
                <form class="ui form app">
                    <div class="field">
                        <label>First Name</label>
                        <input type="text" name='firstName'
                            placeholder='Enter task name'
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div class="field">
                        <label>Last Name</label>
                        <input type="text" name='lastName'
                            placeholder='Enter last name'
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div class="field">
                        <label>Aim</label>
                        <input type="text" name='aim'
                            placeholder='Enter your aim'
                            value={this.state.aim}
                            onChange={this.handleChange}

                        />
                    </div>
                    <div class="field">
                        <label>Body</label>
                        <input type="text" name='body'
                            placeholder='Enter body details'
                            value={this.state.body}
                            onChange={this.handleChange}

                        />
                    </div>
                    { //<div class="field">
                        //    <label>File</label>
                        //    <input type="file" name='file'
                        //        onChange={this.handleChange}




                        //    />
                        //</div>
                    }
                    <div className='subBtn'>
                        <Button className='orange'
                            onClick={this.onUpdate.bind(this, data.id, data.firstName, data.lastName, data.aim, data.body)}
                        >
                            Update
                </Button>
                        <Button className='green' onClick={this.submit}>Submit</Button>
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
