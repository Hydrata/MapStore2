import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {fetchScenarioOverview, showScenarioOverview, hideScenarioOverview} from '../actionsScenarios';

const scenarioOverviewPanelStyle = {
    position: "absolute",
    zIndex: 1021,
    top: "85px",
    left: "20px",
    minWidth: "760px",
    backgroundColor: "rgba(0,60,136,0.6)",
    borderColor: "rgb(255 255 255 / 70%)",
    borderWidth: "2px",
    paddingBottom: "10px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "4px",
    color: "white",
    textAlign: "right",
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "92%"
};

class ScenarioOverviewClass extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        mapId: PropTypes.number,
        fetchScenarioOverview: PropTypes.func,
        showScenarioOverview: PropTypes.func,
        hideScenarioOverview: PropTypes.func,
        scenarioOverview: PropTypes.object,
        scenarioList: PropTypes.array
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (!this.props.mapId && !this.isFetching) {
            console.log('***1');
            this.isFetching = false;
        }
        if (this.props.mapId && this.props.scenarioOverview?.slug && !(this.props.scenarioOverview?.scenario === {}) && !this.isFetching) {
            console.log('***2');
            this.props.fetchScenarioOverview(this.props.mapId, this.props.scenarioOverview?.slug);
            this.isFetching = true;
        }
        if (this.props.mapId && this.props.scenarioOverview?.slug) {
            console.log('***3');
            this.isFetching = false;
        }
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div style={scenarioOverviewPanelStyle} id={'ScenarioOverview'}>
                <div className={"row"}>
                    <h5
                        style={{textAlign: 'left'}}
                    >
                        Scenarios - {this.props.scenarioOverview.title}
                    </h5>
                </div>
                <span
                    className={"btn glyphicon glyphicon-remove"}
                    style={{
                        position: "absolute",
                        right: "0px",
                        color: "red"
                    }}
                    onClick={() => this.props.hideScenarioOverview()}
                />
                {this.props.scenarioList?.map((scen) => {
                    return (
                        <div className={'row'}>
                            <pre>{JSON.stringify(scen, null, 2) }</pre>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map,
        scenarioOverview: state?.scenarios?.scenarioOverview,
        scenarioList: state?.scenarios?.scenarioOverview?.scenarios || []
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchScenarioOverview: (mapId, slug) => dispatch(fetchScenarioOverview(mapId, slug)),
        showScenarioOverview: (slug) => dispatch(showScenarioOverview(slug)),
        hideScenarioOverview: () => dispatch(hideScenarioOverview())
    };
};

const ScenarioOverview = connect(mapStateToProps, mapDispatchToProps)(ScenarioOverviewClass);


export {
    ScenarioOverview
};
