import React from "react";
import IntlMessages from "util/IntlMessages";

const Error404 = () => (
  <div className="gx-page-error-container">
    <div className="gx-page-error-content">
      <div className="gx-error-code gx-mb-4">404</div>
      <h2 className="gx-text-center">
        <IntlMessages id="extraPages.404Msg"/>
      </h2>
    </div>
  </div>
);

export default Error404;
