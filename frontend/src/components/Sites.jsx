import { useState, useEffect } from 'react'
import { copyContent } from '../utilities/utilities'
import siteService from '../services/siteService'
import { useNavigate } from 'react-router-dom'

import { HiPencilAlt, HiClipboardCopy, HiClipboardCheck, HiOutlineClipboardCopy } from 'react-icons/hi'
import AddSiteForm from './AddSiteForm'


const styles = {
  table: 'w-full rounded-lg',
  th: 'bg-gray-300 border text-left px-2 py-3',
  td: 'border px-2 py-1',
  trBody: 'hover:bg-gray-200 cursor-pointer',
  icons: 'text-xl text-gray-600 hover:text-teal-600 cursor-pointer'
}


const Sites = () => {
  
  const navigate = useNavigate()

  const [sites, setSites] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [updateSites, setUpdateSites] = useState(0)

  const newSite = () => {
    setShowAddForm(true)
  }


  /* Load sites */
  useEffect(() => {
    const fetchSites = async () => {
      const sites = await siteService.getSites()
      if(sites) setSites(sites)
    }
    fetchSites()
  }, [updateSites])


  if (!sites) return (
    <section className='w-full pt-7'>
      <h1>Site List: </h1>
      <p>Loading...</p>
    </section>
  )

  const handleEditClick = (id) => {
    console.log('edit clicked', id)
    navigate(`/site/${id}`)  
  }

  //TODO - move to utilities
  const getSiteLink = (domain) => {
    //TODO - get set address in config
    //TODO - ensure dmain has no underscore
    //https://stackoverflow.com/questions/4938900/how-to-encode-periods-for-urls-in-javascript
    return `http://localhost:5173/${domain.replace('.','_')}`
  }

  return (
    <section className='w-full pt-7'>
      { showAddForm && <AddSiteForm setShowAddForm={setShowAddForm} setUpdateSites={setUpdateSites} /> }
      <header className='flex flex-row justify-between'>
        <h1>Site List: </h1>
        {!showAddForm && <button className='shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-3 rounded' onClick={newSite}>Add Site</button>}
      </header>
      <section className='flex flex-row justify-between py-6'>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Domain</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
        {sites.map(site => {
          return (
            <tr className={styles.trBody} key={site.id}>
              <td className={styles.td}>{site.name}</td>
              <td className={styles.td}>{site.domain}</td>
              <td className={styles.td}>
                <div className='flex gap-2 flex-row justify-end'>
                  <HiClipboardCopy className={styles.icons} onClick={() => copyContent(getSiteLink(site.domain))}>Copy Link</HiClipboardCopy>
                  <HiPencilAlt className={styles.icons} onClick={() => copyContent('putcopydetailshere')}>Edit</HiPencilAlt>
                </div>
              </td>
            </tr>
              )
            })}
          </tbody>
        </table>
        </section>
    </section>
  )
}

export default Sites