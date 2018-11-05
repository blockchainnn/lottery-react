import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

    state = {
        manager: '',
        entrants: [],
        balance: '',
        value: '',
        message: ''
    };

    async componentDidMount() {
        // When working with meta-mask, 'from' property in call arg obj
        // does NOT need to be specified, it defaults to first account in meta mask
        // Ex: .call({ from: accounts[0] }) <-- Not necessary

        // 1. Get the address of the smart contract manager
        const manager = await lottery.methods.manager().call();

        // 2. Get the list of entrants participating in the lottery
        const entrants = await lottery.methods.getEntrants().call();

        // 3. Get the total balance of the lottery contract
        const balance = await web3.eth.getBalance(lottery.options.address);

        // 4. Set state once component has mounted
        this.setState({manager, entrants, balance});
    }

    onSubmit = async (e) => {
        e.preventDefault();

        // Get list of accounts
        const accounts = await web3.eth.getAccounts();
        // console.log('accounts[0]', accounts[0]);


        // Display transaction pending message
        this.setState({message: 'Waiting on transaction success...'});

        // Submit contract with address and value
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, 'ether'),
            gas: '1000000'

        });

        // Once transaction has been processed, display success message
        this.setState({
            message: 'You have been entered. Good luck!',
            balance: this.state.balance,
            successColor: 'green'
        })

    };

    onClick = async () => {

        // Get list of accounts
        const accounts = await web3.eth.getAccounts();

        this.setState({message: 'Waiting on transaction success...', successColor: 'black'});

        await lottery.methods.pickWinner().send({
            from: accounts[0],
            gas: '1000000'

        });

        this.setState({
            message: 'A winner has been selected!'
        })


    };

    render() {

        // log web3 version
        // console.log(web3.version);

        // log account info
        // web3.eth.getAccounts()
        //     .then(console.log)

        return (
            <div style={{margin: '0 auto', padding: '50px'}}>
                <h2>Lottery Contract</h2>
                <p>This contract is managed by: {this.state.manager}</p>
                <p>Entrants: {this.state.entrants.length}</p>
                <p>Total Pot Size: {web3.utils.fromWei(this.state.balance, 'ether')} ether</p>
                <hr/>
                <form onSubmit={this.onSubmit}>
                    <h4>Enter To Win!</h4>
                    <div>
                        <label>Amount of Ether</label>
                        <input type="text" value={this.state.value}
                               onChange={event => this.setState({value: event.target.value})}/>
                    </div>
                    <button>Enter</button>
                </form>

                <hr/>

                <h4>Ready to pick a winner?</h4>
                <button onClick={this.onClick}>Pick a Winner!</button>

                <hr/>
                <h3 style={{color: this.state.successColor}}><em>{this.state.message}</em></h3>
            </div>
        );
    }
}

export default App;
