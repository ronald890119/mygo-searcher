import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../state/store'
import { setLinkCopied, setImgCopied } from '../state/slice'
import { CopyIcon, DownloadIcon, Link2Icon } from 'lucide-react'

interface ImageCardProps {
  s3key: string
  url: string
  caption: string
}

const ImageCard = ({ s3key, url, caption }: ImageCardProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [showButtons, setShowButtons] = useState(false)
  const filename = s3key.split('/').pop()!.split('.')[0]
  const base = url.substring(0, url.lastIndexOf('/') + 1)

  const handleDownload = () => {
    axios
      .get(
        `https://oeqhffl626.execute-api.ap-east-2.amazonaws.com/production/get-presigned-url?key=${s3key}`
      )
      .then((response) => {
        const presignedUrl = response.data.url as string
        const link = document.createElement('a')
        link.href = presignedUrl
        link.download = s3key.split('/').pop()!
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      .catch((error) => {
        console.error('Error fetching presigned URL:', error)
      })
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      dispatch(setLinkCopied(true))
      setTimeout(() => dispatch(setLinkCopied(false)), 2000)
    } catch (error) {
      console.error('Failed to copy text: ', error)
    }
  }

  const handleCopyImg = async () => {
    try {
      const data = new ClipboardItem({
        'image/png': (async () => {
          const response = await fetch(url)
          return await response.blob()
        })(),
      })
      await navigator.clipboard.write([data])
      dispatch(setImgCopied(true))
      setTimeout(() => dispatch(setImgCopied(false)), 2000)
    } catch (error) {
      console.error('Failed to copy image: ', error)
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-sm rounded-lg border border-gray-700 bg-gray-100 shadow-sm sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div
          className="relative aspect-video overflow-hidden rounded-t-lg bg-gray-200"
          onMouseEnter={() => setShowButtons(true)}
          onMouseLeave={() => setShowButtons(false)}
        >
          <img
            className="absolute top-0 left-0 h-full w-full rounded-t-lg object-cover opacity-0 transition-opacity duration-300"
            loading="lazy"
            src={`${base}small/${filename}.jpg`}
            alt="/blur_bg.jpg"
            onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
          />
          <div
            className="absolute inset-0 z-5 flex items-center justify-center"
            hidden={!showButtons}
          >
            <CopyIcon
              className="mx-5 h-10 w-10 rounded-full bg-gray-500/40 p-2 text-white transition-all duration-200 hover:cursor-pointer hover:bg-gray-500/70"
              onClick={handleCopyImg}
            />
            <Link2Icon
              className="mx-5 h-10 w-10 rounded-full bg-gray-500/40 p-2 text-white transition-all duration-200 hover:cursor-pointer hover:bg-gray-500/70"
              onClick={handleCopyLink}
            />
            <DownloadIcon
              className="mx-5 h-10 w-10 rounded-full bg-gray-500/40 p-2 text-white transition-all duration-200 hover:cursor-pointer hover:bg-gray-500/70"
              onClick={handleDownload}
            />
          </div>
        </div>
        <div className="flex justify-between rounded-b-lg bg-gray-100 p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">{caption}</h5>
        </div>
      </div>
    </>
  )
}

export default ImageCard
