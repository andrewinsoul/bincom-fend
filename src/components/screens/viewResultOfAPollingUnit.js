import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Text } from "../common/text";
import Api from "../../utils/service";
import { RenderTable } from "../common/table";

export const ViewResultOfAPollingUnit = () => {
  const [loading, setLoading] = useState(false);
  const [allResultOfAPollingUnit, setAllResultOfAPollingUnit] = useState([]);
  const { pollUnitId } = useParams();
  const { state: lgaName } = useLocation();
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await Api.get(
          `/fetch/pollingUnit/result?pollUnitId=${pollUnitId}`
        );
        setAllResultOfAPollingUnit(res.data.data);
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
  }, [pollUnitId]);

  return (
    <>
      <h4>{`Results of ${lgaName} Polling Unit`}</h4>
      <Text>View results of a polling unit</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <RenderTable
          data={allResultOfAPollingUnit}
          tableDataArray={[
            "party_abbreviation",
            "party_score",
            "entered_by_user",
            "user_ip_address",
            "date_entered",
          ]}
          tableHeadItemArray={[
            "Party Abbrev",
            "Party Score",
            "User that Collated",
            "User Ip Address",
            "Date Entered",
          ]}
        />
      )}
    </>
  );
};
