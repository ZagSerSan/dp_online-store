import configFile from '../../../config.json'

const StoreLogo = () => {
  const LOGO_URL = `${configFile.apiEndPoint}images/logo/logoSapach.png`  

  return (
    <div className='header-logo'>
      <img src={LOGO_URL} alt="logo" />
    </div>
  )
}

export default StoreLogo
