import React, { Component } from 'react';
import '../../css/InventarPage/Table.css';
//import ReactDOM from 'react-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ip-lab.herokuapp.com/',
  auth: {
    username: 'mobile',
    password: 'tempP@ssw0rd',
  },
});

const institutieMinister = 14;

class Table extends Component {
  state = {
    rows: [],
    hospitals: [],
    materials: [],
    searchTerm: '',
  };

  async getRows() {
    let results = await api.get('cereri/');
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

  renderTableHeader() {
    let header = [
      'nume spital',
      'data cerere',
      'tip material',
      'cantitate',
      'prioritate',
      'actiune',
    ];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  renderTableData() {
    return this.state.rows
      .filter((value) => {
        let hospitalName = this.findHospitalById(value.institutie);
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
        }
      })
      .map((date, index) => {
        const {
          id,
          institutie,
          data_cerere,
          data_limita,
          tip_material,
          cantitate,
          prioritate,
        } = date;
        return (
          <tr key={id}>
            <td>{this.findHospitalById(institutie)}</td>
            <td>{data_cerere}</td>
            <td>{this.findMaterialById(tip_material)}</td>
            <td>{cantitate}</td>
            <td>{prioritate}</td>
            <td className='opration'>
              {/* <button className='button'>Import</button> */}
              <button
                className='button'
                onClick={() => {
                  const cerere = {
                    id: id,
                    institutie: institutie,
                    data_cerere: data_cerere,
                    data_limita: data_cerere,
                    tip_material: tip_material,
                    cantitate: 0,
                    prioritate: 0,
                  };
                  console.log(cerere);

                  const istoric = {
                    institutie_donatoare: institutieMinister,
                    institutie_primitoare: institutie,
                    data_cerere: data_cerere,
                    data_livrare: data_cerere,
                    data_plecare_sofer: data_cerere,
                    tip_material: tip_material,
                    cantitate: cantitate,
                    sofer: 3,
                  };

                  console.log(istoric);

                  api
                    .post('cereri/', cerere)
                    .then((response) =>
                      this.setState({ cerereId: response.data.id })
                    );
                  api
                    .post('istoric/', istoric)
                    .then((response) =>
                      this.setState({ cerereId: response.data.id })
                    );
                }}
              >
                Doneaza
              </button>
            </td>
          </tr>
        );
      });
  }

  componentDidMount() {
    this.getRows();
    this.getHospitals();
    this.getMaterials();
  }

  render() {
    //console.log(this.state.rows);
    console.log(this.findHospitalById(4));
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
        <table id='inventar'>
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
