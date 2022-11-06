import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Text } from "../common/text";
import { ViewAllStates } from "../screens/viewAllStates";
import Api from "../../utils/service";
import { ViewAllPollingUnits } from "../screens/viewAllPollingUnits";
import { ViewResultOfAPollingUnit } from "../screens/viewResultOfAPollingUnit";
import { ViewAllLocalGovt } from "../screens/viewAllLocalGovt";
import { AddResult } from "../screens/addResult";

export const Paths = () => {
  const [allStates, setAllStates] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllStates = async () => {
      try {
        setLoading(true);
        const res = await Api.get("/fetch/all/states");
        setAllStates(res.data.data);
      } catch (error) {
        alert(error.message || "An error occured while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchAllStates();
  }, []);
  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <Routes>
      <Route index element={<ViewAllStates states={allStates} />} />
      <Route
        exact
        path="/states"
        element={<ViewAllStates states={allStates} />}
      />
      <Route
        exact
        path="/view/pollingunits/:stateId"
        element={<ViewAllPollingUnits />}
      />
      <Route
        exact
        path="view/result/pollingunit/:pollUnitId"
        element={<ViewResultOfAPollingUnit />}
      />
      <Route
        exact
        path="view/localgovt/:stateId"
        element={<ViewAllLocalGovt />}
      />
      <Route exact path="add/result/:pollUnitId" element={<AddResult />} />
    </Routes>
  );
};
