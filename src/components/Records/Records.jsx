import data from '../../data'
import { Record } from './Record'
import './records.css'


const records = (ip) => {
  
  return data.map(item => <Record ip={ip} key={item.id} recordContent={item} />)

}

export const Records = ({ ipAddress }) => {
  
  return (
    <section className='px-8 sm:px-2' >
       {records(ipAddress)}
    </section>
  )
}

export default Records