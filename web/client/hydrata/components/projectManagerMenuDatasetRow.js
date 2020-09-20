import React from "react";
import {connect} from "react-redux";
import {changeLayerProperties} from "../../actions/layers";

const rowStyle = {
    display: "inline-block",
    verticalAlign: "middle"
};

class MenuDatasetRowClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: true
        };
    }

    render() {
        return (
            <div className={"row"}>
                <div className={"btn-group inline pull-left"} style={{...rowStyle}}>
                    <div
                        className="btn glyphicon glyphicon-envelope"
                        onClick={() => {this.props.toggleLayer(this.props.thisLayer.id, this.props.thisLayer.visibility);}}
                    />
                    <div className="btn">{this.props.dataset.layer_title}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        thisLayer: state?.layers?.flat.filter((layer) => {
            return layer?.id === props.dataset.layer;
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
