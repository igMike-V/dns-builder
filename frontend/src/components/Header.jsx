const Header = () => {
  return (
      <header className='flex items-center justify-between p-5'>
        <div id="logo">
          <a href={document.location.origin} >
          <img src='/logo.png' className="w-48"></img>
          </a>
        </div>
      </header>
  )
}

export default Header