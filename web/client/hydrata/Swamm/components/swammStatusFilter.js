import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import {setStatusFilter} from "../actionsSwamm";


class SwammStatusFilterClass extends React.Component {
    static propTypes = {
        statuses: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ToggleButtonGroup
                type="checkbox"
                value={this.state.value}
                onChange={(e) => this.handleChange(e)}
                className={this.props.className}
            >
                <ToggleButton value={this.props.statuses[0]}>{this.props.statuses[0]}</ToggleButton>
                <ToggleButton value={this.props.statuses[1]}>{this.props.statuses[1]}</ToggleButton>
                <ToggleButton value={this.props.statuses[2]}>{this.props.statuses[2]}</ToggleButton>
                <ToggleButton value={this.props.statuses[3]}>{this.props.statuses[3]}</ToggleButton>
                <ToggleButton value={this.props.statuses[4]}>{this.props.statuses[4]}</ToggleButton>
                <ToggleButton value={this.props.statuses[5]}>{this.props.statuses[5]}</ToggleButton>
                <ToggleButton value={this.props.statuses[6]}>{this.props.statuses[6]}</ToggleButton>
            </ToggleButtonGroup>
        );
    }

    handleChange(e) {
        console.log("change:", { value: e });
    }
}

const mapStateToProps = (state) => {
    return {
        statuses: state?.swamm?.statuses
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setStatusFilter: (activeStatuses) => dispatch(setStatusFilter(activeStatuses))
    };
};

const SwammStatusFilter = connect(mapStateToProps, mapDispatchToProps)(SwammStatusFilterClass);


export {
    SwammStatusFilter
};
