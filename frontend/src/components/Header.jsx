import LogoutButton from './shared/LogoutButton'
import { useAuth } from './shared/AuthContext'

const Header = () => {
  const auth = useAuth()

  return (
    <header className="flex items-center justify-between px-2 py-2">
      <figure className='flex justify-center align-middle' id="logo">
        <a href={document.location.origin}>
          <img src="/logo.png" className="w-16 sm:w-32"></img>
        </a>
      </figure>
      {auth.isLoggedIn && (
        <section className="flex flex-row items-center justify-end gap-4">
          <a
            href="/sites"
            className="text-xs font-bold text-gray-700 sm:text-base hover:text-gray-900"
          >
            Sites
          </a>
          <a
            href="/records"
            className="text-xs font-bold text-gray-700 sm:text-base hover:text-gray-900"
          >
            Records
          </a>
          <LogoutButton />
        </section>
      )}
    </header>
  )
}

export default Header
