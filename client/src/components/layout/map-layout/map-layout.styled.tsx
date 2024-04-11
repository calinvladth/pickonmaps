import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-column-gap: 20px;
  
  overflow: hidden;
`

const Component = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Content = styled(Component)`
  padding: 25px;
`

const Avatar = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
`

const Style = {
    Container,
    Component,
    Content,
    Avatar
}

export default Style