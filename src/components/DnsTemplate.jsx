import { Container } from 'react-bootstrap'
import data from '../data'
import { DnsSingle } from './DnsSingle'


const records = (ip) => {
  
  return data.map(item => <DnsSingle ip={ip} key={item.id} recordContent={item} />)

}

export const DnsTemplate = ({ ipAddress }) => {
  
  return (
    <Container>
      
       {records(ipAddress)}

    </Container>
  )
}

export default DnsTemplate