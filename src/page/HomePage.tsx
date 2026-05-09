import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "../components/ImageList";
import {
  setAveMujicaKeys,
  setFilteredAveMujicaKeys,
  setFilteredMygoKeys,
  setMyGOKeys,
  toggleMygoTabClicked,
} from "../state/slice";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import BackToTopButton from "../components/BackToTopButton";
import type { RootState, AppDispatch } from "../state/store";
import { SearchInput } from "@/components/search-input";
import { Spinner } from "@/components/ui/spinner";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CircleCheckBigIcon, MessageSquareWarningIcon } from "lucide-react";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mygoKeys = useSelector((state: RootState) => state.content.mygoKeys);
  const ave_mujicaKeys = useSelector((state: RootState) => state.content.ave_mujicaKeys);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [t, i18n] = useTranslation("global");
  const mygoTabClicked = useSelector((state: RootState) => state.content.mygoTabClicked);
  const filteredMygoKeys = useSelector((state: RootState) => state.content.filtered_mygoKeys);
  const filteredAveMujicaKeys = useSelector(
    (state: RootState) => state.content.filtered_ave_mujicaKeys
  );
  const linkCopied = useSelector((state: RootState) => state.content.linkCopied);
  const imgCopied = useSelector((state: RootState) => state.content.imgCopied);

  const handleTabChange = (value: string) => {
    const shouldBeMygo = value === "mygo";
    if (shouldBeMygo !== mygoTabClicked) {
      dispatch(toggleMygoTabClicked());
    }
  };

  useEffect(() => {
    const browserLanguage = navigator.language.substring(0, 2).toLowerCase();
    i18n.changeLanguage(browserLanguage === "zh" ? "zh" : "en");
  }, [i18n]);

  useEffect(() => {
    axios
      .get(
        "https://8t8c0l3nfh.execute-api.ap-east-2.amazonaws.com/production/list-s3-objects-by-json"
      )
      .then((response) => {
        dispatch(setMyGOKeys(response.data.body["mygo_keys"]));
        dispatch(setAveMujicaKeys(response.data.body["ave_mujica_keys"]));
        dispatch(setFilteredMygoKeys(response.data.body["mygo_keys"]));
        dispatch(setFilteredAveMujicaKeys(response.data.body["ave_mujica_keys"]));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching S3 keys:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      dispatch(setFilteredMygoKeys(mygoKeys));
      dispatch(setFilteredAveMujicaKeys(ave_mujicaKeys));
    } else {
      const currentItems1 = mygoKeys.filter((key) =>
        key.toLowerCase().split("/").pop()!.split(".")[0].includes(searchTerm.toLowerCase())
      );
      dispatch(setFilteredMygoKeys(currentItems1));

      const currentItems2 = ave_mujicaKeys.filter((key) =>
        key.toLowerCase().split("/").pop()!.split(".")[0].includes(searchTerm.toLowerCase())
      );
      dispatch(setFilteredAveMujicaKeys(currentItems2));
    }
  }, [searchTerm, mygoKeys, ave_mujicaKeys, dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="mt-15">
        <form className="mx-auto max-w-4xl px-3">
          <SearchInput
            placeholder={t("form.placeholder")}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      <div className="container mx-auto my-15 mt-5">
        <nav className="my-5 border-b border-gray-700 text-center text-sm font-medium text-gray-400">
          <div className="-mb-px flex flex-wrap">
            <Tabs value={mygoTabClicked ? "mygo" : "ave_mujica"} onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="ave_mujica">
                  Ave Mujica
                  <Badge>
                    {filteredAveMujicaKeys.length > 99 ? "99+" : filteredAveMujicaKeys.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="mygo">
                  MyGO!!!!!
                  <Badge>{filteredMygoKeys.length > 99 ? "99+" : filteredMygoKeys.length}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </nav>

        <div className="z-0 flex flex-wrap justify-center">
          {loading ? (
            <div role="status">
              <Spinner className="size-8 text-blue-400" />
            </div>
          ) : (mygoTabClicked ? filteredMygoKeys : filteredAveMujicaKeys).length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <MessageSquareWarningIcon className="text-gray-400" />
                </EmptyMedia>
                <EmptyTitle>No Result</EmptyTitle>
                <EmptyDescription>No Image Found</EmptyDescription>
              </EmptyHeader>
            </Empty>
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
        <CircleCheckBigIcon className="h-10 w-10 text-green-400" />
      </div>

      <div
        className="fixed bottom-2 left-1/2 z-5 flex -translate-x-1/2 rounded-lg border border-gray-600 bg-gray-800 p-4 text-sm text-gray-300"
        role="alert"
        hidden={!imgCopied}
      >
        <CircleCheckBigIcon className="h-10 w-10 text-green-400" />
      </div>

      <BackToTopButton />
    </>
  );
};

export default HomePage;
