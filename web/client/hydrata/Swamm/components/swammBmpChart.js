import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {Modal, Button,  Col, Grid, Row } from "react-bootstrap";
import {formatMoney} from "../../Utils/utils";
import {SwammStatusFilter} from "./swammStatusFilter";
import {hideSwammBmpChart} from "../actionsSwamm";
import {bmpDashboardDataSelector, bmpSpeedDialSelector} from "../selectorsSwamm";
const {Cell, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip} = require('recharts');
import Legend from "../../../components/TOC/fragments/legend/Legend";

const circleSize = 150;

class SwammBmpChartClass extends React.Component {
    static propTypes = {
        hideSwammBmpChart: PropTypes.func,
        allBmps: PropTypes.array,
        bmpDashboardDataSelector: PropTypes.func,
        bmpSpeedDialSelector: PropTypes.func,
        dashboardData: PropTypes.array,
        speedDialData: PropTypes.object,
        data: PropTypes.array,
        layerForLegend: PropTypes.object
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
                    marginTop: "50px",
                    width: "100%"
                }}
                dialogClassName="swamm-big-modal"
            >
                <Modal.Header>
                    <Modal.Title style={{textAlign: "center"}}>
                        <h4 style={{padding: "0", margin: "0"}}>Total Operational BMPs</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{padding: "0", margin: "0"}}>
                    <Grid>
                        <Row>
                            <Col sm={10}>
                                {
                                    this.pollutants.map(pollutant => {
                                        return (
                                            <Row
                                                className={"container well"}
                                                style={{padding: 0}}
                                                key={pollutant.name + "-dashboard"}
                                            >
                                                <Col sm={3}>
                                                    <h4 style={{fontSize: "16px"}}>
                                                        {pollutant.name} Reduction Progress
                                                    </h4>
                                                    <div style={{width: '100%', height: circleSize / 1.2}}>
                                                        <ResponsiveContainer>
                                                            <PieChart
                                                                key={'asdf'}
                                                                width={circleSize * 1.5}
                                                                height={circleSize}
                                                            >
                                                                <Pie
                                                                    data={this.props.speedDialData[`percent${pollutant.name}Target`]}
                                                                    dataKey="value"
                                                                    cx={circleSize / 1.3}
                                                                    cy={circleSize / 2}
                                                                    innerRadius={circleSize / 3}
                                                                    outerRadius={circleSize / 2}
                                                                    fill="#82ca9d"
                                                                    startAngle={180}
                                                                    endAngle={0}
                                                                    isAnimationActive={false}
                                                                >
                                                                    <Cell fill={"#25215e"} cornerRadius={5}/>
                                                                    <Cell fill={"#97b3c3"} cornerRadius={5}/>
                                                                </Pie>
                                                                <text
                                                                    x={circleSize / 1.3}
                                                                    y={circleSize / 2 - 10}
                                                                    textAnchor="middle"
                                                                    fontSize={circleSize / 5}
                                                                    dominantBaseline="middle"
                                                                    className="progress-label"
                                                                >
                                                                    {this.props.speedDialData[`percent${pollutant.name}Target`]?.[0]?.value.toFixed(1)}%
                                                                </text>
                                                                <text
                                                                    x={circleSize / 1.3}
                                                                    y={circleSize / 2 + 20}
                                                                    textAnchor="middle"
                                                                    fontSize={circleSize / 10}
                                                                    dominantBaseline="middle"
                                                                    className="progress-label"
                                                                >
                                                                    Progress: {formatMoney(this.props?.speedDialData[`totalBmp${pollutant.name}Reduction`], 0) + ' ' +
                                                                    pollutant.units}
                                                                </text>
                                                                <text
                                                                    x={circleSize / 1.3}
                                                                    y={circleSize / 2 + 40}
                                                                    textAnchor="middle"
                                                                    fontSize={circleSize / 10}
                                                                    dominantBaseline="middle"
                                                                    className="progress-label"
                                                                >
                                                                    Target: {formatMoney(this.props?.speedDialData[`target${pollutant.name}LoadReduction`], 0) + ' ' +
                                                                    pollutant.units}
                                                                </text>
                                                            </PieChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </Col>
                                                <Col sm={7}>

                                                    <h4 style={{textAlign: "center"}}>
                                                        Current {pollutant.name} Load Reductions ({pollutant.units})
                                                    </h4>
                                                    <div style={{width: '100%', height: 100}}>
                                                        <ResponsiveContainer>
                                                            <BarChart
                                                                width={600}
                                                                height={100}
                                                                data={this.props.dashboardData}
                                                                margin={{top: 10, right: 0, left: 0, bottom: 10}}
                                                                layout="vertical"
                                                                maxBarSize={100}
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
                                                                {Object.keys(this.props.dashboardData[0])
                                                                    .sort((keyA, keyB) => this.props.dashboardData[0][keyA]?.type - this.props.dashboardData[0][keyB]?.type)
                                                                    .map(key => {
                                                                        const bmp = this.props.dashboardData[0][key];
                                                                        return (
                                                                            <Bar
                                                                                key={bmp.id}
                                                                                stackId="n"
                                                                                dataKey={(bmp.id + "." + pollutant.load_red_total_key)}
                                                                                fill={bmp.type_data.colour}
                                                                                stroke={"white"}
                                                                                strokeWidth={0}
                                                                                name="Name"
                                                                                onMouseOver={() => {
                                                                                    this.setState({
                                                                                        tooltipBarId: bmp.id,
                                                                                        tooltipPollutantKey: pollutant.load_red_total_key
                                                                                    });
                                                                                }}
                                                                            />
                                                                        );
                                                                    })
                                                                }
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </Col>
                                            </Row>
                                        );
                                    })
                                }
                            </Col>
                            <Col sm={2}>
                                <Legend
                                    layer={this.props.layerForLegend}
                                    legendHeight={20}
                                    legendWidth={20}
                                    legendOptions={"dpi:300"}
                                    style={{
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        maxHeight: "auto",
                                        maxWidth: "100%"
                                    }}
                                />
                            </Col>
                        </Row>
                    </Grid>
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
            name: 'Phosphorus',
            load_red_total_key: 'p_load_reduction',
            units: 'lbs/year'
        },
        {
            name: 'Nitrogen',
            load_red_total_key: 'n_load_reduction',
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
        tooltipBarId: PropTypes.number,
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
    const projectCode = state?.projectManager?.data?.code;
    const legendLayerName = projectCode + '_bmp_footprint';
    return {
        mapId: state?.projectManager?.data?.base_map,
        layerForLegend: state?.layers?.flat?.filter((layer) => layer.name === legendLayerName)[0],
        allBmps: state?.swamm?.allBmps,
        dashboardData: bmpDashboardDataSelector(state) || [],
        speedDialData: bmpSpeedDialSelector(state) || [],
        statuses: state?.swamm?.statuses || []
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
