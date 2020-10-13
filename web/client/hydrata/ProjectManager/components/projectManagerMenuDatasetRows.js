import React from "react";
import {setMenuGroup} from "../actionsProjectManager";
import {connect} from "react-redux";
import {MenuDatasetRow} from "./projectManagerMenuDatasetRow";

const rowsStyle = {
    borderTop: "1px solid #ffffffad"
};


const openMenuGroupSelector = (state) => state?.projectManager?.openMenuGroup;

class MenuDatasetRowsClass extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.datasets.length === 0) {
            return (
                <div style={rowsStyle}>
                    <MenuDatasetRow dataset={null}/>
                </div>
            );
        }
        return (
            <div style={rowsStyle}>
                {this.props.datasets.map((dataset) => (
                    <MenuDatasetRow dataset={dataset}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        openMenuGroup: openMenuGroupSelector(state),
        datasets: state?.projectManager.data.dataset_set.filter((dataset) => {
            return dataset?.mapstore_menu_group?.id_label === openMenuGroupSelector(state).id_label;
        })
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setMenuGroup: (menuGroup) => dispatch(setMenuGroup(menuGroup))
    };
};

const MenuDatasetRows = connect(mapStateToProps, mapDispatchToProps)(MenuDatasetRowsClass);


export {
    MenuDatasetRows
};
