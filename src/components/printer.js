import React, { Component } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Container = styled.div `
  border: 1px solid #000;
  margin: 10px auto;
  width: 50%;
  padding: 10px;
`

class Printer extends Component {
  _handleDelete = () => {
    const { onDelete, id } = this.props;
    if (onDelete) return onDelete({ id })
  }

  render() {
    const { name, ip_address, status, id, onDelete, canEdit } = this.props;
    return (
      <Container key={id}>
        <div>{name}</div>
        <div>{ip_address}</div>
        <div>{status}</div>
        { onDelete && <button onClick={this._handleDelete}>Delete Printer</button> }
        { canEdit && (
          <Link to={`edit/${id}`} params={{ id }}>
            <button type="button">Edit Printer</button>
          </Link>
        )}
      </Container>
    )
  }
}


export default Printer;
