import React from 'react';
import { connect } from 'react-redux';
const PropTypes = require('prop-types');
const {mapIdSelector} = require('../../selectors/map');
import { fetchProjectManagerConfig } from "../actions/projectManager";
import { MenuPanel, MenuButtonList } from "./projectManagerMenus";

// eslint-disable-next-line camelcase
const menuGroupsSelector = (state) => state?.projectManager?.data?.mapstoremenugroup_set || [];

class ProjectManagerContainer extends React.Component {
    static propTypes = {
        fetchProjectManagerConfig: PropTypes.func,
        menuGroups: PropTypes.array,
        mapId: PropTypes.number,
        layers: PropTypes.array,
        projectTitle: PropTypes.string,
        isFetching: PropTypes.bool,
        hasPmData: PropTypes.object
    };

    static defaultProps = {
        fetchProjectManagerConfig: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            mapId: null,
            projectTitle: null,
            projectManager: {
                fetching: null,
                data: {
                    mapstoremenugroup_set: [
                        {
                            title: 'default'
                        }
                    ]
                }
            },
            openMenuGroup: null
        };
    }

    componentDidUpdate() {
        if (!this.props.mapId && !this.fetching) {
            this.fetching = false;
        }
        if (this.props.mapId && !this.props.hasPmData && !this.fetching) {
            this.props.fetchProjectManagerConfig(this.props.mapId);
            this.fetching = true;
        }
        if (this.props.mapId && this.props.hasPmData) {
            this.fetching = false;
        }
    }

    render() {
        return (
            <div style={{position: "absolute"}} id={"project-manager"}>
                <MenuButtonList menuGroups={this.props.menuGroups}/>
                { this.props.openMenuGroup ? <MenuPanel menuGroup={this.props.openMenuGroup}/> : null }
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        mapId: mapIdSelector(state),
        layers: state?.layers?.flat.map(layer => layer.name),
        // eslint-disable-next-line camelcase
        menuGroups: menuGroupsSelector(state),
        projectTitle: state?.projectManager?.data?.title,
        isFetching: state?.projectManager?.fetching,
        hasPmData: state?.projectManager?.data,
        openMenuGroup: state?.projectManager?.openMenuGroup
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchProjectManagerConfig: fetchProjectManagerConfig(dispatch)
    };
};

const ConnectedProjectManagerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectManagerContainer);

export default ConnectedProjectManagerContainer;
