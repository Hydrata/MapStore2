
/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import {Label} from 'react-bootstrap';

import NumberFormat from '../../I18N/Number';

class MousePositionLabelDD extends React.Component {
    static propTypes = {
        position: PropTypes.shape({
            lng: PropTypes.number,
            lat: PropTypes.number
        })
    };

    render() {
        let integerFormat = {style: "decimal", minimumIntegerDigits: 2, maximumFractionDigits: 6, minimumFractionDigits: 6};
        let lngDFormat = {style: "decimal", minimumIntegerDigits: 3, maximumFractionDigits: 6, minimumFractionDigits: 6};
        return (
            <h5>
                <Label bsSize="lg" bsStyle="info">
                    <span>Lat: </span><NumberFormat key="latD" numberParams={integerFormat} value={this.props.position.lat} />
                    <span>° Lng: </span>
                    <NumberFormat key="lngD" numberParams={lngDFormat} value={this.props.position.lng} />
                    <span>° </span>
                </Label>
            </h5>);
    }
}

export default MousePositionLabelDD;
