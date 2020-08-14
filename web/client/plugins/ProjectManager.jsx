import React from 'react';
import { connect } from 'react-redux';
import { createPlugin } from '../utils/PluginsUtils';
// import { changeZoomLevel } from '../../MapStore2/web/client/actions/map';
import { projectionSelector } from '../selectors/map';
import { projectDetails } from '../../../../../../geonode_mapstore_client/client/js/api';

const style = {
    position: "absolute",
    background: "blue",
    opacity: 50,
    zIndex: 1000000,
    top: 10,
    left: 10,
    minWidth: "115px",
    backgroundColor: "rgba(0,60,136,0.5)",
    borderColor: "#97b3cd",
    padding: "5px 10px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "3px",
    color: "white",
    textAlign: "center"
};

// const MenuBar = (props) =

const MenuButton = (props) => {
    const {projection} = props;
    return (
        <div style={style}>MenuTime {projection}</div>
    );
};

const mapStateToProps = state => {
    return {
        projection: projectionSelector(state)
    };
};

const ProjectManager = connect(
    mapStateToProps
)(MenuButton);

export default createPlugin('ProjectManager', {
    component: ProjectManager
});
