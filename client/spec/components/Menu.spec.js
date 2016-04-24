//jscs:disable maximumLineLength

import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import Menu from '../../src/components/Menu';
import SignIn from '../../src/components/Menu/SignIn';
import CreateProfile from '../../src/components/Menu/CreateProfile';
import UpdateStatus from '../../src/components/Menu/UpdateStatus';

describe('<Menu />', () => {
  chai.use(chaiEnzyme);

  it('should display nothing is there is no user data.', () => {
    const menuWrapper = mount(<Menu user={null} onSignIn={() => {}}/>);

    expect(menuWrapper).to.have.text('');
  });

  it('should display a sign in component if the user isn\'t authenticated', () => {
    const onSignIn = () => {};

    const menuWrapper = mount(<Menu user={{ authData: null, profile: null }} onSignIn={onSignIn}/>);

    expect(menuWrapper).to.contain(<SignIn onSignIn={onSignIn}/>);
  });

  it('should display a create profile component if the user is authenticated and has no profile.', () => {
    const onSignIn = () => {};

    const user = {
      authData: {
        uid: 2,
      },
      profile: null,
    };
    const menuWrapper = mount(<Menu onSignIn={ onSignIn } user={ user }/>);

    expect(menuWrapper).to.contain(<CreateProfile />);
  });

  it('should display an update component if the user is authenticated and has a profile.', () => {
    const onSignIn = () => {};

    const user = {
      authData: {
        uid: 2,
      },
      profile: {
        displayName: 'bob',
        ageRange: 2,
        gender: 1,
        status: 2,
      },
    };
    const menuWrapper = mount(<Menu onSignIn={ onSignIn } user={ user }/>);

    expect(menuWrapper).to.contain(<UpdateStatus />);
  });
});
