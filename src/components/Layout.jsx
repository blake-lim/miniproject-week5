import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <STLayout>{children}</STLayout>;
};

const STLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;

export default Layout;
