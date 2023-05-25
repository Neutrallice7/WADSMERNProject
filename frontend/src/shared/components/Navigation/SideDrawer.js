import React from "react";

import "./MainHeader.css";

const SideDrawer = (props) => {
    return<aside className="side-drawer">{props.children}</aside>
};

export default SideDrawer;