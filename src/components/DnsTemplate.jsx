import { Table, Container, Button } from 'react-bootstrap'

const DnsTemplate = ({ ipAddress }) => {
  console.log('ipaddress', ipAddress)
  return (
      <Container>
        <h2>WEB Traffic</h2>
        <Table hover>
          <thead>
            <tr>
              <th>Record Type:</th>
              <th>Host / Name:</th>
              <th>Value:</th>
              <th>TTL</th>
              <th></th>
            </tr>
          </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td><Button>copy</Button></td>
          </tr>

          </tbody>
        </Table>

      </Container>
  )
}

export default DnsTemplate