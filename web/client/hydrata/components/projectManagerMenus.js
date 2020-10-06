import React from 'react';
import {setMenuGroup} from "../actions/projectManager";
import {connect} from "react-redux";
import SwammContainer from "../components/swammContainer";

const buttonStyle = {
    position: "absolute",
    zIndex: 1021,
    top: 10,
    minWidth: "135px",
    backgroundColor: "rgba(0,60,136,0.5)",
    borderColor: "rgb(255 255 255 / 70%)",
    borderWidth: "2px",
    padding: "5px 10px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "4px",
    color: "white",
    textAlign: "center"
};

class MenuButtonClass extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button
                    style={{...buttonStyle, left: this.props.spacing}}
                    onClick={() => {this.props.setMenuGroup(this.props.menu);}}>
                    {this.props.menu.title}
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        setMenuGroup: (menuGroup) => dispatch(setMenuGroup(menuGroup))
    };
};

const MenuButton = connect(null, mapDispatchToProps)(MenuButtonClass);

const MenuButtonList = (props) => (
    <div>
        <ul className="menu-groups">
            {props.menuGroups && props.menuGroups.length && props.menuGroups.map(
                (menu, index) => {
                    return (
                        <MenuButton
                            menu={menu}
                            spacing={index * 150 + 20}
                            key={menu.id}
                            openMenuGroup={props.openMenuGroup}
                            active={menu.id_label === props.openMenuGroup}
                        />
                    );
                })
            }
        </ul>
    </div>
);

export {
    MenuButton,
    MenuButtonList
};
