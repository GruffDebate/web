import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore, useActions } from "../configureStore";
import { TabNavigation, Tab, Pane } from 'evergreen-ui';
import Layout from '../components/layout'
import Card from "../components/Home/Card";

const Home = () => {
  const listClaims = useActions(actions => actions.home.listClaims);
  const popularClaims = useStore(actions => actions.home.popularClaims);
  const newClaims = useStore(actions => actions.home.newClaims);
  const [tabs] = useState(["Popular", "New"]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    listClaims({ filter: selectedIndex });
  }, [selectedIndex]);

  return (
    <Layout>
      <Container>
        <TabNavigation marginBottom={20}>
          {tabs.map((tab, index) => (
            <Tab
              style={{ height: "45px", marginTop: "5px" }}
              key={tab}
              id={tab}
              is="a"
              onSelect={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
              aria-controls={`panel-${tab}`}
            >
              <HeaderTab>
                <p>{tab}</p>
              </HeaderTab>
            </Tab>
          ))}
        </TabNavigation>
          {tabs.map((tab, index) => (
            <Pane
              key={tab}
              id={`panel-${tab}`}
              role="tabpanel"
              aria-labelledby={tab}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? "block" : "none"}
            >
              {index === 0 ? 
                <BoxCards>
                  {popularClaims && popularClaims.map((item, idx) => (
                    <Card
                      key={idx}
                      title={item.title}
                      desc={item.desc}
                      img={item.img}
                    />
                  ))}
                </BoxCards>
                 :
                <BoxCards>
                  {newClaims && newClaims.map((item, idx) => (
                    <Card
                      key={idx}
                      title={item.title}
                      img={item.img}
                    />
                  ))}
                </BoxCards>
              }
            </Pane>
          ))}
      </Container>
    </Layout>
  );
};

export default Home;

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