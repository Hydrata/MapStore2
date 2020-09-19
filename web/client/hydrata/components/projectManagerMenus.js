import React from 'react';
import {setMenuGroup} from "../actions/projectManager";
import {connect} from "react-redux";

const buttonStyle = {
    position: "absolute",
    zIndex: 1021,
    top: 10,
    minWidth: "115px",
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

const panelStyle = {
    position: "absolute",
    zIndex: 1021,
    top: "50px",
    left: "20px",
    minWidth: "400px",
    backgroundColor: "rgba(0,60,136,0.8)",
    borderColor: "rgb(255 255 255 / 70%)",
    borderWidth: "2px",
    padding: "5px 10px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "4px",
    color: "white",
    textAlign: "center"
};

class MenuButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button
                    className="btn"
                    style={{...buttonStyle, left: this.props.spacing}}
                    onClick={() => {this.props.setMenuGroup(this.props.menu.id);}}>
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

const ConnectedMenuButton = connect(null, mapDispatchToProps)(MenuButton);

const MenuButtonList = (props) => (
    <div>
        <ul className="menu-groups">
            {props.menuGroups && props.menuGroups.length && props.menuGroups.map(
                (menu, index) => {
                    return (
                        <ConnectedMenuButton menu={menu} spacing={index * 130 + 20} key={menu.id}/>
                    );
                })
            }
        </ul>
    </div>
);

const MenuPanel = ({menuGroup}) => (
    <div>
        <div className={`${menuGroup ? "active" : ""}`} style={{...panelStyle}}>
            {menuGroup}asdf
        </div>
    </div>
);

export {
    ConnectedMenuButton,
    MenuButtonList,
    MenuPanel
};
