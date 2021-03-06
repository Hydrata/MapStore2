/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import SwitchButton from '../SwitchButton';

describe('SwitchButton component', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('SwitchButton rendering with defaults', () => {
        ReactDOM.render(<SwitchButton />, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelector('.mapstore-switch-btn');
        expect(el).toExist();
    });
    it('Test SwitchButton onChange', () => {
        const actions = {
            onChange: () => {}
        };
        const spyonChange = expect.spyOn(actions, 'onChange');
        ReactDOM.render(<SwitchButton onChange={actions.onChange} />, document.getElementById("container"));
        const input = document.getElementsByTagName('input')[0];
        ReactTestUtils.Simulate.change(input); // <-- trigger event callback
        expect(spyonChange).toHaveBeenCalled();
    });
    it('Test disabled', () => {
        ReactDOM.render(<SwitchButton disabled />, document.getElementById("container"));
        const input = document.getElementsByTagName('input')[0];
        expect(input.disabled).toBeTruthy();

    });
});
