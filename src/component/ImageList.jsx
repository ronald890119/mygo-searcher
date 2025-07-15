import { useSelector } from "react-redux";
import ImageCard from "./ImageCard";
import "react-virtualized/styles.css"; // Import the styles for react-virtualized
import {
  CellMeasurer,
  CellMeasurerCache,
  List,
  AutoSizer,
  WindowScroller,
} from "react-virtualized";

const ImageList = () => {
  // Get the state from the Redux store
  const mygoTabClicked = useSelector((state) => state.content.mygoTabClicked);
  const filteredMygoKeys = useSelector(
    (state) => state.content.filtered_mygoKeys
  );
  const filteredAveMujicaKeys = useSelector(
    (state) => state.content.filtered_ave_mujicaKeys
  );

  // Construct the base URL for the S3 bucket
  const url_base = `https://s3.ap-east-2.amazonaws.com/mygo-ave-mujica.ronald890119.com/`;

  // Create a cache for the cell measurements
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 300,
  });

  // Define constants for cell dimensions
  const getColumnCount = () => {
    const viewportWidth = window.innerWidth;
    const columnCount =
      viewportWidth > 1024
        ? 4
        : viewportWidth > 768
        ? 3
        : viewportWidth > 640
        ? 2
        : 1;
    return columnCount;
  };

  // Calculate the number of rows based on the number of columns and the total number of items
  const getRowCount = () => {
    const columnCount = getColumnCount();
    const tempList = mygoTabClicked ? filteredMygoKeys : filteredAveMujicaKeys;
    return Math.ceil(tempList.length / columnCount);
  };

  // Render a row of images
  const renderRow = ({ index, key, style, parent }) => {
    const columnCount = getColumnCount();
    const tempList = mygoTabClicked ? filteredMygoKeys : filteredAveMujicaKeys;
    const rowItems = tempList.slice(
      index * columnCount,
      index * columnCount + columnCount
    );

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={index}
        parent={parent}
        rowIndex={index}
      >
        <div
          key={key}
          class="flex flex-row justify-center gap-4 py-4"
          style={style}
        >
          {rowItems.map((s3key) => {
            const imageUrl = `${url_base}${s3key}`;
            const caption = s3key.split("/").pop().split(".")[0];
            return <ImageCard s3key={s3key} url={imageUrl} caption={caption} />;
          })}
        </div>
      </CellMeasurer>
    );
  };

  return (
    <>
      <div class="w-full z-0">
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
