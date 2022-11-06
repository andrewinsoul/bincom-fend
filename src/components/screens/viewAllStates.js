import { useNavigate } from "react-router-dom";
import { RenderTable } from "../common/table";

export const ViewAllStates = ({ states }) => {
  const navigate = useNavigate();
  const handleButtonClick = (stateId, stateName) => () => {
    if (+stateId !== 25) {
      alert("Only Delta State data is available for now");
      return;
    }
    navigate(`/view/pollingunits/${stateId}`, { state: stateName });
  };
  const handleButtonClick2 = (stateId, stateName) => () => {
    if (+stateId !== 25) {
      alert("Only Delta State data is available for now");
      return;
    }
    navigate(`/view/localgovt/${stateId}`, { state: stateName });
  };
  return (
    <>
      <h4>All States</h4>
      <p>View all states</p>
      <RenderTable
        data={states}
        tableDataArray={["state_name"]}
        tableHeadItemArray={["Name of State", "Action"]}
        buttonText="View Polling Units"
        buttonFunction={handleButtonClick}
        buttonFunctionArg1="state_id"
        buttonFunctionArg2="state_name"
        buttonText2="View Local Govt"
        buttonFunction2={handleButtonClick2}
        buttonFunctionArg21="state_id"
        buttonFunctionArg22="state_name"
      />
    </>
  );
};
