import axios from 'axios';
import React, { Component } from 'react'
import { Alert, Button, Card, CloseButton, Col, Container, Row, Table } from 'react-bootstrap'
import StudentModal from './StudentModal'

export class Student extends Component {

    constructor(props){
        super(props);

        this.state = {
            modal : {
                status : false,
                type : '',

            },
            alert : {
                status : false,
                msg : '',
                type : ''
            },
            students : []
        }
    }


  render() {

    const { modal, students } = this.state;
    const { type, msg, status  } = this.state.alert;

    const getAllStudentsData = () => {

        try {
            axios.get('http://localhost:5050/students').then(res => {
                this.setState((prevState) => ({
                    ...prevState,
                    students : res.data

                }));
            })
        }catch(err){
            console.log(err);
        }
    }

    getAllStudentsData();
 



    const handleModalShow = () => { 
        this.setState({
            ...this.state,
            modal : {
                status: true,
                type: 'create'
            }
        });
    }

    const handleModalHide = () => { 
        this.setState({
            ...this.state,
            modal : {
                status: false,
                type : ''
            }
        });
    }

    //showing alert when view button is clicked
    const handleAlertShow = () =>{
        this.setState({
            ...this.state,
            alert : {
                status : true,
                msg : 'we are now ready',
                type : 'danger'
            }
        });

    }

    //not showing alert when cross is clicked
    const handleAlertHide = () =>{
        this.setState({
            ...this.state,
            alert : {
                status : false,
                msg : '',
                type : ''
            }
        });

    }
    //show single student data

    const handleStudentSingleModal = () => {
        this.setState({
            ...this.state,
            modal : {
                status: true,
                type: 'show'
            }
        });

    }

    //
    const handleModalAlert = () =>{
        this.setState({
            ...this.state,
            modal : {
                status: true,
                type: 'alert'
            }
        });

    }

    return (

      <Container>
        <Row className='justify-content-center my-5'>
            <Col md ={6}>
            <Button onClick={ handleModalShow } variant={'primary'}>Add New Student</Button>
            <StudentModal show= { modal.status } handleModalHide ={handleModalHide} type = { modal.type }/>
            <br />
            <br />
            {
                status && <Alert className='d-flex justify-content-between' variant= {type}>{msg} 
                <CloseButton onClick={ handleAlertHide }></CloseButton></Alert>
            }
            
                <Card className='shadow'>
                    <Card.Body>
                        
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Cell</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map( (data, index) => 
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{data.name}</td>
                                            <td>{data.cell}</td>
                                            <td><img style={{width: '60px', height: '60px'}} src= {data.photo} alt="" /></td>
                                            <td>
                                                <a onClick={ handleStudentSingleModal } className='btn btn-sm btn-info' href="#">View</a> &nbsp;
                                                <a className='btn btn-sm btn-warning'href="">Edit</a> &nbsp;
                                                <a onClick= { handleModalAlert } className='btn btn-sm btn-danger'href="#">Delete</a>
                                            </td>
                                        </tr>
                                        )
                                }
                                
                                
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </Container>
    )
  }
}

export default Student
