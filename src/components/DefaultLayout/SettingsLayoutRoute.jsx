import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/settings.jsx";
import { Route } from "react-router-dom";
import { LayoutContext } from "../../context/layoutContext";
import jwtDecode from "jwt-decode";

const DefaultLayout = ({ children, routeType, pageName, ...rest }) => {
  let browserRouter = children.props.history.push;
  let fullProps = children.props;
  let currentRoute = children.props.location.pathname;

  const { appReduceSidebarWidth } = useContext(LayoutContext);

  return (
    <Layout
      routeType={routeType}
      currentRoute={currentRoute}
      browserRouter={browserRouter}
      fullProps={fullProps}
      pageName={pageName}
    >
      <div className="mt-4">{children}</div>
    </Layout>
  );
};

const DefaultLayoutRoute = ({
  component: Component,
  routeType,
  fullProps,
  pageName,
  ...rest
}) => {
  const [valid, setValid] = useState("loading");
  useEffect(() => {
    ValidateToken();
  }, [valid]);
  const ValidateToken = () => {
    let token = localStorage.getItem("token");
    if (token == undefined || token == null || token == "") {
      localStorage.clear();
      return setValid(false);
    }
    if (jwtDecode(token).exp < Date.now() / 1000) {
      localStorage.clear();
      return setValid(false);
    }
    setValid(true);
  };
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        return valid == "loading" ? (
          ""
        ) : valid == false ? (
          (window.location.href = "/")
        ) : (
          <DefaultLayout
            routeType={routeType}
            page={rest.page}
            fullProps={fullProps}
            pageName={pageName}
          >
            <Component {...matchProps} />
          </DefaultLayout>
        );
      }}
    />
  );
};
export default DefaultLayoutRoute;
