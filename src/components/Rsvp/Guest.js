// REACT
import React from 'react';

// REDUX
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getUser} from '../../state/actions/auth';

// COMPONENTS
import GuestEdit from './GuestEdit';
import GuestDelete from './GuestDelete';

// ==========

class Guest extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: false,
      edit: false,
      modal: false,
      modalClasses: 'modal'
    };
  };

  check = async () => {
    await this.setState({checked: !this.state.checked});
    this.props.select(this.props.guest.id);
  };

  edit = () => {
    this.props.editGuestReset();
    this.setState({edit: !this.state.edit});
  };

  toggle = () => {
    this.props.deleteGuestReset();
    if (!this.state.modal) {
      this.setState({
        modal: true,
        modalClasses: this.state.modalClasses + ' is-active'
      });
    } else {
      this.setState({
        modal: false,
        modalClasses: 'modal'
      });
    }
  };

  componentDidUpdate (prevProps) {
    if (prevProps.refresh !== this.props.refresh) this.setState({checked: false});
  };

  render () {
    const guest = this.props.guest;
    return (
      <li className="guest-li">        
        {
          !this.state.edit ? (
            <div className="guest-info">
              <div>
                <input id={`guest-${guest.id}`} className="is-checkradio" type="checkbox" checked={this.state.checked} onChange={event => event.preventDefault()} />
                <label htmlFor={`guest-${guest.id}`} onClick={this.check}>
                  {
                    (() => {
                      switch (guest.accepted) {
                        case true:
                          return (<i className="fa fas fa-check-circle"></i>);
                        case false:
                          return (<i className="fa fas fa-times-circle"></i>);
                        default:
                          return (<i className="fa fas fa-question-circle"></i>);
                      }
                    })()
                  }
                  <span>{guest.first_name} {guest.last_name}</span>
                </label>
              </div>
              <div className="actions">
                <span className="pointer" onClick={this.edit}><i className="fas fa-pen"></i></span>
              </div>             
            </div>
          ) : (
            <GuestEdit
              toggle={this.toggle}
              edit={this.edit}
              editGuest={this.props.editGuest}
              editGuestError={this.props.editGuestError}
              guest={guest}
              user={this.props.user}
              getUser={this.props.getUser}
              admin={this.props.admin}
            />
          )
        }
        <GuestDelete
          modalClasses={this.state.modalClasses}
          toggle={this.toggle}
          edit={this.edit}
          deleteGuest={this.props.deleteGuest}
          deleteGuestError={this.props.deleteGuestError}
          guest={guest}
        />
      </li>
    );
  };
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Guest);