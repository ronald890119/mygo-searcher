import { useEffect, useState } from "react";
import ImageCard from "../component/ImageCard";
import axios from "axios";
import { useTranslation } from "react-i18next";

// This component fetches images from an S3 bucket and displays them with a search functionality
const HomePage = () => {
  // keys will hold the list of image keys from the S3 bucket
  const [keys, setKeys] = useState([]);
  // loading will indicate whether the images are still being fetched
  const [loading, setLoading] = useState(true);
  // searchTerm will hold the current search input from the user
  const [searchTerm, setSearchTerm] = useState("");
  // filteredKeys will hold the keys that match the search term
  const [filteredKeys, setFilteredKeys] = useState([]);
  // useTranslation hook is used to handle translations in the application
  const [t, i18n] = useTranslation("global");

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
        setKeys(response.data.body["mygo_keys"]);
        setFilteredKeys(response.data.body["mygo_keys"]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching S3 keys:", error);
      });
  }, []);

  // This effect runs whenever the searchTerm changes
  useEffect(() => {
    console.log(`Search term: ${searchTerm}`);

    // If the search term is empty, show all keys
    if (searchTerm.length === 0) {
      setFilteredKeys(keys);
    } else {
      // Filter the keys based on the search term
      const currentItems = keys.filter((key) =>
        key
          .toLowerCase()
          .split("/")
          .pop()
          .split(".")[0]
          .includes(searchTerm.toLowerCase())
      );

      // Update the filteredKeys state with the current items
      setFilteredKeys(currentItems);
      console.log(`Current items after search: ${currentItems}`);
    }
  }, [searchTerm]);

  // This function handles changes in the search input field
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Construct the base URL for the S3 bucket
  const url_base = `https://s3.ap-east-2.amazonaws.com/mygo-ave-mujica.ronald890119.com/`;

  return (
    <>
      <div class="mt-30 md:mt-35 lg:mt-40">
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

      <div class="container mx-auto my-15">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            filteredKeys.map((key) => (
              <ImageCard
                key={key}
                s3key={key}
                url={`${url_base}${key}`}
                caption={key.split("/").pop().split(".")[0]} // Use the last part of the key as the caption
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
