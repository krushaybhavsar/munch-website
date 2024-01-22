import React, { ReactElement, ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

type PrivateRoutesProps = {
  paths: string[];
  children: ReactNode[];
  userDataDoc: string | null;
};

const PrivateRoutes = (
  props: PrivateRoutesProps
): ReactElement<PrivateRoutesProps> => {
  return (
    <Routes>
      {props.paths.map((routePath, index) => (
        <Route
          path={routePath}
          key={routePath}
          element={
            !props.userDataDoc ? <Navigate to="/" /> : props.children[index]
          }
        />
      ))}
    </Routes>
  );
};

export default PrivateRoutes;
