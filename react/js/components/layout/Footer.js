import React from "react";

export default class Footer extends React.Component {
  render() {
    const footerStyles = {
      marginTop: "30px",
    };

    return (
      <footer style={footerStyles}>
        <div class="row">
          <div class="col-lg-12">Typing into the input does autofilter on the list, pressing enter creates a list item</div>
        </div>
      </footer>
    );
  }
}
