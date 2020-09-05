import { BigNumber } from "bignumber.js";
import { TutorialToken } from "../../contract-types/TutorialToken"; // import is correct
import React from "react";
import TutorialTokenContractData from "../../contract-data/TutorialToken.json";
import BN from "bn.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

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
  user: string;
};
class Nav extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      numErcBeingTraded: 0,
      contract: {} as TutorialToken,
      connected: false,
      user: "",
    };
    this.connect = this.connect.bind(this);
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

  async connect() {
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
      user: accounts[0],
    }));
  }

  render() {
    return (
        <Container fluid>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">ETC Reference Letter dApp</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {!this.state.connected && (
                <input
                  type="button"
                  onClick={this.connect}
                  value="Connect"
                />
              )}
              <Navbar.Text>
                Signed in as:{" "}
                <a href="#login">
                  {this.state.connected ? this.state.user : "--"}
                </a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </Container>
    );
  }
}
export default Nav;
