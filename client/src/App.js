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
                    <div class="sides">
                        <img class="logo" src={logo} alt='logo' />
                       
                    </div>
                    <div class="sides"> <a href="#" class="menu"> </a></div>
                    <div class="info">
                        <h1>It always seems impossible until it's dine.</h1>
                        <div class="meta">
                            <a href="https://twitter.com/nodws" target="_b" class="author"></a><br />
                            By <a href="https://twitter.com/nodws" target="_b">Bhupinder Singh Sandhu</a>
                        </div>
                    </div>
                </div>


                <Self />

            </div>

        )
    }
}

export default App;
