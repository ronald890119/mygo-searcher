import { useEffect, useState } from 'react'

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 1000)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {visible && (
        <button
          className="fixed end-5 bottom-5 rounded-full bg-gray-500 p-4 transition duration-300 hover:cursor-pointer hover:bg-gray-600"
          onClick={scrollToTop}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="#FFFFFF"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="#FFFFFF"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </button>
      )}
    </>
  )
}

export default BackToTopButton
