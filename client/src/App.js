import React, { Component } from 'react';
import Self from './Component/SelfPractice.js'
import logo from './img/logo.jpg'
import img from './img/turban.png'
import './Style.css'

class App extends Component {
    constructor(props) {

        super(props);
        this.state = {



        }
    }

    render() {





        return (

            <div>
                <div class="header">
                    <div class="info">
                        <h1>AFFINITY ID</h1>
                        <div class="meta">
                            <a href="https://twitter.com/nodws" target="_b" class="author"></a><br />
                         
                        </div>
                    </div>
                </div>


                <Self />

            </div>

        )
    }
}

export default App;
