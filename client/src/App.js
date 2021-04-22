import React from 'react';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columDefs: [
                { headerName: 'Nombre', field: 'firstName', sortable: true, filter: true, checkboxSelection: true },
                { headerName: 'Apellido', field: 'lastName', sortable: true, filter: true },
                { headerName: 'Email', field: 'email', sortable: true, filter: true },
                { headerName: 'Telefono', field: 'phoneNumber', sortable: true, filter: true }
            ],
            rowData: null,
        }
        this.searchDivStyle = {
            backgroundColor: "#dedede", 
            padding: 10
        }
        this.searchStyle = {
            width:"100%",
            padding: "5px 10px",
            borderRadius: 5,
            outline: 0
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/customers')
            .then(res => res.json())
            .then(result => result.data)
            .then(rowData => this.setState({rowData}))
            .catch(error => console.log(error));
    }

    onButtonClick = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataString = selectedData.map(node => node.firstName + ' ' + node.lastName).join(', ');
        alert(`Clientes seleccionados: ${selectedDataString}`);
    }

    onFilterTextChange = (e) => {
        this.gridApi.setQuickFilter(e.target.value);
    }
    
    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{
                    width: 850,
                    height: 600
                }}
            >
                <button onClick={this.onButtonClick}>Ver clientes seleccionados</button>
                <div style={this.searchDivStyle}>
                    <input style={this.searchStyle} type="search" onChange={this.onFilterTextChange} placeholder="Buscar cliente..." />
                </div>
                <AgGridReact
                    columnDefs={this.state.columDefs}
                    rowData={this.state.rowData}
                    rowSelection="multiple"
                    onGridReady={params => this.gridApi = params.api}
                    pagination={true}
                    paginationPageSize={100}
                />
            </div>
        );
    }
}

export default App;