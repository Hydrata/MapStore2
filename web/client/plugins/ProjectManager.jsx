import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createPlugin } from '../utils/PluginsUtils';

import { projectionSelector } from '../selectors/map';
const {mapIdSelector} = require('../selectors/map');
import { getProjectConfig } from '../actions/projectManager';
import projectManager from '../reducers/projectManager';
// const projectConfigSelector = (state) => state.projectManager || state.projectManager.projectConfig || null;

const buttonStyle = {
    position: "absolute",
    zIndex: 1021,
    top: 10,
    minWidth: "115px",
    backgroundColor: "rgba(0,60,136,0.5)",
    borderColor: "rgb(255 255 255 / 70%)",
    borderWidth: "2px",
    padding: "5px 10px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "4px",
    color: "white",
    textAlign: "center"
};

const panelStyle = {
    position: "absolute",
    zIndex: 1021,
    top: "50px",
    minWidth: "400px",
    backgroundColor: "rgba(0,60,136,0.8)",
    borderColor: "rgb(255 255 255 / 70%)",
    borderWidth: "2px",
    padding: "5px 10px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "4px",
    color: "white",
    textAlign: "center"
};

const ProjectManagerMenu = (props) => {
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
                return (
                    <button
                        key={ item?.id }
                        className="btn"
                        data-toggle="collapse"
                        data-target={ "#" + item?.id }
                        style={{...buttonStyle, left: spacing }}
                        data-parent="#project-manager"
                    >{ item?.title }
                    </button>
                );
            });
    const cards = updatedProps.projectConfig?.mapstoremenugroup_set.map(
            (item, index) => {
                const spacing = index * 80 + 200;
                const cardDisplay = "None";
                return (
                    <div
                        key={ item?.id }
                        style={{...panelStyle, top: spacing, display: cardDisplay}}
                        className="collapse"
                        id={ item?.id }>
                            test { item?.title }
                    </div>

                );
            });
    return (
        <span id="project-manager">
            {buttons}
            <div className="accordion-group">
                {cards}
            </div>
        </span>
    );
};

// class ProjectManager2 extends React.Component {
//     constructor(props) {
//         super(props);
//     }
// }

const mapStateToProps = state => {
    return {
        mapId: mapIdSelector(state),
        projection: projectionSelector(state),
        projectConfig: state.projectManager.projectConfig,
        getProjectConfig: state.getProjectConfig
    };
};

const ProjectManager = connect(mapStateToProps, {
    getProjectConfig: getProjectConfig
})(ProjectManagerMenu);

// const ProjectManager = connect((state) => ({
//     // active: state.controls && state.controls.drawer && state.controls.drawer.active,
//     // disabled: state.controls && state.controls.drawer && state.controls.drawer.disabled,
//     mapId: mapIdSelector(state),
//     projection: projectionSelector(state),
//     projectConfig: state.projectManager.projectConfig,
//     getProjectConfig: state.getProjectConfig
// }), {
//     // toggleMenu: toggleControl.bind(null, 'drawer', null)
// })(ProjectManagerMenu);

export default createPlugin('ProjectManager', {
    component: ProjectManager,
    reducers: {
        projectManager
    }
});
