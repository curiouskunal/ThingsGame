import React from "react";

import Title from "./Header/Title";

export default class Header extends React.Component {

  render() {
    return (
      <div id="Header">
        <Title title="The Game of Things" />
      </div>
    );
  }
}
