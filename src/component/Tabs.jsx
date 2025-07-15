import { useDispatch, useSelector } from "react-redux";
import Badge from "./Badge";
import { toggleMygoTabClicked } from "../state/slice";

const Tabs = () => {
  // useDispatch is used to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // useSelector is used to access the Redux store state
  const mygoTabClicked = useSelector((state) => state.content.mygoTabClicked);

  // handleClick function dispatches the toggleMygoTabClicked action when a tab is clicked
  const handleClick = () => {
    dispatch(toggleMygoTabClicked());
  };

  return (
    <>
      <button
        onClick={handleClick}
        class={`inline-block p-4 border-b-2 rounded-t-lg hover:cursor-pointer transition-colors duration-300 ease-in-out ${
          mygoTabClicked
            ? "border-transparent hover:text-gray-300"
            : "border-blue-500 text-blue-500"
        }`}
      >
        Ave Mujica
        <Badge category={"ave_mujica"} />
      </button>
      <button
        onClick={handleClick}
        class={`inline-block p-4 border-b-2 rounded-t-lg hover:cursor-pointer transition-colors duration-300 ease-in-out ${
          mygoTabClicked
            ? "border-blue-500 text-blue-500"
            : "border-transparent hover:text-gray-300"
        }`}
      >
        MyGO!!!!!
        <Badge category={"mygo"} />
      </button>
    </>
  );
};

export default Tabs;
