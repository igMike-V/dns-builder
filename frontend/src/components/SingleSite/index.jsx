import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import siteService from '../../services/siteService'
import styles from '../styles'

export const SingleSite = () => {
  const [siteData, setSiteData] = useState(null)
  //TODO - get site lookup from url params
  const { url } = useParams()


  useEffect(() => {
    //TODO - get site data
    const fetchSiteData = async () => {
      const siteData = await siteService.getSite(url)
      if(siteData) setSiteData(siteData)
    }
  fetchSiteData()
  },[])

  console.log(siteData)
  return (
    <section className='px-8 sm:px-2' >
      single site loaded : {url}
    </section>
  )
}

export default SingleSite