import React from "react";
import {connect} from "react-redux";
const PropTypes = require('prop-types');
import {Modal, Button, Table, ControlLabel, FormControl, FormGroup, Form, Col} from "react-bootstrap";
import {
    showHaitiBiblioForm,
    hideHaitiBiblioForm
} from "../actionsHaitiBiblio";
import {setMenuGroup} from "../../ProjectManager/actionsProjectManager";

class HaitiBiblioFormClass extends React.Component {
    static propTypes = {
        setMenuGroup: PropTypes.func,
    };

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <Modal
                show={true}
                onHide={() => this.props.hideHaitiBiblioForm()}
                style={{
                    marginTop: "100px"
                }}
            >
                <Modal.Header>
                    <Modal.Title>
                        Title Here
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered condensed hover className={"text-right"}>
                        <thead>
                            <tr>
                                <th>Heading</th>
                                <th/>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Row 1: </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Row 2: </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle="info"
                        bsSize="small"
                        style={{opacity: "0.7"}}
                        onClick={() => console.log('click')()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mapId: state?.projectManager?.data?.base_map
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setMenuGroup: (menuGroup) => dispatch(setMenuGroup(menuGroup)),
        hideHaitBiblioForm: () => dispatch(hideHaitiBiblioForm()),
        showHaitBiblioForm: () => dispatch(showHaitiBiblioForm())
    };
};

const HaitiBiblioForm = connect(mapStateToProps, mapDispatchToProps)(HaitiBiblioFormClass);


export {
    HaitiBiblioForm
};