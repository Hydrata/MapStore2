import React from "react";
import {setMenuGroup} from "../actions/projectManager";
import {connect} from "react-redux";
import {changeLayerProperties} from "../../actions/layers";
import {MenuDatasetRow} from "./projectManagerMenuDatasetRow";

const rowsStyle = {
    padding: "3px"
};


const openMenuGroupSelector = (state) => state?.projectManager?.openMenuGroup;

class MenuDatasetRowsClass extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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
