import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import "./Nav.css";

import * as ROUTES from "../../routes";
import UserAuth from "../../common/UserAuth.interface";

type NavProps = {
  user: UserAuth;
  connectedTo: boolean; // metamask
  onConnect: () => void;
  loggedIn: boolean; // app
};
type NavState = {};

class Nav extends React.Component<NavProps, NavState> {
  constructor(props: any) {
    super(props);
    this.onConnect = this.onConnect.bind(this);
  }

  onConnect() {
    // callback
    this.props.onConnect();
  }

  render() {
    const brandLink = this.props.loggedIn ? "/dashboard" : "/";
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand
          onClick={() => {
            return false;
          }}
          href={brandLink}
        >
          {" "}
          ETC Reference Letter dApp
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {!this.props.connectedTo && (
            <Button
              className="connect"
              onClick={() => {
                this.onConnect();
              }}
            >
              Connect
            </Button>
          )}
          {this.props.connectedTo && (
            <Navbar.Text className="navText">
              Signed in as:{" "}
              <a>
                {this.props.connectedTo ? this.props.user.publicAddress : "--"}
              </a>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Menu
          </Dropdown.Toggle>
          {this.props.connectedTo && (
            <Dropdown.Menu alignRight={true}>
              <Link to={ROUTES.HOME} style={{ textDecoration: "none" }}>
                <li>
                  <Dropdown.Item href="#/action-0">Home</Dropdown.Item>
                </li>
              </Link>
              {/* <Link to={ROUTES.LOGIN} style={{ textDecoration: "none" }}>
              <li>
                <Dropdown.Item href="#/action-1">Login</Dropdown.Item>
              </li>
            </Link> */}
              <Link to={ROUTES.DASHBOARD} style={{ textDecoration: "none" }}>
                <li>
                  <Dropdown.Item href="#/action-2">Dashboard</Dropdown.Item>
                </li>
              </Link>
              <Link to={ROUTES.REQUESTOR} style={{ textDecoration: "none" }}>
                <li>
                  <Dropdown.Item href="#/action-3">Requestor</Dropdown.Item>
                </li>
              </Link>
              <Link to={ROUTES.WRITER} style={{ textDecoration: "none" }}>
                <li>
                  <Dropdown.Item href="#/action-4">Writer</Dropdown.Item>
                </li>
              </Link>
              <Link to={ROUTES.RECIPIENT} style={{ textDecoration: "none" }}>
                <li>
                  <Dropdown.Item href="#/action-5">Recipient</Dropdown.Item>
                </li>
              </Link>
            </Dropdown.Menu>
          )}
          {!this.props.connectedTo && (
            <Dropdown.Menu alignRight={true}>
              <Link to={ROUTES.HOME} style={{ textDecoration: "none" }}>
                <li>
                  <Dropdown.Item href="#/action-0">Home</Dropdown.Item>
                </li>
              </Link>
              <Link to={ROUTES.LOGIN} style={{ textDecoration: "none" }}>
                <li>
                  <Dropdown.Item href="#/action-1">Login</Dropdown.Item>
                </li>
              </Link>
            </Dropdown.Menu>
          )}
        </Dropdown>
      </Navbar>
    );
  }
}
export default Nav;
