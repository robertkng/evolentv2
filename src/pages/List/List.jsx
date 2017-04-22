import React, { Component } from 'react';
import Contacts from '../../components/Contacts/Contacts';
import './List.css';

// const baseUrl = 'http://localhost:5000/api';
const baseUrl = 'https://evolent.herokuapp.com/api';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: true,
      activeContacts: [],
      inactiveContacts: [],
      isLoading: false,
    };
    this.deleteContact = this.deleteContact.bind(this);
  }

  componentWillMount() {
    this.getAllContacts(this.state.isActive);
  }

  // Send request to get all contacts
  getAllContacts(isActive) {
    const contactState = isActive ? 'Active' : 'Inactive';

    fetch(`${baseUrl}/contacts/${contactState}`, {
      method: 'GET',
    })
    .then(r => r.json())
    .then((response) => {
      const contacts = response.data;

      if (isActive) {
        this.setState({
          activeContacts: [].concat(contacts),
          isLoading: false,
        });
      } else {
        this.setState({
          inactiveContacts: [].concat(contacts),
          isLoading: false,
        });
      }
    })
    .catch(err => err);
  }

  // Retrieve Active/Inactive Contacts and switch contact states (active or inactive)
  toggleContactState(isActive) {
    this.setState({
      isActive,
      isLoading: true,
    });

    this.getAllContacts(isActive);
  }

  // Delete contact
  deleteContact(userID) {
    this.setState({
      isLoading: true,
    });

    fetch(`${baseUrl}/contact/${userID}`, {
      method: 'DELETE',
    })
    .then(() => {
      this.getAllContacts(this.state.isActive);
    });
  }

  render() {
    let activeClass = null;
    let inactiveClass = null;
    let contacts = [];

    if (this.state.isActive) {
      activeClass = 'active';
      inactiveClass = null;
      contacts = [].concat(this.state.activeContacts);
    } else {
      inactiveClass = 'inactive';
      activeClass = null;
      contacts = [].concat(this.state.inactiveContacts);
    }

    return (
      <div className="contacts">
        <div className="switch-contact">
          <button
            className={`status-btn active-btn ${activeClass}`}
            onClick={() => this.toggleContactState(true)}
          >
            Active Contacts
          </button>
          <button
            className={`status-btn inactive-btn ${inactiveClass}`}
            onClick={() => this.toggleContactState(false)}
          >
            Inactive Contacts
          </button>
        </div>

        <div className="contact-list">
          <Contacts contacts={contacts} deleteContact={this.deleteContact} />
          {
            this.state.isLoading ?
              <div className="contact-loading"><span>Loading...</span></div> :
              null
          }
        </div>
      </div>
    );
  }
}

export default List;
