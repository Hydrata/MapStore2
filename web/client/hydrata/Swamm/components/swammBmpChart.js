import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {Modal, Button,  Col } from "react-bootstrap";
import {formatMoney} from "../../Utils/utils";
import {hideSwammBmpChart} from "../actionsSwamm";
import {bmpDashboardDataSelector, bmpSpeedDialSelector} from "../selectorsSwamm";
const {Cell, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip} = require('recharts');


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
        allBmps: PropTypes.array,
        bmpDashboardDataSelector: PropTypes.func,
        bmpSpeedDialSelector: PropTypes.func,
        dashboardData: PropTypes.array,
        speedDialData: PropTypes.object,
        data: PropTypes.array
    };

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        console.log('speedDialData', this.props.speedDialData);
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
                    <Modal.Title style={{textAlign: "center"}}>
                        <h2>Management Dashboard</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.pollutants.map(pollutant => {
                            return (
                                <div className={"container"} key={pollutant.name + "-dashboard"}>
                                    <Col sm={3}>
                                        <h4 style={{textAlign: "left", justify: "center"}}>
                                            {pollutant.name} Reduction<br/>Progress
                                        </h4>
                                        <div style={{width: '100%', height: 200}}>
                                            <ResponsiveContainer>
                                                <PieChart
                                                    key={'asdf'}
                                                    width={400}
                                                    height={400}
                                                >
                                                    <Pie
                                                        data={this.props.speedDialData[`percent${pollutant.name}Target`]}
                                                        dataKey="value"
                                                        cx={circleSize / 2}
                                                        cy={circleSize / 2}
                                                        innerRadius={70}
                                                        outerRadius={90}
                                                        fill="#82ca9d"
                                                        startAngle={180}
                                                        endAngle={0}
                                                        isAnimationActive={false}
                                                    >
                                                        <Cell fill={"#25215e"} cornerRadius={5}/>
                                                        <Cell fill={"#97b3c3"} cornerRadius={5}/>
                                                    </Pie>
                                                    <text
                                                        x={circleSize / 2}
                                                        y={circleSize / 2 - 10}
                                                        textAnchor="middle"
                                                        fontSize={30}
                                                        dominantBaseline="middle"
                                                        className="progress-label"
                                                    >
                                                        {this.props.speedDialData[`percent${pollutant.name}Target`]?.[0]?.value.toFixed(1)}%
                                                    </text>
                                                    <text
                                                        x={circleSize / 2}
                                                        y={circleSize / 2 + 20}
                                                        textAnchor="middle"
                                                        fontSize={10}
                                                        dominantBaseline="middle"
                                                        className="progress-label"
                                                    >
                                                        {formatMoney(this.props?.speedDialData[`totalBmp${pollutant.name}Reduction`], 0) + ' of ' +
                                                        formatMoney(this.props?.speedDialData[`target${pollutant.name}LoadReduction`], 0) + ' ' +
                                                        pollutant.units}
                                                    </text>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Col>
                                    <Col sm={8}>
                                        <h4 style={{textAlign: "center"}}>
                                            Current {pollutant.name} Load Reductions ({pollutant.units})
                                        </h4>
                                        <div style={{width: '100%', height: 150}}>
                                            <ResponsiveContainer>
                                                <BarChart
                                                    width={600}
                                                    height={150}
                                                    data={this.props.dashboardData}
                                                    margin={{top: 10, right: 0, left: 0, bottom: 10}}
                                                    layout="vertical"
                                                    maxBarSize={150}
                                                >
                                                    <XAxis type="number"/>
                                                    <YAxis type="category" hide/>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false}/>
                                                    <Tooltip
                                                        content={<CustomTooltip
                                                            tooltipBarId={this.state.tooltipBarId}
                                                            tooltipPollutantKey={this.state.tooltipPollutantKey}
                                                        />}
                                                    />
                                                    {Object.keys(this.props.dashboardData[0]).map(key => {
                                                        const bmp = this.props.dashboardData[0][key];
                                                        return (
                                                            <Bar
                                                                key={bmp.id}
                                                                stackId="n"
                                                                dataKey={(bmp.id + "." + pollutant.load_red_total_key)}
                                                                fill={bmp.type_data.colour + '60'}
                                                                stroke={"white"}
                                                                strokeWidth={1}
                                                                name="Name"
                                                                onMouseOver={() => {
                                                                    this.setState({
                                                                        tooltipBarId: bmp.id,
                                                                        tooltipPollutantKey: pollutant.load_red_total_key
                                                                    });
                                                                }}
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

    pollutants = [
        {
            name: 'Nitrogen',
            load_red_total_key: 'n_load_reduction',
            units: 'lbs/year'
        },
        {
            name: 'Phosphorus',
            load_red_total_key: 'p_load_reduction',
            units: 'lbs/year'
        },
        {
            name: 'Sediment',
            load_red_total_key: 's_load_reduction',
            units: 'tons/year'
        }
    ]
}

class CustomTooltipClass extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        payload: PropTypes.array,
        active: PropTypes.bool,
        tooltipBarId: PropTypes.string,
        tooltipPollutantKey: PropTypes.string,
        dashboardData: PropTypes.array
    }

    render() {
        if (this.props.active) {
            let bmp = null;
            Object.keys(this.props.dashboardData[0]).map(key => {
                const obj = this.props.dashboardData[0][key];
                if (obj.id === this.props.tooltipBarId) {
                    bmp = obj;
                }
            });
            return (
                <div className="custom-tooltip" style={{background: "black", borderRadius: "3px"}}>
                    <div className="label">{`${bmp?.type_data.name} - ID:${bmp?.id}`}</div>
                    <br/>
                    <div className="label">{formatMoney(bmp?.[this.props.tooltipPollutantKey], 0)}</div>
                </div >
            );
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map,
        allBmps: state?.swamm?.allBmps,
        dashboardData: bmpDashboardDataSelector(state) || [],
        speedDialData: bmpSpeedDialSelector(state) || []
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        hideSwammBmpChart: () => dispatch(hideSwammBmpChart())
    };
};

const SwammBmpChart = connect(mapStateToProps, mapDispatchToProps)(SwammBmpChartClass);
const CustomTooltip = connect(mapStateToProps, mapDispatchToProps)(CustomTooltipClass);


export {
    SwammBmpChart
};
