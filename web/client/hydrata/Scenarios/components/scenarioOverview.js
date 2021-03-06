import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import { Table, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import {fetchScenarioOverview, showScenarioOverview, hideScenarioOverview} from '../actionsScenarios';
import '../scenarios.css';

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

const formControlStyle = {
    border: 'none',
    textAlign: 'center',
    background: 'none',
    color: 'white'
};

class ScenarioOverviewClass extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        mapId: PropTypes.number,
        fetchScenarioOverview: PropTypes.func,
        showScenarioOverview: PropTypes.func,
        hideScenarioOverview: PropTypes.func,
        scenarioOverview: PropTypes.object,
        scenarioList: PropTypes.array,
        fields: PropTypes.array
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.mapId && !this.isFetching) {
            this.isFetching = false;
        }
        if (this.props.mapId && this.props.scenarioOverview?.slug && !(this.props.scenarioOverview?.scenario === {}) && !this.isFetching) {
            this.props.fetchScenarioOverview(this.props.mapId, this.props.scenarioOverview?.slug);
            this.isFetching = true;
        }
        if (this.props.mapId && this.props.scenarioOverview?.slug) {
            this.isFetching = false;
        }
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div style={scenarioOverviewPanelStyle} id={'ScenarioOverview'} className={'container'}>
                <div className={"row"}>
                    <h5
                        style={{textAlign: 'left', marginLeft: '10px'}}
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
                <div className={'scenario-table'}>
                    <div className={'scenario-table-header-group'}>
                        <div className={'scenario-table-row'}>
                            {this.props?.fields?.filter((field) => field.widget !== 'resultButton').map((field) => {
                                return (
                                    <div className={'scenario-table-cell'} key={field.name}>
                                        {field.label}
                                    </div>);
                            })}
                            <div className={'scenario-table-cell'}>Save</div>
                            <div className={'scenario-table-cell'}>Run</div>
                            {this.props?.fields?.filter((field) => field.widget === 'resultButton').map((field) => {
                                return (
                                    <div className={'scenario-table-cell'} key={field.name}>
                                        {field.label}
                                    </div>);
                            })}
                        </div>
                    </div>
                    {this.props.scenarioList?.map((scen) => {
                        return (
                            <div className={'scenario-table-row'}>
                                {this.props?.fields?.filter((field) => field.widget !== 'resultButton')
                                    .map((field) => {
                                        return (
                                            <div className={'scenario-table-cell'}>
                                                <input
                                                    key={field.name}
                                                    style={formControlStyle}
                                                    type={field.widget}
                                                    value={this.props.scenarioList.filter((scenToCheck) => scen === scenToCheck)[0][field.name]}
                                                    onChange={(e) => this.handleChange(e, scen)}
                                                />
                                            </div>
                                        );
                                    })}
                                <div className={'scenario-button scenario-table-cell'}>
                                    <Button
                                        bsStyle="success"
                                        bsSize="xsmall"
                                        onClick={() => console.log('save')}
                                        style={{'borderRadius': '3px'}}
                                    >
                                        Save
                                    </Button>
                                </div>
                                <div className={'scenario-button scenario-table-cell'}>
                                    <Button
                                        bsStyle="success"
                                        bsSize="xsmall"
                                        onClick={() => console.log('run')}
                                        style={{'borderRadius': '3px'}}
                                    >
                                        Run
                                    </Button>
                                </div>
                                {this.props?.fields?.filter((field) => field.widget === 'resultButton')
                                    .map((field) => {
                                        return (
                                            <div className={'scenario-table-cell'}>
                                                <input
                                                    key={field.name}
                                                    style={formControlStyle}
                                                    type={field.widget}
                                                    value={this.props.scenarioList.filter((scenToCheck) => scen === scenToCheck)[0][field.name]}
                                                    onChange={(e) => this.handleChange(e, scen)}
                                                />
                                            </div>);
                                    })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    handleChange = (e, scenario) => {
        console.log('changeme:', scenario);
        console.log('value', e.target.value);
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map,
        scenarioOverview: state?.scenarios?.scenarioOverview,
        scenarioList: state?.scenarios?.scenarioOverview?.scenarios || [],
        fields: state?.scenarios?.config?.filter((scen) => state?.scenarios?.scenarioOverview?.slug === scen.slug)[0]?.fields
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
