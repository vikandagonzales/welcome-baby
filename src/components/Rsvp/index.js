// REACT
import React from 'react';

// REDUX
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addGuest, addGuestReset, editGuest, editGuestReset} from '../../state/actions/guests';

// COMPONENTS
import Guest from './Guest';
import GuestAdd from './GuestAdd';

// ==========

class Rsvp extends React.Component {
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
    this.props.addGuestReset();
    this.setState({add: !this.state.add});
  };

  editGuest = async action => {
    await this.state.selected.forEach(id => {
      switch (action) {
        case 'accept':
          this.props.editGuest({accepted: true}, id, this.props.group.id);
          break;
        case 'decline':
          this.props.editGuest({accepted: false}, id, this.props.group.id);
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
    const group = this.props.group;
    group.allowance = this.props.allowance;
    return (
      <div id="rsvp-modal" className="modal-content">
        <div className="box">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div>
                  <h1 className="title is-spaced">{group.name}</h1>
                  {
                    (() => {
                      if (group.allowance > 0) return <p className="subtitle is-7">+{group.allowance} guest{group.allowance > 1 ? 's' : null}</p>
                    })()
                  }
                </div>                
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div className="buttons">
                  <span
                    className="button is-small is-success"
                    onClick={() => this.editGuest('accept')}
                    disabled={this.state.selected.length > 0 ? false : true}
                  >
                    <span className="icon">
                      <i className="fa fas fa-check"></i>
                    </span>
                  </span>
                  <span
                    className="button is-small is-danger"
                    onClick={() => this.editGuest('decline')}
                    disabled={this.state.selected.length > 0 ? false : true}
                  >
                    <span className="icon">
                      <i className="fa fas fa-times"></i>
                    </span>
                  </span>
                  {
                    group.allowance > 0 ? (
                      <span
                        className="button is-small is-primary"
                        onClick={this.add}
                      >
                        <span className="icon">
                          <i className="fa fas fa-plus"></i>
                        </span>            
                      </span>
                    ) : null
                  }
                </div>
              </div>
            </div>
          </div>
          <div>
            <ul>
              {
                group.guests.map((guest, i) => {
                  return (
                    <Guest
                      key={i}
                      guest={guest}
                      select={this.select}
                      editGuest={this.props.editGuest}
                      editGuestError={this.props.editGuestError}
                      refresh={this.state.refresh}
                    />
                  );
                })
              }
              {
                this.props.editGuestError ? (
                  <p className="help is-danger">
                    Could not edit guest.
                </p>
                ) : null
              }
              {
                this.state.add ? (
                  <GuestAdd
                    add={this.add}
                    addGuest={this.props.addGuest}
                    addGuestError={this.props.addGuestError}
                    group={group}
                  />
                ) : null
              }
            </ul>
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  group: state.main.group,
  addGuestError: state.main.addGuestError,
  editGuestError: state.main.editGuestError
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addGuest,
  addGuestReset,
  editGuest,
  editGuestReset
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Rsvp);