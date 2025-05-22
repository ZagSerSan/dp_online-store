import configFile from '../../../../config.json'
import './StoreLogo.scss'

const StoreLogo = () => {
  const LOGO_URL = `${configFile.apiEndPoint}images/logo/logoSapach.png`  

  return (
    <div className='logo'>
      <img src={LOGO_URL} alt="logo" />
    </div>
  )
}

export default StoreLogo
