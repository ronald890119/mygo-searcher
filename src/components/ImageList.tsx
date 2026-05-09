import { useSelector } from "react-redux";
import ImageCard from "./ImageCard";
import "react-virtualized/styles.css";
import {
  CellMeasurer,
  CellMeasurerCache,
  List,
  AutoSizer,
  WindowScroller,
} from "react-virtualized";
import type { ListRowProps } from "react-virtualized";
import type { RootState } from "../state/store";

const ImageList = () => {
  const mygoTabClicked = useSelector((state: RootState) => state.content.mygoTabClicked);
  const filteredMygoKeys = useSelector((state: RootState) => state.content.filtered_mygoKeys);
  const filteredAveMujicaKeys = useSelector(
    (state: RootState) => state.content.filtered_ave_mujicaKeys
  );

  const url_base = `https://s3.ap-east-2.amazonaws.com/mygo-ave-mujica.ronald890119.com/`;

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 300,
  });

  const getColumnCount = (): number => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth > 1024) return 4;
    if (viewportWidth > 768) return 3;
    if (viewportWidth > 640) return 2;
    return 1;
  };

  const getRowCount = (): number => {
    const columnCount = getColumnCount();
    const tempList = mygoTabClicked ? filteredMygoKeys : filteredAveMujicaKeys;
    return Math.ceil(tempList.length / columnCount);
  };

  const renderRow = ({ index, key, style, parent }: ListRowProps) => {
    const columnCount = getColumnCount();
    const tempList = mygoTabClicked ? filteredMygoKeys : filteredAveMujicaKeys;
    const rowItems = tempList.slice(index * columnCount, index * columnCount + columnCount);

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={index} parent={parent} rowIndex={index}>
        <div key={key} className="flex flex-row justify-center gap-4 py-4" style={style}>
          {rowItems.map((s3key) => {
            const imageUrl = `${url_base}${s3key}`;
            const caption = s3key.split("/").pop()!.split(".")[0];
            return <ImageCard key={s3key} s3key={s3key} url={imageUrl} caption={caption} />;
          })}
        </div>
      </CellMeasurer>
    );
  };

  return (
    <>
      <div className="z-0 w-full">
        <WindowScroller>
          {({ height, scrollTop }) => (
            <>
              <AutoSizer disableHeight onResize={() => cache.clearAll()}>
                {({ width }) => (
                  <List
                    autoHeight
                    height={height}
                    rowCount={getRowCount()}
                    rowHeight={cache.rowHeight}
                    rowRenderer={renderRow}
                    width={width}
                    scrollTop={scrollTop}
                    overscanRowCount={10}
                  />
                )}
              </AutoSizer>
            </>
          )}
        </WindowScroller>
      </div>
    </>
  );
};

export default ImageList;
