import { TutorialToken } from "./contract-types/TutorialToken"; // import is correct
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TutorialTokenContractData from "./contract-data/TutorialToken.json";
import BN from "bn.js";
import Nav from "./components/navbar/Nav";

import WriterPage from "./components/pages/writer/Writer";
import RequestorPage from "./components/pages/requestor/Requestor";
import RecipientPage from "./components/pages/recipient/Recipient";
import LoginPage from "./components/pages/login/Login";
import HomePage from "./components/pages/home/Home";

import User from "./interfaces/User.interface";

import * as ROUTES from "./common/routes";

import Web3 from "web3";
export let web3: Web3;

export const GAS_LIMIT_STANDARD = 6000000;
export let accounts: string[];
let web3Provider;

let contract: any;
const ERC20_NETWORK = "https://services.jade.builders/core-geth/kotti/1.11.2";
export async function deployContract<T>(
  contractName: string,
  abi: any,
  code: any,
  ...args: any[]
): Promise<T> {
  const Contract = new web3.eth.Contract(abi);
  const contractResult = await Contract.deploy({ data: code }).send({
    from: accounts[0],
  });
  return contractResult as any;
}

export async function deployTutorialToken(): Promise<TutorialToken> {
  console.log("Deploying Contract from innner deploy tutorial token method: ");
  var contract = await deployContract<TutorialToken>(
    "TutorialToken",
    TutorialTokenContractData.abi,
    TutorialTokenContractData.bytecode,
    0
  );
  console.log("Contract from innner deploy tutorial token method: " + contract);
  return contract;
}

type MyProps = {};
type MyState = {
  numErcBeingTraded: number;
  contract: TutorialToken;
  connected: boolean;
  user: User;
};

class App extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      numErcBeingTraded: 0,
      contract: {} as TutorialToken,
      connected: false,
      user: {publicAddress: ""},
    };
    this.onConnect = this.onConnect.bind(this);
    //this.handleErcInputChange = this.handleErcInputChange.bind(this);
  }

  handleErcInputChange(event: any) {
    this.setState({
      numErcBeingTraded: event.target.value,
    });
    console.log("Num of ERC wanted to trade: " + this.state.numErcBeingTraded);
    var rate = this.state.contract.methods.rate().call();
    var numErc = new BN(this.state.numErcBeingTraded);
    //var numTokens = rate.mul(numErc);
    //console.log("Num of Tutorial Tokens you can receive: " + numTokens.toString());
  }

  async onConnect() {
    const ethereum = (window as any).ethereum;
    await ethereum.enable();
    web3Provider = (window as any).web3.currentProvider;
    // NOTE you might need this
    //await ethereum.send('eth_requestAccounts')

    web3 = new Web3(web3Provider);
    accounts = await ethereum.request({ method: "eth_accounts" });
    // contract = await deployTutorialToken(); // temporary disable

    this.setState((prevState) => ({
      contract,
      connected: true,
      user: {publicAddress: accounts[0]},
    }));
  }

  onLogin(u: User) {
    console.log("login complete");
    this.setState({user: u});
  }

  render() {
    return (
      <Router>
        <Nav
          publicAddress={this.state.user.publicAddress}
          connected={this.state.connected}
          onConnect={this.onConnect}
        />
        <div>
          <Route
            exact
            path={ROUTES.LOGIN}
            render={() => (
              <LoginPage callback={this.onLogin.bind(this)} user={this.state.user} />
            )}
          />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.REQUESTOR} component={RequestorPage} />
          <Route path={ROUTES.RECIPIENT} component={RecipientPage} />
          <Route path={ROUTES.WRITER} component={WriterPage} />
        </div>
      </Router>
    );
  }
}
export default App;
