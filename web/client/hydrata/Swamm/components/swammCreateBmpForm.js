import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {Modal, Button} from "react-bootstrap";
import {hideCreateBmpForm} from "../actionsSwamm";
import "../../ProjectManager/projectManager.css";

class SwammCreateBmpFormClass extends React.Component {
    static propTypes = {
        bmpTypeId: PropTypes.number,
        hideCreateBmpForm: PropTypes.func
    };

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Modal
                show={true}
                onHide={() => this.props.hideCreateBmpForm()}
                style={{
                    marginTop: "100px"
                }}
            >
                <Modal.Header>
                    <Modal.Title>
                        Create a new BMP record {this.props.bmpTypeId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle="danger"
                        bsSize="small"
                        style={{opacity: "0.5"}}
                        onClick={() => this.props.hideCreateBmpForm()}>
                        Cancel
                    </Button>
                    <Button
                        bsStyle="success"
                        bsSize="small"
                        style={{opacity: "0.5"}}
                        onClick={() => this.props.hideCreateBmpForm()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bmpTypes: state?.swamm?.bmpTypes
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        hideCreateBmpForm: () => dispatch(hideCreateBmpForm())
    };
};

const SwammCreateBmpForm = connect(mapStateToProps, mapDispatchToProps)(SwammCreateBmpFormClass);


export {
    SwammCreateBmpForm
};
