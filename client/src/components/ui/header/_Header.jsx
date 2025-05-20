import StoreLogo from './StoreLogo'
// import NavLinks from './NavLinks'
// import LanguageSwitcher from './LanguageSwitcher'
// import SearchButton from './SearchButton'
// import UserMenu from './UserMenu'
// import CartButton from './CartButton'

const Header = () => {
  return (
    <header className="header">
      <StoreLogo />
      {/* <NavLinks /> */}
      <div className="interactive-panel">
        {/* <LanguageSwitcher />
        <SearchButton />
        <UserMenu />
        <CartButton /> */}
      </div>
    </header>
  )
}

export default Header
