import React from "react";
import styled from "styled-components";

import bg from "../../assets/images/food-bg.jpg";

const Content = props => {
  return (
    <Wrapper>
      <ImageBg src={bg}>{props.children}</ImageBg>
    </Wrapper>
  );
};

export default Content;

const Wrapper = styled.div`
  background-image: url(${bg});
  height: 102vh;
  margin: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageBg = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 102vh;
`;
