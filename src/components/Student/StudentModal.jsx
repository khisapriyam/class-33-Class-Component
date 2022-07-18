import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Modal, ModalBody } from 'react-bootstrap';

export class StudentModal extends Component {

    constructor(props){
        super(props)

        this.state = {
            inputs : {
                name: '',
                cell: '',
                photo: ''
            }
        }
    }

  render() {

    const {show,  handleModalHide, type} = this.props;
    const {name, cell, photo} = this.state.inputs;

    const handleStudentFormSumbit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5050/students', this.state.inputs).then(res => {
            this.setState((prevState) => ({
                ...prevState,
                inputs : {
                    name : '',
                    cell : '',
                    photo : ''
                }

            }));
            handleModalHide();
        });


    }
    console.log(this.state.inputs);

    if(type === 'create'){
        return (
            <Modal show={show} onHide={  handleModalHide } centered>
              <ModalBody>
                  <h2>Add new Student</h2>
                  <hr />
                  <Form onSubmit={ handleStudentFormSumbit }>
                      <Form.Group className='my-3'>
                          <Form.Label> Student Name</Form.Label>
                          <Form.Control value={ name } type="text" onChange={ e => this.setState((prevState) => 
                          ({
                            ...prevState,
                            inputs : {
                                ...prevState.inputs,
                                name : e.target.value
                            }
                          })) }/>
                      </Form.Group>
                      <Form.Group className='my-3'>
                          <Form.Label> Cell</Form.Label>
                          <Form.Control value={ cell } type="text" onChange={ e => this.setState((agerState) => 
                          ({
                            ...agerState,
                            inputs : {
                                ...agerState.inputs,
                                cell : e.target.value
                            }

                            }) )}/>
                      </Form.Group>
                      <Form.Group className='my-3'>
                          <Form.Label> Student Photo</Form.Label>
                          <Form.Control value={ photo } type="text" onChange= {e => this.setState((prevState) => 
                          ({
                            ...prevState,
                            inputs : {
                                ...prevState.inputs,
                                photo : e.target.value
                            }

                          }))}/>
                      </Form.Group>
                      <Form.Group className='my-3'>
                          <Button type='submit' variant='primary'>Add now</Button>
                      </Form.Group>
                  </Form>
      
              </ModalBody>
            </Modal>
          )

    }
    else if(type === 'show'){
        return (
            <Modal show={show} onHide={  handleModalHide } centered>
              <ModalBody>
                  <img src="https://afamilycdn.com/150157425591193600/2022/2/20/ce3660d3f4191e212dafe5893c8c3108-16453453404551933521543.jpg" alt="" />
              </ModalBody>
            </Modal>
          )
    }
    else if(type === 'alert'){
        return (
            <Modal show={show} onHide={  handleModalHide } centered>
              <ModalBody>
                  <h3>Are you sure ?</h3>
                  <p>Delete student data</p>
                  <div className="alert-btns">
                    <Button variant='success'>Cancel</Button> &nbsp;
                    <Button variant='danger'>Delete</Button>
                  </div>
              </ModalBody>
            </Modal>
          )

    }
  }
};

export default StudentModal;