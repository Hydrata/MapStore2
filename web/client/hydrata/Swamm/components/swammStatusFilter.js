import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {ButtonGroup, Button } from "react-bootstrap";
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
            <ButtonGroup
                type="checkbox"
                value={this.state.value}
                onChange={(e) => this.handleChange(e)}
                className={this.props.className}
            >
                <Button value={this.props.statuses[0]}>{this.props.statuses[0]}</Button>
                <Button value={this.props.statuses[1]}>{this.props.statuses[1]}</Button>
                <Button value={this.props.statuses[2]}>{this.props.statuses[2]}</Button>
                <Button value={this.props.statuses[3]}>{this.props.statuses[3]}</Button>
                <Button value={this.props.statuses[4]}>{this.props.statuses[4]}</Button>
                <Button value={this.props.statuses[5]}>{this.props.statuses[5]}</Button>
                <Button value={this.props.statuses[6]}>{this.props.statuses[6]}</Button>
            </ButtonGroup>
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
