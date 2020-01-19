import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore, useActions } from '../lib/store'
import { TabNavigation, Tab, Pane } from 'evergreen-ui'
import Layout from '../components/layout'
import Card from '../components/Home/Card'
import { BoxCards } from '../components/UI'
import SEO from '../components/seo'

const Home = () => {
  const listClaims = useActions((actions) => actions.home.listClaims)
  const popularClaims = useStore((actions) => actions.home.popularClaims)
  const newClaims = useStore((actions) => actions.home.newClaims)
  const [tabs] = useState(['Popular', 'New'])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    listClaims({ filter: selectedIndex })
  }, [selectedIndex])

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <TabNavigation marginBottom={20}>
          {tabs.map((tab, index) => (
            <Tab
              style={{ height: '45px', marginTop: '5px' }}
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
            display={index === selectedIndex ? 'block' : 'none'}
          >
            {index === 0 ? (
              <BoxCards>
                {popularClaims &&
                  popularClaims.map((item, idx) => (
                    <Card
                      key={idx}
                      id={item.id}
                      title={item.title}
                      desc={item.desc}
                      img={item.img}
                      creator={item.creator}
                      date={item.start}
                    />
                  ))}
              </BoxCards>
            ) : (
              <BoxCards>
                {newClaims &&
                  newClaims.map((item, idx) => (
                    <Card
                      key={idx}
                      id={item.id}
                      title={item.title}
                      desc={item.desc}
                      img={item.img}
                      creator={item.creator}
                      date={item.start}
                    />
                  ))}
              </BoxCards>
            )}
          </Pane>
        ))}
      </Container>
    </Layout>
  )
}

export default Home

const Container = styled.div`
  padding: 2em 1em;
`

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
`
