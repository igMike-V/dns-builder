import { useState, useEffect } from 'react'
import { copyContent } from '../../utilities/utilities'
import siteService from '../../services/siteService'

import { useConfirm } from '../shared/ConfirmContext'
import { HiPencilAlt, HiClipboardCopy, HiOutlineTrash } from 'react-icons/hi'
import SiteForm from './SiteForm'
import styles from '../styles'

const Sites = () => {
  const { isConfirmed } = useConfirm()

  const [sites, setSites] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [updateSites, setUpdateSites] = useState(0)
  const [editSite, setEditSite] = useState(null)

  const newSite = () => {
    setShowAddForm(true)
  }


  /* Load sites */
  useEffect(() => {
    const fetchSites = async () => {
      const sites = await siteService.getSites()
      if(sites) setSites(sites)
      if(editSite) setEditSite(editSite)
    }
    fetchSites()
  }, [updateSites])


  if (!sites) return (
    <section className='w-full pt-7'>
      <h1>Site List: </h1>
      <p>Loading...</p>
    </section>
  )

  const handleEditClick = (site) => {
    setEditSite(site.id)
    setShowAddForm(true)
  }

  const handleDeleteClick = async (site) => {
    try {
      const confirmMessage = await isConfirmed(`Delete Site ${site.name}`, `Are you sure you want to delete the site:  "${site.name}"`)
      if (confirmMessage) {
        await siteService.deleteSite(site.id)
        setUpdateSites(prev => prev + 1)
      }
    } catch (err) {
      console.error(err)
    } 
  }


  //TODO - move to utilities
  const getSiteLink = (domain) => {
    //TODO - get set address in config
    //TODO - ensure dmain has no underscore
    //https://stackoverflow.com/questions/4938900/how-to-encode-periods-for-urls-in-javascript
    return `http://localhost:5173/site/${domain.replace('.','_')}`
  }

  return (
    <section className='w-full pt-7'>
      { showAddForm && <SiteForm setShowAddForm={setShowAddForm} setUpdateSites={setUpdateSites} sites={sites} setSites={setSites} setEditSite={setEditSite} editSite={editSite} /> }
      <header className='flex flex-row justify-between'>
        <h1>Site List: </h1>
        {!showAddForm && <button className={styles.buttons.primary} onClick={newSite}>Add Site</button>}
      </header>
      <section className='flex flex-row justify-between py-6'>
        <table className={styles.table.table}>
          <thead>
            <tr>
              <th className={styles.table.th}>Name</th>
              <th className={styles.table.th}>Domain</th>
              <th className={styles.table.th}></th>
            </tr>
          </thead>
          <tbody>
        {sites.map(site => {
          return (
            <tr className={styles.table.trBody} key={site.id}>
              <td className={styles.table.td}>{site.name}</td>
              <td className={styles.table.td}>{site.domain}</td>
              <td className={styles.table.td}>
                <div className='flex gap-2 flex-row justify-end'>
                  <HiClipboardCopy 
                    className={styles.icons} 
                    onClick={() => copyContent(getSiteLink(site.domain))}
                  >
                    Copy Link
                  </HiClipboardCopy>
                  <HiPencilAlt 
                    className={styles.icons} 
                    onClick={() => handleEditClick(site)}
                  >
                    Edit
                  </HiPencilAlt>
                  <HiOutlineTrash
                    className={styles.icons} 
                    onClick={() => handleDeleteClick(site)}>
                      Delete
                  </HiOutlineTrash>
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