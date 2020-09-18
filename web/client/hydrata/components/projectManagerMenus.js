import React from 'react';

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

const MenuButton = (props) => {
    return (
        <button
            key={props.menu.title}
            className="btn"
            style={{...buttonStyle, left: props.spacing}}>
            {props.menu.title}
        </button>
    );
};

const MenuButtonList = (props) => (
    <div>
        <ul className="menu-groups">
            {props.menuGroups && props.menuGroups.length && props.menuGroups.map(
                (menu, index) => {
                    return (
                        <MenuButton menu={menu} spacing={index * 130 + 20}/>
                    );
                })
            }
        </ul>
    </div>
);

export default MenuButtonList;
