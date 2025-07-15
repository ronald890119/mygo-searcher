import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Tabs from "../component/Tabs";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "../component/ImageList";
import {
  setAveMujicaKeys,
  setFilteredAveMujicaKeys,
  setFilteredMygoKeys,
  setMyGOKeys,
} from "../state/slice";

// This component fetches images from an S3 bucket and displays them with a search functionality
const HomePage = () => {
  // useDispatch is used to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // mygoKeys and ave_mujicaKeys are used to store the keys of images from the S3 bucket
  const mygoKeys = useSelector((state) => state.content.mygoKeys);
  const ave_mujicaKeys = useSelector((state) => state.content.ave_mujicaKeys);

  // loading will indicate whether the images are still being fetched
  const [loading, setLoading] = useState(true);

  // searchTerm will hold the current search input from the user
  const [searchTerm, setSearchTerm] = useState("");

  // useTranslation hook is used to handle translations in the application
  const [t, i18n] = useTranslation("global");

  // linkCopied and imgCopied are used to show notifications when a link or image is copied
  const linkCopied = useSelector((state) => state.content.linkCopied);
  const imgCopied = useSelector((state) => state.content.imgCopied);

  // This effect sets the language based on the browser's language setting
  useEffect(() => {
    const browserLanguage = navigator.language.substring(0, 2).toLowerCase();
    i18n.changeLanguage(browserLanguage === "zh" ? "zh" : "en");
  }, []);

  // This effect fetches all objects from the S3 bucket when the component mounts
  useEffect(() => {
    axios
      .get(
        "https://8t8c0l3nfh.execute-api.ap-east-2.amazonaws.com/production/list-s3-objects-by-json"
      )
      .then((response) => {
        dispatch(setMyGOKeys(response.data.body["mygo_keys"]));
        dispatch(setAveMujicaKeys(response.data.body["ave_mujica_keys"]));
        dispatch(setFilteredMygoKeys(response.data.body["mygo_keys"]));
        dispatch(
          setFilteredAveMujicaKeys(response.data.body["ave_mujica_keys"])
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching S3 keys:", error);
      });
  }, []);

  // This effect runs whenever the searchTerm changes
  useEffect(() => {
    // If the search term is empty, show all keys
    if (searchTerm.length === 0) {
      dispatch(setFilteredMygoKeys(mygoKeys));
      dispatch(setFilteredAveMujicaKeys(ave_mujicaKeys));
    } else {
      // Filter the keys based on the search term
      const currentItems1 = mygoKeys.filter((key) =>
        key
          .toLowerCase()
          .split("/")
          .pop()
          .split(".")[0]
          .includes(searchTerm.toLowerCase())
      );

      // Update the filteredKeys state with the current items
      dispatch(setFilteredMygoKeys(currentItems1));

      const currentItems2 = ave_mujicaKeys.filter((key) =>
        key
          .toLowerCase()
          .split("/")
          .pop()
          .split(".")[0]
          .includes(searchTerm.toLowerCase())
      );
      dispatch(setFilteredAveMujicaKeys(currentItems2));
    }
  }, [searchTerm]);

  // This function handles changes in the search input field
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div class="mt-50">
        <form class="max-w-4xl mx-auto px-3">
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm  border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder={t("form.placeholder")}
              value={searchTerm}
              onChange={handleSearchChange}
              required
            />
          </div>
        </form>
      </div>

      <div class="container mx-auto my-15 mt-5">
        <nav class="my-5 text-sm font-medium text-center border-b text-gray-400 border-gray-700">
          <div class="flex flex-wrap -mb-px">
            <Tabs />
          </div>
        </nav>

        <div class="flex justify-center flex-wrap z-0">
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <ImageList />
          )}
        </div>
      </div>

      <div
        class="z-5 fixed bottom-2 left-1/2 -translate-x-1/2 p-4 flex text-sm border rounded-lg bg-gray-800 text-gray-300 border-gray-600"
        role="alert"
        hidden={!linkCopied}
      >
        <svg
          class="w-10 h-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.29417 12.9577L10.5048 16.1681L17.6729 9"
            stroke="#64E3A1"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#64E3A1"
            stroke-width="2"
          ></circle>
        </svg>
      </div>

      <div
        class="z-5 fixed bottom-2 left-1/2 -translate-x-1/2 p-4 flex text-sm border rounded-lg bg-gray-800 text-gray-300 border-gray-600"
        role="alert"
        hidden={!imgCopied}
      >
        <svg
          class="w-10 h-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.29417 12.9577L10.5048 16.1681L17.6729 9"
            stroke="#64E3A1"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#64E3A1"
            stroke-width="2"
          ></circle>
        </svg>
      </div>
    </>
  );
};

export default HomePage;
