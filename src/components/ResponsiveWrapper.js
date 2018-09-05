import styled from 'react-emotion'

const ResponsiveWrapper = styled('div')`
  margin: 2em auto;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 820px;
  flex-direction: column;
  font-size: 16px;

  @media (min-width: 780px) {
    width: 90%;
    font-size: 17px;
  }
`

export default ResponsiveWrapper
