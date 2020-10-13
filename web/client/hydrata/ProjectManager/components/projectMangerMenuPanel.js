import React from "react";
import {MenuDatasetRows} from './projectManagerMenuDatasetRows';

const panelStyle = {
    position: "absolute",
    zIndex: 1021,
    top: "50px",
    left: "20px",
    minWidth: "400px",
    backgroundColor: "rgba(0,60,136,0.6)",
    borderColor: "rgb(255 255 255 / 70%)",
    borderWidth: "2px",
    padding: "5px 10px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "4px",
    color: "white",
    textAlign: "center"
};


const MenuPanel = () => (
    <div style={{...panelStyle}}>
        <MenuDatasetRows/>
    </div>
);


export {
    MenuPanel
};
