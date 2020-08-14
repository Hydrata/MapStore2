import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createPlugin } from '../utils/PluginsUtils';

import { projectionSelector } from '../selectors/map';
import { getProjectConfig } from '../actions/projectManager';
import projectManager from '../reducers/projectManager';

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

const MenuButton = (props) => {
    const {projection} = props;
    useEffect(() => { props.getProjectConfig(13); }, []);
    return (
        <div>
            <div style={style}>MenuTime {projection}</div>
            <hr />
            <button style={style} onClick={() => props.getProjectConfig(13)}>Get Project Config</button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        projection: projectionSelector(state),
        projectConfig: state.projectManager.projectConfig,
        getProjectConfig: state.getProjectConfig
    };
};

const ProjectManager = connect(mapStateToProps, {
    getProjectConfig: getProjectConfig
})(MenuButton);

export default createPlugin('ProjectManager', {
    component: ProjectManager,
    reducers: {
        projectManager
    }
});
