import * as React from "react";
import styled from 'styled-components';

const Container = styled.div `
  margin: 10px auto;
`

const Loader = ({ message = false }) => <Container>{!message ? 'Loading...' : message}</Container>;

export default Loader;
