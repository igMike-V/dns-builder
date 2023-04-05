import data from '../../data'
import { Record } from './Record'


const records = (ip, site) => {
  
  return data.map(item => <Record ip={ip} site={site} key={item.id} recordContent={item} />)

}

export const Records = ({ ipAddress, site }) => {
  
  return (
    <section className='px-8 sm:px-2' >
       {records(ipAddress, site)}
    </section>
  )
}

export default Records