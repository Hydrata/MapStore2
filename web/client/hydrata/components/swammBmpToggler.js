import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {changeLayerProperties} from "../../actions/layers";
import { toggleBmpType } from "../actions/swamm";

const glyphStyle = {
    background: "#ffffff",
    borderRadius: "3px",
    display: "block",
    margin: "auto",
    color: "limegreen",
    fontSize: "10px"
};

class SwammBmpTogglerClass extends React.Component {
    static propTypes = {
        bmpTypes: PropTypes.array,
        bmpType: PropTypes.object,
        bmpCode: PropTypes.string,
        toggleLayer: PropTypes.func,
        layers: PropTypes.object,
        filters: PropTypes.object,
        toggleBmpType: PropTypes.func
    };

    static defaultProps = {
        bmpCode: ''
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <button
                className={"btn glyphicon " + (this.props.bmpType?.visibility ? "glyphicon-ok" : "glyphicon-remove")}
                style={{...glyphStyle, "color": this.props.bmpType?.visibility ? "limegreen" : "red"}}
                onClick={() => this.bmpToggle(this.props.bmpCode)}
            />
        );
    }
    bmpToggle = (bmpCode) => {
        const outletLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpCode + '_outlet';})[0];
        const footprintLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpCode + '_footprint';})[0];
        const watershedLayer = this.props?.layers?.flat.filter((layer) => {return layer?.name === bmpCode + '_watershed';})[0];
        // set the global state for the BMP Type:
        this.props.toggleBmpType(this.props.bmpType, !this.props.bmpType.visibility);
        // if the BMP Type is "not visible", make sure none of it's layers are visible either:
        if (this.props.bmpType.visibility) {
            this.props.toggleLayer(outletLayer.id, false);
            this.props.toggleLayer(footprintLayer.id, false);
            this.props.toggleLayer(watershedLayer.id, false);
        // otherwise, set the layer visibility based on the filters:
        } else {
            this.props.filters.showOutlets ? this.props.toggleLayer(outletLayer.id, true) : this.props.toggleLayer(outletLayer.id, false);
            this.props.filters.showFootprints ? this.props.toggleLayer(footprintLayer.id, true) : this.props.toggleLayer(footprintLayer.id, false);
            this.props.filters.showWatersheds ? this.props.toggleLayer(watershedLayer.id, true) : this.props.toggleLayer(watershedLayer.id, false);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        layers: state?.layers,
        bmpTypes: state?.swamm?.bmpTypes,
        bmpType: state?.swamm?.bmpTypes?.filter((item) => item.code === ownProps.bmpCode)[0],
        filters: {
            showOutlets: state.swamm?.showOutlets,
            showFootprints: state.swamm?.showFootprints,
            showWatersheds: state.swamm?.showWatersheds
        }
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        toggleLayer: (layer, isVisible) => dispatch(changeLayerProperties(layer, {visibility: isVisible})),
        toggleBmpType: (bmpType, isVisible) => dispatch(toggleBmpType(bmpType, {visibility: isVisible}))
    };
};

const SwammBmpToggler = connect(mapStateToProps, mapDispatchToProps)(SwammBmpTogglerClass);


export {
    SwammBmpToggler
};
