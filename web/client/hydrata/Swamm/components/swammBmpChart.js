import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {Modal, Button, Table, ControlLabel, FormControl, FormGroup, Form, Col} from "react-bootstrap";
import ReactDataGrid from 'react-data-grid';
import Recharts from 'recharts';
import { Toolbar, Data, Filters } from "react-data-grid-addons";
import {formatMoney} from '../../Utils/utils';
import {hideSwammBmpChart} from "../actionsSwamm";
const {
    NumericFilter,
    AutoCompleteFilter,
    MultiSelectFilter,
    SingleSelectFilter
} = Filters;
// const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
const {Cell, LineChart, BarChart, RadialBarChart, RadialBar, PolarAngleAxis, PolarRadiusAxis, Line, Bar,
    PieChart, Pie, ResponsiveContainer,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend} = require('recharts');
const data = [
    {id: '2', watershed: '1000', status: 'Proposed', type: 'Wetland', org: 'IEPA', n_red: 440, p_red: 2400, s_red: 0},
    {id: '23', watershed: '2000', status: 'Proposed', type: 'Wascb', org: 'IEPA', n_red: 1234, p_red: 2400, s_red: 7831},
    {id: '3', watershed: '2000', status: 'Operational', type: 'Filter Strips', org: 'IEPA', n_red: 4000, p_red: 2400, s_red: 4000},
    {id: '4', watershed: '2000', status: 'Operational', type: 'Wetland', org: 'IEPA', n_red: 7831, p_red: 0, s_red: 2400},
    {id: '5', watershed: '1000', status: 'Operational', type: 'Wetland', org: 'IEPA', n_red: 4536, p_red: 2400, s_red: 0},
    {id: '6', watershed: '1000', status: 'Decomissioned', type: 'Wascb', org: 'Northwater', n_red: 4221, p_red: 7831, s_red: 222},
    {id: '7', watershed: '3000', status: 'Decomissioned', type: 'Wascb', org: 'Northwater', n_red: 0, p_red: 2400, s_red: 122},
    {id: '8', watershed: '3000', status: 'Proposed', type: 'Filter Strips', org: 'Northwater', n_red: 6879, p_red: 4000, s_red: 2221},
    {id: '9', watershed: '3000', status: 'Proposed', type: 'Filter Strips', org: 'Northwater', n_red: 4533, p_red: 3667, s_red: 7866}
];
const data3 = [{
    '2': {id: '2', watershed: '1000', status: 'Proposed', type: 'Wetland', org: 'IEPA', n_red: 440, p_red: 2400, s_red: 0},
    '23': {id: '23', watershed: '2000', status: 'Proposed', type: 'Wascb', org: 'IEPA', n_red: 1234, p_red: 2400, s_red: 7831},
    '3': {id: '3', watershed: '2000', status: 'Operational', type: 'Filter Strips', org: 'IEPA', n_red: 4000, p_red: 2400, s_red: 4000},
    '4': {id: '4', watershed: '2000', status: 'Operational', type: 'Wetland', org: 'IEPA', n_red: 7831, p_red: 0, s_red: 2400},
    '5': {id: '5', watershed: '1000', status: 'Operational', type: 'Wetland', org: 'IEPA', n_red: 4536, p_red: 2400, s_red: 0},
    '6': {id: '6', watershed: '1000', status: 'Decomissioned', type: 'Wascb', org: 'Northwater', n_red: 4221, p_red: 7831, s_red: 222},
    '7': {id: '7', watershed: '3000', status: 'Decomissioned', type: 'Wascb', org: 'Northwater', n_red: 0, p_red: 2400, s_red: 122},
    '8': {id: '8', watershed: '3000', status: 'Proposed', type: 'Filter Strips', org: 'Northwater', n_red: 6879, p_red: 4000, s_red: 2221},
    '9': {id: '9', watershed: '3000', status: 'Proposed', type: 'Filter Strips', org: 'Northwater', n_red: 4533, p_red: 3667, s_red: 7866}
}];
const circleData = [
    { name: 'done', value: 55 },
    { name: 'warning', value: 5 },
    { name: 'todo', value: 40 }
];

