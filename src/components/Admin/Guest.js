// REACT
import React from 'react';

// REDUX
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// ==========

class Guest extends React.Component {
  render () {
    const guest = this.props.guest;
    return (
      <li>
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
        {guest.first_name} {guest.last_name}
      </li>
    );
  };
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Guest);