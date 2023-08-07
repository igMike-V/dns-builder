import { useState, useEffect } from 'react'
import { copyContent } from '../utilities/utilities'
import templateService from '../services/templateService'
import { useNavigate } from 'react-router-dom'

import { HiPencilAlt, HiClipboardCopy, HiClipboardCheck, HiOutlineClipboardCopy } from 'react-icons/hi'


const styles = {
  table: 'w-full rounded-lg',
  th: 'bg-gray-300 border text-left px-2 py-3',
  td: 'border px-2 py-1',
  trBody: 'hover:bg-gray-200 cursor-pointer',
  icons: 'text-xl text-gray-600 hover:text-teal-600 cursor-pointer'
}


const Templates = () => {
  
  const navigate = useNavigate()

  const [templates, settemplates] = useState([])

  const newSite = () => {
    console.log('new site')
    navigate('/addsite')
  }


  /* Load templates */
  useEffect(() => {
    const fetchtemplates = async () => {
      const templates = await templateservice.gettemplates()
      if(templates) settemplates(templates)
    }
    fetchtemplates()
  }, [])


  if (!templates) return (
    <section className='w-full pt-7'>
      <h1>Site List: </h1>
      <p>Loading...</p>
    </section>
  )

  const handleRowClick = (id) => {
    console.log('row clicked', id)
    navigate(`/site/${id}`)  
  }

  return (
    <section className='w-full pt-7'>
      <header className='flex flex-row justify-between'>
        <h1>Site List: </h1>
        <button className='shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-3 rounded' onClick={newSite}>Add Site</button>
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
        {templates.map(site => {
          return (
            <tr className={styles.trBody} key={site.id}>
              <td className={styles.td}>{site.name}</td>
              <td className={styles.td}>{site.domain}</td>
              <td className={styles.td}>
                <div className='flex gap-2 flex-row justify-end'>
                  <HiClipboardCopy className={styles.icons} onClick={() => copyContent('putcopydetailshere')}>Copy Link</HiClipboardCopy>
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

export default Templates