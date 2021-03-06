// REACT
import React from 'react';

// REDUX
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  addGuest,
  addGuestReset,
  editGuest,
  editGuestReset,
  deleteGuest,
  deleteGuestReset,
  addGroup,
  addGroupReset,
  editGroup,
  editGroupReset,
  deleteGroup,
  deleteGroupReset
} from '../../state/actions/groups';

// COMPONENTS
import Group from './Group';
import GroupAdd from './GroupAdd';

// ==========

class Guests extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: [],
      refresh: false,
      add: false
    };
  };

  select = id => {
    if (this.state.selected.find(existing => existing === id)) {
      this.setState({selected: this.state.selected.filter(existing => existing !== id)});
    } else {
      this.setState({selected: [...this.state.selected, id]});
    }
  };

  add = () => {
    this.props.addGroupReset();
    this.setState({add: !this.state.add});
  };

  editGuest = async action => {
    await this.state.selected.forEach(id => {
      switch (action) {
        case 'accept':
          this.props.editGuest({accepted: true}, id);
          break;
        case 'decline':
          this.props.editGuest({accepted: false}, id);
          break;
        case 'reset':
          this.props.editGuest({accepted: null}, id);
          break;
        default:
          break;
      }
    });
    this.setState({selected: [], refresh: !this.state.refresh});
  };

  componentDidMount = () => {
    this.props.editGuestReset();
  };

  render () {
    const groups = this.props.groups;
    const guests = [].concat(...groups.map(group => group.guests.map(guest => guest)));
    return (
      <div className="guests">
        <div className="level guest-count">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Accepted</p>
              <p className="title is-4">{guests.filter(guest => guest.accepted === true).length}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Declined</p>
              <p className="title is-4">{guests.filter(guest => guest.accepted === false).length}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Pending</p>
              <p className="title is-4">{guests.filter(guest => guest.accepted === null).length}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Total</p>
              <p className="title is-4">{guests.length}</p>
            </div>
          </div>
        </div>
        <div className="buttons is-centered">
          <span
            className="button is-success"
            onClick={() => this.editGuest('accept')}
            disabled={this.state.selected.length > 0 ? false : true}
          >
            <span className="icon">
              <i className="fa fas fa-check"></i>
            </span>
            <span>Accept</span>
          </span>
          <span
            className="button is-danger"
            onClick={() => this.editGuest('decline')}
            disabled={this.state.selected.length > 0 ? false : true}
          >
            <span className="icon">
              <i className="fa fas fa-times"></i>
            </span>
            <span>Decline</span>
          </span>
          <span
            className="button is-info"
            onClick={() => this.editGuest('reset')}
            disabled={this.state.selected.length > 0 ? false : true}
          >
            <span className="icon">
              <i className="fa fas fa-redo"></i>
            </span>
            <span>Reset</span>
          </span>
          <span
            className="button is-primary"
            onClick={this.add}
          >
            <span className="icon">
              <i className="fa fas fa-plus"></i>
            </span>
            <span>Add Group</span>
          </span>
        </div>
        {
          this.state.add ? (
            <GroupAdd
              add={this.add}
              addGroup={this.props.addGroup}
              addGroupError={this.props.addGroupError}
            />
          ) : null
        }
        {
          this.props.addGuestError ? (
            <p className="help is-danger has-text-centered">
              Could not add guest.
              </p>
          ) : null
        }
        <ul>
          {
            groups.map((group, i) => {
              return (
                <Group
                  key={i}
                  group={group}
                  select={this.select}
                  addGuest={this.props.addGuest}
                  addGuestReset={this.props.addGuestReset}
                  addGuestError={this.props.addGuestError}
                  editGuest={this.props.editGuest}
                  editGuestReset={this.props.editGuestReset}
                  editGuestError={this.props.editGuestError}
                  deleteGuest={this.props.deleteGuest}
                  deleteGuestReset={this.props.deleteGuestReset}
                  deleteGuestError={this.props.deleteGuestError}
                  editGroup={this.props.editGroup}
                  editGroupReset={this.props.editGroupReset}
                  editGroupError={this.props.editGroupError}
                  deleteGroup={this.props.deleteGroup}
                  deleteGroupReset={this.props.deleteGroupReset}
                  deleteGroupError={this.props.deleteGroupError}
                  refresh={this.state.refresh}
                />
              );
            })
          }
        </ul>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  addGuestError: state.groups.addGuestError,
  editGuestError: state.groups.editGuestError,
  deleteGuestError: state.groups.deleteGuestError,
  addGroupError: state.groups.addGroupError,
  editGroupError: state.groups.editGroupError,
  deleteGroupError: state.groups.deleteGroupError
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addGuest,
  addGuestReset,
  editGuest,
  editGuestReset,
  deleteGuest,
  deleteGuestReset,
  addGroup,
  addGroupReset,
  editGroup,
  editGroupReset,
  deleteGroup,
  deleteGroupReset,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Guests);