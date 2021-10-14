import React from "react";
import {Text} from "./Form";
import styled from "styled-components";

const Container = styled.span`
  display: flex;
`;

const Time = ({ time }) => {
    return <Container>
        <Text>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</Text>
        <Text>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</Text>
        <Text>{("0" + ((time / 10) % 100)).slice(-2)}</Text>
    </Container>
}

export default Time;