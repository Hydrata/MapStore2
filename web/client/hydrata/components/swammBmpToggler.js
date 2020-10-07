import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {changeLayerProperties} from "../../actions/layers";

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
        bmpCode: PropTypes.string
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
                className={"btn btn-sm glyphicon " + (this.props.bmpCode ? "glyphicon-ok" : "glyphicon-remove")}
                style={{...glyphStyle, "color": this.props.bmpCode ? "limegreen" : "red"}}
                onClick={() => {console.log(this.props.bmpCode);}}
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        thisLayer: state?.layers?.flat.filter((layer) => {
            return layer?.id === props.dataset?.layer;
        })[0]
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        toggleLayer: (layer, isVisible) => dispatch(changeLayerProperties(layer, {visibility: !isVisible}))
    };
};

const SwammBmpToggler = connect(mapStateToProps, mapDispatchToProps)(SwammBmpTogglerClass);


export {
    SwammBmpToggler
};
