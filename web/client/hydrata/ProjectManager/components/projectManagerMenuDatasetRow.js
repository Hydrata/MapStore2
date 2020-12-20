import React from "react";
import {connect} from "react-redux";
import {changeLayerProperties} from "../../../actions/layers";
import "../projectManager.css";
const PropTypes = require('prop-types');
const Slider = require('react-nouislider');

const rowStyle = {
    borderBottom: "1px solid #ffffffad",
    paddingLeft: "5px",
    margin: 0
};

const btnGroupStyle = {
    display: "inline-block",
    verticalAlign: "middle"
};

const glyphStyle = {
    background: "#ffffff",
    borderRadius: "3px",
    margin: "5px",
    marginRight: "20px",
    color: "limegreen",
    fontSize: "10px"
};

const textStyle = {
    whiteSpace: "nowrap",
    paddingLeft: "3px"
};

class MenuDatasetRowClass extends React.Component {
    static propTypes = {
        thisLayer: PropTypes.array,
        dataset: PropTypes.array,
        toggleLayer: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isVisible: true
        };
    }

    render() {
        if (!this.props.dataset) {
            return (
                <div className={"row"} style={{...rowStyle}}>
                    <div className={"btn-group inline pull-left"} style={{...btnGroupStyle}}>
                        <div className="h5" style={textStyle}>No datasets here yet...</div>
                    </div>
                </div>
            );
        }
        return (
            <div className={"row"} style={{...rowStyle}}>
                <div className={"btn-group inline pull-left"} style={{...btnGroupStyle}}>
                    <div
                        className={"btn glyphicon " + (this.props.thisLayer?.visibility ? "glyphicon-ok" : "glyphicon-remove")}
                        style={{...glyphStyle, "color": this.props.thisLayer?.visibility ? "limegreen" : "red"}}
                        onClick={() => {this.props.toggleLayer(this.props.thisLayer?.id, this.props.thisLayer?.visibility);}}
                    />
                    <div className="h5" style={textStyle}>{this.props.dataset?.layer_title}</div>
                </div>
                <div className="mapstore-slider dataset-transparency with-tooltip">
                    <Slider
                        step={1}
                        start={[100]}
                        range={{
                            min: 0,
                            max: 100
                        }}
                        onChange={(values) => {
                            console.log('slider:  ', values);
                        }}
                    />
                </div>
            </div>
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

const MenuDatasetRow = connect(mapStateToProps, mapDispatchToProps)(MenuDatasetRowClass);


export {
    MenuDatasetRow
};
