import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "../common/text";
import Api from "../../utils/service";
import { RenderTable } from "../common/table";

export const ViewAllPollingUnits = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [allPollingUnits, setAllPollingUnits] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await Api.get(`/fetch/all/pollingunit`);
        setAllPollingUnits(res.data.data);
      } catch (err) {
        alert(
          err.message ||
            "An error occured while loading the polling units in state"
        );
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);
  const { state } = useLocation();
  const handleButtonClick = (pollUnitId, lgaName) => () => {
    navigate(`/view/result/pollingunit/${pollUnitId}`, { state: lgaName });
  };
  const handleButtonClick2 = (pollingUnitName, pollUnitId) => () => {
    navigate(`/add/result/${pollUnitId}`, { state: pollingUnitName });
  };
  return (
    <>
      <h4>{`All Polling Units in ${state}`}</h4>
      <Text>View all polling units</Text>
      <button onClick={() => alert("Feature coming soon...")}>
        Add a new polling unit
      </button>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <RenderTable
          data={allPollingUnits}
          tableHeadItemArray={[
            "Name of Polling Unit",
            "Polling Unit Description",
            "Polling Unit Number",
            "Name of Local Government",
            "Action",
          ]}
          tableDataArray={[
            "polling_unit_name",
            "polling_unit_description",
            "polling_unit_number",
            "lga_name",
          ]}
          buttonText="View Results"
          buttonFunction={handleButtonClick}
          buttonFunctionArg1="uniqueid"
          buttonFunctionArg2="lga_name"
          buttonText2="Add Result"
          buttonFunction2={handleButtonClick2}
          buttonFunctionArg21="polling_unit_name"
          buttonFunctionArg22="uniqueid"
        />
      )}
    </>
  );
};
