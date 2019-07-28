import React, { Component } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Container = styled.tr `
  border: 1px solid #000;
  margin: 10px auto;
  width: 50%;
  padding: 10px;
  font-size: 14px;
  td {
    button {
      width: 70px;
      padding: 5px;
      background-color: #333;
      color: #fff;
      border: none;
      margin: 10px;
      display: inline-block;
      &:disabled {
        background-color: #222;
      }
    }
  }
`

class Printer extends Component {
  state = {
    deletePrinter: false
  }

  _handleDelete = () => {
    const { onDelete, id } = this.props;
    const state = Object.assign({}, this.state);
    state.deletePrinter = true;
    this.setState(state);
    
    if (onDelete) return onDelete({ id })
  }

  render() {
    const { name, ip_address, status, id, onDelete, canEdit } = this.props;
    const { deletePrinter } = this.state
    return (
      <Container key={id}>
        <td>{name}</td>
        <td>{ip_address}</td>
        <td>{status}</td>
        <td>
          { onDelete && 
            <button disabled={deletePrinter} onClick={this._handleDelete}>
              { deletePrinter ? 'Deleting...' : 'Delete'}
            </button>
          }
          { canEdit && (
            <Link to={`edit/${id}`} params={{ id }}>
              <button type="button">Edit</button>
            </Link>
          )}
        </td>
      </Container>
    )
  }
}


export default Printer;
