import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore, useActions } from "../configureStore";
import { TabNavigation, Tab, Pane } from 'evergreen-ui';
import Layout from '../components/layout'

const Claim = (props) => {
  const getClaim = useActions(actions => actions.claim.getClaim);

  useEffect(() => {
    getClaim();
  }, []);

  console.log(props)

  return (
    <Layout>
      <Container>
        <h1>{props.data.claim.title}</h1>
        <p>{props.data.claim.desc}</p>
        <p>{props.data.claim.creator}</p>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query ClaimDetails($id: String!) {
    claim(id: { eq: $id }) {
      id
      title
      desc
      creator
    }
  }
`
// export const query = graphql`
//   query ProductDetails($productId: String!) {
//     product(id: { eq: $productId }) {
//       id
//       name
//       stock
//       price
//     }
//   }
// `

export default Claim;

const Container = styled.div`
  padding: 2em 1em;
`;

//cards
const BoxCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const HeaderTab = styled.div`
  font-size: 20px;
  width: 100%;
  border: none;
  p {
    margin: 0;
    padding: 0.7em;
    font-size: 1.1rem;
    font-weight: 600;
    color: #32325d;
  }
`;