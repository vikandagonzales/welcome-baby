// REACT
import React from 'react';

// REDUX
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addGuest, addGuestReset, editGuest, editGuestReset, deleteGuest, deleteGuestReset} from '../../state/actions/groups';

// COMPONENTS
import Group from './Group';

// ==========

class Guests extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: [],
      refresh: false
    };
  };

  select = id => {
    if (this.state.selected.find(existing => existing === id)) {
      this.setState({selected: this.state.selected.filter(existing => existing !== id)});
    } else {
      this.setState({selected: [...this.state.selected, id]});
    }
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
    return (
      <div className="guests">
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
          <span className="button is-primary">
            <span className="icon">
              <i className="fa fas fa-plus"></i>
            </span>
            <span>Add Group</span>
          </span>
        </div>
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
  deleteGuestError: state.groups.deleteGuestError
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addGuest,
  addGuestReset,
  editGuest,
  editGuestReset,
  deleteGuest,
  deleteGuestReset
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Guests);