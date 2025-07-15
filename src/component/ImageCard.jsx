import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLinkCopied, setImgCopied } from "../state/slice";

const ImageCard = (props) => {
  // useDispatch is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
  const [showButtons, setShowButtons] = useState(false);
  const filename = props.s3key.split("/").pop().split(".")[0];
  const base = props.url.substring(0, props.url.lastIndexOf("/") + 1);

  const handleDownload = () => {
    axios
      .get(
        `https://oeqhffl626.execute-api.ap-east-2.amazonaws.com/production/get-presigned-url?key=${props.s3key}`
      )
      .then((response) => {
        const url = response.data.url;
        const link = document.createElement("a");
        link.href = url;
        link.download = props.s3key.split("/").pop(); // Set filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error fetching presigned URL:", error);
      });
  };

  const handleCopyLink = async () => {
    try {
      const link = props.url;
      await navigator.clipboard.writeText(link);
      dispatch(setLinkCopied(true));
      setTimeout(() => dispatch(setLinkCopied(false)), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCopyImg = async () => {
    try {
      const data = new ClipboardItem({
        "image/png": (async () => {
          const response = await fetch(props.url);
          return await response.blob();
        })(),
      });
      await navigator.clipboard.write([data]);
      dispatch(setImgCopied(true));
      setTimeout(() => dispatch(setImgCopied(false)), 2000);
    } catch (error) {
      console.error("Failed to copy image: ", err);
    }
  };

  return (
    <>
      <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-sm mx-auto bg-gray-100 border border-gray-700 rounded-lg shadow-sm">
        <div
          class="aspect-[16/9] bg-gray-200 relative overflow-hidden rounded-t-lg"
          onMouseEnter={() => setShowButtons(true)}
          onMouseLeave={() => setShowButtons(false)}
        >
          <img
            class="rounded-t-lg absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
            loading="lazy"
            src={`${base}small/${filename}.jpg`}
            alt="/blur_bg.jpg"
            onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
          />
          <div
            className="z-5 flex items-center justify-center absolute inset-0"
            hidden={!showButtons}
          >
            <svg
              className="w-10 h-10 mx-5 bg-gray-500/40 rounded-full p-2 hover:cursor-pointer hover:bg-gray-500/70 transition-all duration-200"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleCopyImg}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
                fill="#FFFFFF"
              ></path>
              <path
                d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
                fill="#FFFFFF"
              ></path>
            </svg>
            <svg
              className="w-10 h-10 mx-5 bg-gray-500/40 rounded-full p-2 hover:cursor-pointer hover:bg-gray-500/70 transition-all duration-200"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleCopyLink}
            >
              <path
                d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16"
                stroke="#FFFFFF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <svg
              className="w-10 h-10 mx-5 bg-gray-500/40 rounded-full p-2 hover:cursor-pointer hover:bg-gray-500/70 transition-all duration-200"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleDownload}
            >
              <path
                id="Vector"
                d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                stroke="#FFFFFF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <div class="p-5 flex justify-between">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
            {props.caption}
          </h5>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
