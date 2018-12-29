// REACT
import React from 'react';

// ==========

class GuestEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      first_name: this.props.guest.first_name,
      last_name: this.props.guest.last_name
    };
  };

  editGuest = async event => {
    event.preventDefault();
    const {first_name, last_name} = this.state;
    const guest = {first_name, last_name};
    await this.props.editGuest(guest, this.props.guest.id, this.props.guest.group_id);
    if (!this.props.editGuestError) {
      if (this.props.guest.id === this.props.user.id) await this.props.getUser();
      this.props.edit();
    } 
  };

  render () {
    const guest = this.props.guest;
    return (
      <form onSubmit={this.editGuest}>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="First Name"
                  value={this.state.first_name}
                  onChange={event => this.setState({first_name: event.target.value})}
                  required
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Last Name"
                  value={this.state.last_name}
                  onChange={event => this.setState({last_name: event.target.value})}
                  required
                />
              </p>
            </div>
          </div>
          <div className="field">
            <div className="buttons">
              <button className="button">Save</button>
              <span className="button" onClick={this.props.edit}>Cancel</span>
              {guest.plus_one ? <span className="button" onClick={this.props.toggle}>Delete</span> : null}
            </div>
          </div>
        </div>
      </form>
    );
  };
};

export default GuestEdit;