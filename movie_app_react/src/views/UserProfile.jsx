import React, { Component } from "react";
import axios from 'axios';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Alert
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { ProfileCard } from "views/admin/user/ProfileCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      item: {
        name: "",
        email: "",
        password: "",
        role: "",
        tags: ["handwash"]
      }
    }
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/users/search/5f86c92a7397b03d88c0973b")
      .then(res => {
        const item = res.data;
        this.setState({ item });
        console.log(this.state)
      })
  }

  handleChange(e) {
    console.log("check", e.target.value)
    const data = this.state.item;
    data[e.target.name] = e.target.value
    this.setState({ item: data });
    console.log(this.state.item)
  }

  save() {
    const item = this.state.item;
    console.log(item)
    const updatedItem =  {
      "name": item.name,
      "email": item.email,
      "password": item.password,
      "role": item.role
    }
    axios.put(`http://localhost:4000/api/users/5f86c92a7397b03d88c0973b`, updatedItem)
      .then(alert('Profile Updated'))
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error)
      });
  }



  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Username",
                          type: "text",
                          name: "name",
                          bsClass: "form-control",
                          onChange: this.handleChange,
                          placeholder: "Username",
                          defaultValue: this.state.item.name
                        },
                        {
                          label: "Email address",
                          type: "text",
                          name: "email",
                          bsClass: "form-control",
                          onChange: this.handleChange,
                          placeholder: "Email",
                          defaultValue: this.state.item.email
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Password",
                          type: "text",
                          name: "password",
                          bsClass: "form-control",
                          onChange: this.handleChange,
                          placeholder: "Password",
                          defaultValue: this.state.item.password
                        },
                        {
                          label: "Role",
                          type: "text",
                          name: "role",
                          bsClass: "form-control",
                          onChange: this.handleChange,
                          placeholder: "Role",
                          defaultValue: this.state.item.role
                        }
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill  onClick={this.save}>
                      Update Profile
                    </Button>
                <div className="clearfix" />
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <ProfileCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name= {this.state.item.name}
                userName={this.state.item.email}
                description={
                  <span>
                    <br />
                    <h4><strong>Hello Admin</strong></h4>
                    <br />
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
