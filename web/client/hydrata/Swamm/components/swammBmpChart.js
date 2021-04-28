import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {Modal, Button, Col, Grid, Row, Table} from "react-bootstrap";
import {formatMoney} from "../../Utils/utils";
import {hideSwammBmpChart, selectSwammTargetId} from "../actionsSwamm";
import {bmpDashboardDataSelector, bmpSpeedDialSelector} from "../selectorsSwamm";
const {Cell, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip} = require('recharts');
import Legend from "../../../components/TOC/fragments/legend/Legend";
import '../swamm.css';

const circleSize = 100;

class SwammBmpChartClass extends React.Component {
    static propTypes = {
        hideSwammBmpChart: PropTypes.func,
        allBmps: PropTypes.array,
        bmpDashboardDataSelector: PropTypes.func,
        bmpSpeedDialSelector: PropTypes.func,
        dashboardData: PropTypes.array,
        speedDialData: PropTypes.object,
        data: PropTypes.array,
        layerForLegend: PropTypes.object,
        targets: PropTypes.array,
        selectSwammTargetId: PropTypes.func,
        selectedTargetId: PropTypes.number,
        selectedTarget: PropTypes.object
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
                        <h4 style={{padding: "0", margin: "0"}}>Pollutant Reductions - {this.props.selectedTarget?.name}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Grid>
                        <Col sm={2} className={'well'} style={{paddingTop: "0"}}>
                            <h4 style={{paddingTop: "5px", paddingBottom: "10px", margin: "0", textAlign: "center", fontSize: "14px"}}>Targets</h4>
                            {this.props.targets.map((target) => {
                                return (
                                    <div className={'row-no-gutters'}>
                                        <Button
                                            bsStyle="success"
                                            bsSize="xsmall"
                                            block
                                            style={{opacity: "0.7", marginTop: "4px", fontSize: "x-small"}}
                                            onClick={() => this.props.selectSwammTargetId(target?.id)}>
                                            {target?.name}
                                        </Button>
                                    </div>);
                            })}
                            <div className={'row-no-gutters'}>
                                <Button
                                    bsStyle="info"
                                    bsSize="xsmall"
                                    block
                                    style={{marginTop: "4px", fontSize: "x-small"}}
                                    onClick={() => window.alert('New Target Form not yet implemented.')}>
                                    New Target
                                </Button>
                            </div>
                        </Col>
                        <Col sm={8} style={{marginLeft: 20, marginRight: -20}}>
                            {
                                this.pollutants.map(pollutant => {
                                    return (
                                        <Row
                                            className={"well"}
                                            key={pollutant.name + "-dashboard"}
                                        >
                                            <Col sm={3} style={{padding: 0}}>
                                                <h4 style={{textAlign: "center", fontSize: "14px", paddingLeft: "5px", paddingTop: "5px", paddingBottom: "10px", margin: 0}}>
                                                    {pollutant.name}
                                                </h4>
                                                <div style={{width: circleSize * 1.5, height: circleSize / 1.2}}>
                                                    <ResponsiveContainer>
                                                        <PieChart
                                                            key={'asdf'}
                                                            width={circleSize * 1.5}
                                                            height={circleSize * 1.5}
                                                            style={{paddingTop: "10px"}}
                                                        >
                                                            <Pie
                                                                data={this.props.speedDialData[`percent${pollutant.name}Target`]}
                                                                dataKey="value"
                                                                cx={circleSize / 1.3 - 10}
                                                                cy={circleSize / 2}
                                                                innerRadius={circleSize / 3}
                                                                outerRadius={circleSize / 2}
                                                                fill="#82ca9d"
                                                                startAngle={180}
                                                                endAngle={0}
                                                                isAnimationActive={false}
                                                            >
                                                                <Cell fill={"#27ca3b"} cornerRadius={5}/>
                                                                <Cell fill={"#97b3c3"} cornerRadius={1}/>
                                                            </Pie>
                                                            <text
                                                                x={circleSize / 1.3 - 10}
                                                                y={circleSize / 2 - 5}
                                                                textAnchor="middle"
                                                                fontSize={circleSize / 5}
                                                                dominantBaseline="middle"
                                                                className="progress-label"
                                                            >
                                                                {this.props.speedDialData[`percent${pollutant.name}Target`]?.[0]?.value.toFixed(1)}%
                                                            </text>
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </Col>
                                            <Col sm={8}>
                                                <h4 style={{textAlign: "center", fontSize: "14px", paddingTop: "5px", paddingBottom: "10px", margin: 0}}>
                                                    Load reduction composition ({pollutant.units})
                                                </h4>
                                                <div style={{width: '100%', height: 100}}>
                                                    <ResponsiveContainer>
                                                        <BarChart
                                                            width={600}
                                                            height={80}
                                                            data={this.props.dashboardData}
                                                            margin={{top: 0, right: 0, left: 10, bottom: 10}}
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
                            <Row>
                                <Table bordered condensed hover className={"text-right"}>
                                    <thead>
                                        <tr>
                                            <th>Summary</th>
                                            <th style={{'textAlign': 'center'}}>Phosphorus</th>
                                            <th style={{'textAlign': 'center'}}>Nitrogen</th>
                                            <th style={{'textAlign': 'center'}}>Sediment</th>
                                            <th/>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Current total untreated pollutant volume: </td>
                                            <td>{this.props.selectedTarget?.total_current_n_loading}</td>
                                            <td>{this.props.selectedTarget?.total_current_p_loading}</td>
                                            <td>{this.props.selectedTarget?.total_current_s_loading}</td>
                                            <td className={"text-left"}>units/year</td>
                                        </tr>
                                        <tr>
                                            <td>Selected target reduction percentage:</td>
                                            <td>{this.props.selectedTarget?.target_percent_n_reduction * 100}</td>
                                            <td>{this.props.selectedTarget?.target_percent_p_reduction * 100}</td>
                                            <td>{this.props.selectedTarget?.target_percent_s_reduction * 100}</td>
                                            <td className={"text-left"}>% of total</td>
                                        </tr>
                                        <tr>
                                            <td>Selected target load reduction required:</td>
                                            <td>{(this.props.selectedTarget?.total_current_n_loading * this.props.selectedTarget?.target_percent_n_reduction)?.toFixed(0)}</td>
                                            <td>{(this.props.selectedTarget?.total_current_p_loading * this.props.selectedTarget?.target_percent_p_reduction)?.toFixed(0)}</td>
                                            <td>{(this.props.selectedTarget?.total_current_s_loading * this.props.selectedTarget?.target_percent_s_reduction)?.toFixed(0)}</td>
                                            <td className={"text-left"}>units/year</td>
                                        </tr>
                                        <tr>
                                            <td>Actual pollutant reduction from BMPs:</td>
                                            <td>{this.props.speedDialData?.totalBmpNitrogenReduction?.toFixed(0)}</td>
                                            <td>{this.props.speedDialData?.totalBmpPhosphorusReduction?.toFixed(0)}</td>
                                            <td>{this.props.speedDialData?.totalBmpSedimentReduction?.toFixed(0)}</td>
                                            <td className={"text-left"}>units/year</td>
                                        </tr>
                                        <tr>
                                            <td>Percentage of target achieved: </td>
                                            <td>{this.props.speedDialData?.percentNitrogenTarget?.[0]?.value?.toFixed(1)}</td>
                                            <td>{this.props.speedDialData?.percentPhosphorusTarget?.[0]?.value?.toFixed(1)}</td>
                                            <td>{this.props.speedDialData?.percentSedimentTarget?.[0]?.value?.toFixed(1)}</td>
                                            <td className={"text-left"}>%</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Row>
                        </Col>
                        <Col sm={2} style={{marginLeft: 20, marginRight: -20}}>
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
        statuses: state?.swamm?.statuses || [],
        targets: state?.swamm?.targets || [],
        selectedTargetId: state?.swamm?.selectedTargetId,
        selectedTarget: state?.swamm?.targets.filter((target) => target.id === state?.swamm?.selectedTargetId)[0]
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        hideSwammBmpChart: () => dispatch(hideSwammBmpChart()),
        selectSwammTargetId: (selectedTargetId) => dispatch(selectSwammTargetId(selectedTargetId))
    };
};

const SwammBmpChart = connect(mapStateToProps, mapDispatchToProps)(SwammBmpChartClass);
const CustomTooltip = connect(mapStateToProps, mapDispatchToProps)(CustomTooltipClass);


export {
    SwammBmpChart
};
