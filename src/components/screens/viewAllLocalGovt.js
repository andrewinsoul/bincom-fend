import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Text } from "../common/text";
import Api from "../../utils/service";
import { RenderTable } from "../common/table";

export const ViewAllLocalGovt = () => {
  const [loading, setLoading] = useState(false);
  const [allLocalGovt, setAllLocalGovt] = useState([]);
  const { stateId } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await Api.get(`/fetch/all/lga?stateId=${stateId}`);
        setAllLocalGovt(res.data.data);
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
  }, [stateId]);

  const handleButtonClick = (lgaId, lgaName) => async () => {
    try {
      const res = await Api.get(`/fetch/sum/total/pollingUnit?lgaId=${lgaId}`);
      alert(
        `The total score for all polling units in ${lgaName} is: ${Number(
          res.data.data.total
        ).toLocaleString()}`
      );
    } catch (error) {
      alert(error.message || "An error occured");
    }
  };
  return (
    <>
      <h4>{`All Local Government in ${state}`}</h4>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <RenderTable
          data={allLocalGovt}
          buttonText="View Total Result of All Units"
          buttonFunction={handleButtonClick}
          tableHeadItemArray={[
            "Name of Local Government",
            "Description of LG",
            "Date Entered",
            "Name of User who Collated",
            "User Ip Address",
            "Action",
          ]}
          tableDataArray={[
            "lga_name",
            "lga_description",
            "date_entered",
            "entered_by_user",
            "user_ip_address",
          ]}
          buttonFunctionArg1="lga_id"
          buttonFunctionArg2="lga_name"
        />
      )}
    </>
  );
};
