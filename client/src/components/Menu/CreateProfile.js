import React, { Component, PropTypes} from 'react';
import ageRanges from '../../../../config/ageRanges';
import genders from '../../../../config/genders';

let genderRef;
let ageRangeRef;

class CreateProfile extends Component {
  constructor (props) {
    super(props);

    this.createProfile = this.createProfile.bind(this);
  }

  createProfile () {
    this.props.onCreateProfile(
      parseInt(ageRangeRef.value),
      parseInt(genderRef.value)
    );
  }

  render () {
    return <div>
      <h2 id='welcomeMessage'>
        {
          'Welcome, ' +
          this.props.user.authData.displayName +
          '.  Tell us a little bit about yourself.'
        }
      </h2>
      <h3>What is your age range?</h3>
      <select name='age range' id='ageRangeSelector' ref={
          (ref) => {
            ageRangeRef = ref;
          }
      }>
        {
          ageRanges.map(
            (ageRange, id) => <option value={id} key={id}>{ageRange}</option>
          )
        }
      </select>
      <h3>What gender do you identify as?</h3>
      <select name='gender' id='genderSelector' ref={
        (ref) => {
          genderRef = ref;
        }
      }>
        {
          genders.map(
            (gender, id) => <option value={id} key={id}>{gender}</option>
          )
        }
      </select>
      <button id='createProfileButton' onClick={this.createProfile}>Create Profile</button>
      <button id='signOutButton' onClick={this.props.onSignOut}>Sign Out</button>
    </div>;
  }
}

CreateProfile.propTypes = {
  user: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
  onCreateProfile: PropTypes.func.isRequired,
};

export default CreateProfile;
