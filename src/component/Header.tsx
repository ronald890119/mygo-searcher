import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import mygoLogo from '../assets/logo_mygo.webp'
import aveMujicaLogo from '../assets/Ave_Mujica_logo.webp'
import headerBackground1 from '../assets/mygo-bg.webp'
import headerBackground2 from '../assets/ave-mujica-bg.jpg'

const Header = () => {
  const date = new Date().getDate()
  const [t, i18n] = useTranslation('global')

  useEffect(() => {
    const browserLanguage = navigator.language.substring(0, 2).toLowerCase()
    i18n.changeLanguage(browserLanguage === 'zh' ? 'zh' : 'en')
  }, [i18n])

  return (
    <>
      <header className="bg-opacity-0 relative top-0 z-10 h-40 w-full bg-gray-400">
        <img
          className="z-10 h-40 w-full object-cover opacity-50"
          src={date % 2 === 0 ? headerBackground1 : headerBackground2}
        />
        <div className="absolute inset-0 mx-auto flex max-w-7xl justify-between px-1 sm:px-5 lg:flex-1 lg:px-8">
          <div className="my-auto align-middle">
            <img className="h-10 w-auto opacity-70 md:h-15 lg:h-20" src={aveMujicaLogo} />
          </div>
          <div className="my-auto text-center font-serif text-sm text-gray-800 md:text-xl lg:text-3xl">
            <div>一生、バンドしてくれる？</div>
            <div>{t('header.title')}</div>
          </div>
          <div className="my-auto align-middle">
            <img className="h-10 w-auto opacity-70 md:h-15 lg:h-20" src={mygoLogo} />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
