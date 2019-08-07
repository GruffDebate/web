import React from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

const Card = props => {
  const go = (key) => {
    navigate(`/c/${key}`)
  }
  
  return (
    <Container onClick={() => go(props.id)}>
      <CardShape>
        <CardPosition>
          <CardImage>
            {props.img ? <img src={props.img} alt={props.title} /> : <div></div>}
          </CardImage>
          <CardBox hasImg={Boolean(props.img)}>
            {props.title.length > 223 ? props.title.concat('...') : props.title}
          </CardBox>
          <CardDescription>{props.desc}</CardDescription>
        </CardPosition>
      </CardShape>
      <CardAnnotation>
        <AnnotationLatest>
          <AccountAvatar>
            <AvatarImage>
              <img src="https://www.kialo.com/images/e224d270-af09-4b9c-b9b5-89a3ec3edc6e_32x32.png" alt="User avatar" />
            </AvatarImage>
          </AccountAvatar>
          <LastText>
            commented on a claim
          </LastText>
        </AnnotationLatest>
        <AnnotationTime>
          30m
        </AnnotationTime>
      </CardAnnotation>
    </Container>
  );
};

export default Card;

const Container = styled.a`
  background-color: #fff;
  position: relative;
  flex: none;
  overflow: hidden;
  height: 254px;
  outline: none;
  width: 100%;
  border-radius: 0.2em;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
  cursor: pointer;
`;

const CardShape = styled.div`
  position: relative;
`;

const CardPosition = styled.div`
  transition: color .2s;
  color: #2c343d;
  flex-direction: column;
  display: flex;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  text-decoration: none;
  cursor: pointer;

  &:after {
    background: linear-gradient(0deg,transparent,rgba(0,0,0,.5));
    content: "";
    position: absolute;
    top: auto;
    left: 0;
    right: 0;
    height: 1.5em;
  }
`;

const CardImage = styled.div`
  flex: none;
  position: relative;
  background-color: #a9b0b8;
  cursor: pointer;

  > img {
    height: 104px;
    width: 100%;
    display: block;
    font-family: "object-fit:cover";
    object-fit: cover;
  }

  > div {
    height: 20px;
    width: 100%;
    display: block;
  }
`;

const CardBox = styled.label`
  flex: 1 1 auto;
  font-weight: 700;
  padding: ${props => props.hasImg ? '9px 9px 0px 24px' : '19px 24px'};
  font-size: 16px;
  line-height: 1.5;
  overflow: hidden;
  word-wrap: break-word;
  position: relative;
  max-height: 100px;
  cursor: pointer;
`;

const CardDescription = styled.p`
  margin: 0;
  padding: 0px 24px;
  line-height: 1.2;
`

const CardAnnotation = styled.div`
  position: absolute;
  top: auto;
  bottom: 0;
  left: 24px;
  right: 24px;
  height: 63px;
  border-top: 1px solid #e6e9eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AnnotationLatest = styled.div`
  display: flex;
  align-items: center;
`

const AccountAvatar = styled.div`
  padding-right: 10px;
  cursor: pointer;
  flex: none;
`

const AvatarImage = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;

  > img {
    display: block;
    font-family: "object-fit:cover";
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`

const LastText = styled.span`
  font-size: 12px;
  line-height: 1.3;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #2c343d;
`

const AnnotationTime = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.3;
  flex: none;
  padding-left: 16px;
  color: #a9b0b8;
  white-space: nowrap;
`