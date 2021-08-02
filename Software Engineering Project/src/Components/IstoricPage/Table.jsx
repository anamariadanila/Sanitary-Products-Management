import React, { Component } from 'react';
import '../../css/IstoricPage/Table.css';
//import ReactDOM from 'react-dom';
import axios from 'axios';
import { useState } from 'react';

const api = axios.create({
  baseURL: 'http://ip-lab.herokuapp.com/',
  auth: {
    username: 'mobile',
    password: 'tempP@ssw0rd',
  },
});

class Table extends Component {
  state = {
    rows: [],
    hospitals: [],
    materials: [],
    drivers: [],
    users: [],
    searchTerm: '',
  };

  async getRows() {
    let results = await api.get('istoric/');
    this.setState({ rows: results.data });
  }

  async getHospitals() {
    let result = await api.get('institutii/');
    this.setState({ hospitals: result.data });
  }

  async getMaterials() {
    let result = await api.get('tip_material/');
    this.setState({ materials: result.data });
  }

  async getDrivers() {
    let result = await api.get('soferi/');
    this.setState({ drivers: result.data });
  }

  async getUsers() {
    let result = await api.get('users/');
    this.setState({ users: result.data });
  }

  findHospitalById(hospitalId) {
    let result = null;
    this.state.hospitals.forEach((hospital, index) => {
      if (hospital.id === hospitalId) {
        result = hospital.nume;
      }
    });
    return result;
  }

  findMaterialById(materialId) {
    let result;
    this.state.materials.forEach((material, index) => {
      if (material.id === materialId) {
        result = material.nume;
      }
    });
    return result;
  }

  findUserById(userId) {
    let result;
    this.state.users.forEach((user, index) => {
      if (user.id === userId) {
        result = user.username;
      }
    });
    return result;
  }

  findDriverById(driverId) {
    let result;
    this.state.drivers.forEach((driver, index) => {
      if (driver.id === driverId) {
        result = driver.user;
      }
    });
    let driverName = this.findUserById(result);
    return driverName;
  }

  renderTableHeader() {
    let header = [
      'sursa',
      'destinatie',
      'produs',
      'cantitate',
      'sofer',
      'data plecare sofer',
      'data livrare',
      'data cerere',
    ];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  renderTableData() {
    return this.state.rows
      .filter((value) => {
        let hospitalName = this.findHospitalById(value.institutie_donatoare);
        let hospitalName2 = this.findHospitalById(value.institutie_primitoare);
        if (this.state.searchTerm === '') {
          return value;
        } else if (hospitalName !== null) {
          if (
            hospitalName
              .toLowerCase()
              .includes(this.state.searchTerm.toLowerCase())
          ) {
            return value;
          }
          if (
            hospitalName2 !== null &&
            hospitalName2
              .toLowerCase()
              .includes(this.state.searchTerm.toLowerCase())
          ) {
            return value;
          }
        }
      })
      .map((date, index) => {
        const {
          cantitate,
          data_cerere,
          data_livrare,
          data_plecare_sofer,
          id,
          institutie_donatoare,
          institutie_primitoare,
          sofer,
          tip_material,
        } = date;
        return (
          <tr key={id}>
            <td>{this.findHospitalById(institutie_donatoare)}</td>
            <td>{this.findHospitalById(institutie_primitoare)}</td>
            <td>{this.findMaterialById(tip_material)}</td>
            <td>{cantitate}</td>
            <td>{this.findDriverById(sofer)}</td>
            <td>{data_plecare_sofer}</td>
            <td>{data_livrare}</td>
            <td>{data_cerere}</td>
          </tr>
        );
      });
  }

  componentDidMount() {
    this.getRows();
    this.getHospitals();
    this.getMaterials();
    this.getDrivers();
    this.getUsers();
  }

  render() {
    console.log(this.state.rows);
    return (
      <div>
        <div class='search'>
          <input
            type='text'
            className='searchTerm'
            placeholder='Search...'
            onChange={(event) => {
              this.setState({ searchTerm: event.target.value });
            }}
          />
        </div>

        <table className='tabelist' id='istoric'>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
