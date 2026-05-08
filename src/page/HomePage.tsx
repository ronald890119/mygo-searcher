import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import Tabs from '../component/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import ImageList from '../component/ImageList'
import {
  setAveMujicaKeys,
  setFilteredAveMujicaKeys,
  setFilteredMygoKeys,
  setMyGOKeys,
} from '../state/slice'
import BackToTopButton from '../component/BackToTopButton'
import type { RootState, AppDispatch } from '../state/store'
import { SearchIcon } from 'lucide-react'

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const mygoKeys = useSelector((state: RootState) => state.content.mygoKeys)
  const ave_mujicaKeys = useSelector((state: RootState) => state.content.ave_mujicaKeys)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [t, i18n] = useTranslation('global')
  const linkCopied = useSelector((state: RootState) => state.content.linkCopied)
  const imgCopied = useSelector((state: RootState) => state.content.imgCopied)

  useEffect(() => {
    const browserLanguage = navigator.language.substring(0, 2).toLowerCase()
    i18n.changeLanguage(browserLanguage === 'zh' ? 'zh' : 'en')
  }, [i18n])

  useEffect(() => {
    axios
      .get(
        'https://8t8c0l3nfh.execute-api.ap-east-2.amazonaws.com/production/list-s3-objects-by-json'
      )
      .then((response) => {
        dispatch(setMyGOKeys(response.data.body['mygo_keys']))
        dispatch(setAveMujicaKeys(response.data.body['ave_mujica_keys']))
        dispatch(setFilteredMygoKeys(response.data.body['mygo_keys']))
        dispatch(setFilteredAveMujicaKeys(response.data.body['ave_mujica_keys']))
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.error('Error fetching S3 keys:', error)
      })
  }, [dispatch])

  useEffect(() => {
    if (searchTerm.length === 0) {
      dispatch(setFilteredMygoKeys(mygoKeys))
      dispatch(setFilteredAveMujicaKeys(ave_mujicaKeys))
    } else {
      const currentItems1 = mygoKeys.filter((key) =>
        key.toLowerCase().split('/').pop()!.split('.')[0].includes(searchTerm.toLowerCase())
      )
      dispatch(setFilteredMygoKeys(currentItems1))

      const currentItems2 = ave_mujicaKeys.filter((key) =>
        key.toLowerCase().split('/').pop()!.split('.')[0].includes(searchTerm.toLowerCase())
      )
      dispatch(setFilteredAveMujicaKeys(currentItems2))
    }
  }, [searchTerm, mygoKeys, ave_mujicaKeys, dispatch])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <div className="mt-15">
        <form className="mx-auto max-w-4xl px-3">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="default-search"
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-4 ps-10 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder={t('form.placeholder')}
              value={searchTerm}
              onChange={handleSearchChange}
              required
            />
          </div>
        </form>
      </div>

      <div className="container mx-auto my-15 mt-5">
        <nav className="my-5 border-b border-gray-700 text-center text-sm font-medium text-gray-400">
          <div className="-mb-px flex flex-wrap">
            <Tabs />
          </div>
        </nav>

        <div className="z-0 flex flex-wrap justify-center">
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="h-8 w-8 animate-spin fill-blue-600 text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <ImageList />
          )}
        </div>
      </div>

      <div
        className="fixed bottom-2 left-1/2 z-5 flex -translate-x-1/2 rounded-lg border border-gray-600 bg-gray-800 p-4 text-sm text-gray-300"
        role="alert"
        hidden={!linkCopied}
      >
        <svg
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.29417 12.9577L10.5048 16.1681L17.6729 9"
            stroke="#64E3A1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{' '}
          <circle cx="12" cy="12" r="10" stroke="#64E3A1" strokeWidth="2"></circle>
        </svg>
      </div>

      <div
        className="fixed bottom-2 left-1/2 z-5 flex -translate-x-1/2 rounded-lg border border-gray-600 bg-gray-800 p-4 text-sm text-gray-300"
        role="alert"
        hidden={!imgCopied}
      >
        <svg
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.29417 12.9577L10.5048 16.1681L17.6729 9"
            stroke="#64E3A1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{' '}
          <circle cx="12" cy="12" r="10" stroke="#64E3A1" strokeWidth="2"></circle>
        </svg>
      </div>

      <BackToTopButton />
    </>
  )
}

export default HomePage
