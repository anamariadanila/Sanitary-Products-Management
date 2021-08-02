import React, { Component } from 'react';
import SearchBtn from './SearchBtn.jsx';
import Title from './Title.jsx';
import Table from './Table';

import axios from 'axios';

class InventarPage extends Component {
  render() {
    return (
      <>
        <Title />
        {/* <SearchBtn /> */}
        <Table getRowsFunction={this.getRows} />
      </>
    );
  }
}

export default InventarPage;
