import LogoutButton from "./shared/LogoutButton"
import { useAuth } from "./shared/AuthContext"

const Header = () => {
  const auth = useAuth()
  console.log('header auth', auth)
  
  return (
      <header className='flex items-center justify-between py-2'>
        <figure id="logo">
          <a href={document.location.origin} >
            <img src='/logo.png' className="w-32"></img>
          </a>
        </figure>
       {auth.isLoggedIn && 
        <section className='flex flex-row justify-end items-center gap-4'>
          <a href="/sites" className="text-gray-700 font-bold hover:text-gray-900">Sites</a>
          <a href="/records" className="text-gray-700 font-bold hover:text-gray-900">Records</a>
          <a href="/templates" className="text-gray-700 font-bold hover:text-gray-900">Templates</a>
          <LogoutButton/>
        </section>
       
       }
      </header>
  )
}

export default Header