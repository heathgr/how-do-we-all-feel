//jscs:disable maximumLineLength
import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import UpdateStatus from '../../../src/components/Menu/UpdateStatus';
import statuses from '../../../../config/statuses';

import statusData from '../../testConstants/statusData';

describe('<UpdateStatus />', () => {
  chai.use(chaiEnzyme());

  const onUpdateStatus = sinon.spy();
  const user = {
    statusData,
  };

  const UpdateStatusWrapper = mount(<UpdateStatus onUpdateStatus={onUpdateStatus} user={user} />);

  it('Should have an update status button for every status value', () => {
    expect(UpdateStatusWrapper).to.have.exactly(statuses.length).descendants('button');
  });

  it('Should have buttons that are correctly labeled', () => {
    statuses.map(
      (status) => {
        expect(UpdateStatusWrapper.find('#' + status + 'StatusButton')).to.have.text('I am feeling ' + status + '.');
      }
    );
  });

  it('should have buttons that call the onUpdateStatus button when clicked', () => {
    statuses.map(
      (status, id) => {
        UpdateStatusWrapper.find('#' + status + 'StatusButton').simulate('click');
        expect(onUpdateStatus.calledWith(id)).to.equal(true);
      }
    );
  });
});
