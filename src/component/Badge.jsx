import { useSelector } from "react-redux";

const Badge = (props) => {
  // Determine the category from props or default to "default"
  const category = props.category || "default";

  // Use useSelector to access the Redux store state
  const filteredMygoKeys = useSelector(
    (state) => state.content.filtered_mygoKeys
  );
  const filteredAveMujicaKeys = useSelector(
    (state) => state.content.filtered_ave_mujicaKeys
  );

  if (category === "mygo") {
    return (
      <>
        <span className="sr-only">Notifications</span>
        <div className="ml-2 inline-flex items-center justify-center w-8 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -end-2">
          {filteredMygoKeys.length > 99 ? "99+" : filteredMygoKeys.length}
        </div>
      </>
    );
  } else {
    return (
      <>
        <span className="sr-only">Notifications</span>
        <div className="ml-2 inline-flex items-center justify-center w-8 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -end-2">
          {filteredAveMujicaKeys.length > 99
            ? "99+"
            : filteredAveMujicaKeys.length}
        </div>
      </>
    );
  }
};

export default Badge;
