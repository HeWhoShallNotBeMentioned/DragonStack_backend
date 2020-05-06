import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicDragons } from '../actions/publicDragons'
import PublicDragonRow from './PublicDragonRow';
import { Link } from 'react-router-dom';

class PublicDragons extends Component {
  componentDidMount() {
    this.props.fetchPublicDragons();
  }


  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        <h3>Public Dragons</h3>
        {
          this.props.publicDragons.dragons.map(dragon => {
            return (
              <div key={dragon.dragonId}>
                <PublicDragonRow dragon={dragon} />
                <hr />
              </div>
            )
          })
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const publicDragons = state.publicDragons;
  return { publicDragons, }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPublicDragons: () => dispatch(fetchPublicDragons())

  }
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(PublicDragons);
