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

    const {show,  handleModalHide, type, dataId, student, handleStudentData} = this.props;
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

    //data delete handler
    const handleDataDelete = (id) => {
        
        try {
            axios.delete(`http://localhost:5050/students/${ id }`).then(res => {
                handleModalHide();
            });

        }catch( err ){
            console.log(err);
        }
    }
    //console.log(this.state.inputs);

    //student data update after editing
    const handleStudentFormUpdate = (e) => {
        e.preventDefault();


        try{
            axios.patch(`http://localhost:5050/students/${ student.id }`, student).then(res => {
                handleModalHide();
            });

        }catch(err){
            console.log(err);
        }
    }

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
                  <img src= {student.photo} alt="" />
                  <h2>{ student.name}</h2>
                  <h2>{ student.cell}</h2>
                  
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
                    <Button onClick={ handleModalHide } variant='success'>Cancel</Button> &nbsp;
                    <Button onClick={ e => handleDataDelete(dataId)} variant='danger'>Delete</Button>
                  </div>
              </ModalBody>
            </Modal>
          )
    }
    else if(type === 'edit'){
        return (
            <Modal show={show} onHide={  handleModalHide } centered>
              <ModalBody>
                  <h2>Update Student Data</h2>
                  <hr />
                  <Form onSubmit={ handleStudentFormUpdate }>
                      <Form.Group className='my-3'>
                          <Form.Label> Student Name</Form.Label>
                          <Form.Control value={ student.name } type="text" onChange={ e => handleStudentData({
                            ...student,
                            name : e.target.value
                          }) }/>
                      </Form.Group>
                      <Form.Group className='my-3'>
                          <Form.Label> Cell</Form.Label>
                          <Form.Control value={ student.cell } type="text" onChange={ e => handleStudentData({
                            ...student,
                            cell : e.target.value
                          })
                           }/>
                      </Form.Group>
                      <Form.Group className='my-3'>
                          <Form.Label> Student Photo</Form.Label>
                          <Form.Control value={ student.photo } type="text" onChange={ e => handleStudentData({
                            ...student,
                            photo : e.target.value
                          })
                           }/>
                      </Form.Group>
                      <Form.Group className='my-3'>
                          <Button type='submit' variant='primary'>Add now</Button>
                      </Form.Group>
                  </Form>
      
              </ModalBody>
            </Modal>
          )
    }
  }
};

export default StudentModal;