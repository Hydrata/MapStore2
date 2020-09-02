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
    zIndex: 1021,
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
    // const {projection} = props;
    if (props.mapId) {
        useEffect(() => {
            props.getProjectConfig(props.mapId);
        }, []);
    } else {
        useEffect(() => {
            props.getProjectConfig(props.mapId);
        });
    }
    const [updatedProps, setupdatedProps] = useState(props);
    useEffect(() => {
        setupdatedProps(props);
    }, [props]);
    const buttons = updatedProps.projectConfig?.mapstoremenugroup_set.map(
            (item, index) => {
                const spacing = index * 130 + 20;
                return <button style={{...style, left: spacing }} key={ item?.id }>{ item?.title }</button>;
            });
    return (
        <span id="project-manager">
            {buttons}
        </span>
    );
};

const mapStateToProps = state => {
    return {
        mapId: state.map.present.mapId,
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
