import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { editData, deleteData, fetchData } from '../Redux/Actions/actions.js';
import BasicTable from './BasicTable';
import { Button, Modal, Container, Form} from "react-bootstrap";
import { cloneDeep } from 'lodash';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedItemId: null,
      selectedItem: null,
    }
  }

  componentDidMount(){
    this.props.fetchData();
  }

  toggleModals = (flag, id) => {
    const data  = cloneDeep(this.props.data);
    const selectedItem = data.find( item => item.id == id);
    this.setState({isModalOpen: flag, selectedItemId: id, selectedItem: selectedItem});
  }

  onChange = (event) =>{
    const { name, value } = event.target;
    const selectedItem = cloneDeep(this.state.selectedItem);
    selectedItem[name] = value;
    this.setState({selectedItem: selectedItem});
  }

  updateData = () =>{
    const data  = cloneDeep(this.props.data);
    const selectedItem = cloneDeep(this.state.selectedItem);
    
    const updatedData = data.map((item)=>{
      if(item.id === selectedItem.id){
        return selectedItem;
      }
      return item;
    })

    this.toggleModals(false,null);
    this.props.editData(updatedData);
  }

  deleteItem = (id) =>{
    const data  = cloneDeep(this.props.data);
    const updatedData = data.filter(item => item.id != id );
    this.props.deleteData(updatedData);
  }

  render() {
    const { data } = this.props, { isModalOpen, selectedItem } = this.state;
    return (
      <div>
        <Container >

            { data.length > 0 ? 
              <BasicTable data={data} toggleModals={this.toggleModals} deleteItem={this.deleteItem} />
            :
              <div className='no-data-container'>
                <div className='no-data-content'>
                  <h1>No Data Found</h1>
                  <p>Please reload the page to fetch data</p>
                </div>
              </div>
            }

        </Container>

        {isModalOpen && (
          <div>
            <Modal show={true} onHide={()=> this.toggleModals(false, null)}>
              <Modal.Header closeButton>
                <Modal.Title>Update users date</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="first_name"
                      type="text"
                      value={selectedItem.first_name}
                      onChange={this.onChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="last_name"
                      type="text"
                      value={selectedItem.last_name}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name='email'
                      type="email" 
                      value={selectedItem.email}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=> this.toggleModals(false, null)}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.updateData}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
return {
  data: state.data.data
 };
};
const mapDispatchToProps = (dispatch) => {
return {
   fetchData: () => dispatch(fetchData()),
   editData: (id) => dispatch(editData(id)),
   deleteData: (id) => dispatch(deleteData(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);