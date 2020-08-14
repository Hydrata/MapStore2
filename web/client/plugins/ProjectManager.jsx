import React, { useEffect, useState } from 'react';
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
    const [updatedProps, setupdatedProps] = useState(props);
    useEffect(() => { setupdatedProps(props); }, [props]);
    return (
        <div>
            <div style={style}>MenuTime {projection}</div>
            <div style={{...style, zIndex: 100000000000, left: 200}}>{updatedProps.projectConfig?.dataset_set[0].mapstore_menu_group.title}</div>
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