const colourMap = {
    "Wetland": "#155481",
    "Filter Strips": "#385980",
    "Wascb": "#25215e",
    "other1": "#3283ba",
    "other2": "#196dac",
    "other3": "#97b3c3"
};

const circleSize = 200;

class SwammBmpChartClass extends React.Component {
    static propTypes = {
        hideSwammBmpChart: PropTypes.func,
        allBmps: PropTypes.array
    };

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {};
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <Modal
                show
                onHide={() => console.log('onHide')}
                style={{
                    marginTop: "100px",
                    minWidth: "800px"
                }}
                dialogClassName="swamm-big-modal"
            >
                <Modal.Header>
                    <Modal.Title style={{ textAlign: "center" }}>
                        Management Dashboard
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        ['Nitrogen', 'Phosphorus', 'Sediment'].map(name => {
                            return (
                                <div className={"container"}>
                                    <Col sm={3}>
                                        <h4 style={{ textAlign: "left" }}>
                                            {name} Progress
                                        </h4>
                                        <div style={{ width: '100%', height: 200 }}>
                                            <ResponsiveContainer>
                                                <PieChart
                                                    key={'asdf'}
                                                    width={400}
                                                    height={400}
                                                >
                                                    <Pie
                                                        data={circleData}
                                                        dataKey="value"
                                                        cx={circleSize / 2}
                                                        cy={circleSize / 2}
                                                        innerRadius={70}
                                                        outerRadius={90}
                                                        fill="#82ca9d"
                                                        startAngle={180}
                                                        endAngle={0}
                                                    >
                                                        <Cell fill={"#25215e"} cornerRadius={5}/>
                                                        <Cell fill={"#155481"} cornerRadius={5}/>
                                                        <Cell fill={"#97b3c3"} cornerRadius={5}/>
                                                    </Pie>
                                                    <text
                                                        x={circleSize / 2}
                                                        y={circleSize / 2}
                                                        textAnchor="middle"
                                                        fontSize={30}
                                                        dominantBaseline="middle"
                                                        className="progress-label"
                                                    >
                                                        {circleData[0].value}%
                                                    </text>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Col>
                                    <Col sm={8}>
                                        <h4 style={{ textAlign: "center" }}>
                                            { name } Load Reduction Totals
                                        </h4>
                                        <div style={{ width: '100%', height: 150 }}>
                                            <ResponsiveContainer>
                                                <BarChart
                                                    width={600}
                                                    height={150}
                                                    data={data3}
                                                    margin={{top: 10, right: 0, left: 0, bottom: 10}}
                                                    layout="vertical"
                                                    maxBarSize={150}
                                                >
                                                    <XAxis type="number" />
                                                    <YAxis type="category" hide/>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false}/>
                                                    <Tooltip content={
                                                        <CustomTooltip/>
                                                    }/>
                                                    {data.map(obj => {
                                                        return (
                                                            <Bar
                                                                key={obj.id}
                                                                stackId="n"
                                                                dataKey={(obj.id + ".n_red")}
                                                                fill={colourMap[obj.type]}
                                                            />
                                                        );
                                                    })}
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Col>
                                </div>
                            );
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle="danger"
                        bsSize="small"
                        style={{opacity: "0.7"}}
                        onClick={() => this.props.hideSwammBmpChart()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    handleChange(event) {
        console.log('handleChange', event);
    }
}

class CustomTooltip extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        payload: PropTypes.array,
        label: PropTypes.string,
        active: PropTypes.bool
    }

    render() {
        const { active } = this.props;
        if (active) {
            const { payload, label } = this.props;
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label} : ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map,
        allBmps: state?.swamm?.allBmps
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        hideSwammBmpChart: () => dispatch(hideSwammBmpChart())
    };
};

const SwammBmpChart = connect(mapStateToProps, mapDispatchToProps)(SwammBmpChartClass);


export {
    SwammBmpChart
};
