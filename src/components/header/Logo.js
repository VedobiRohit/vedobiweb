import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom"
// import {logo} from '../../assets/images/logo/logo.webp'
// import logomp4 from '../../assets/video/logo.mp4'

export const Logo = ({ logoClass }) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link to="/">
        {/* <img alt="Website Logo" className="img-fluid"  src="" /> */}
        <video autoPlay loop muted playsInline poster="../../assets/images/logo/logo.webp">
          <source src='../../assets/video/logo.mp4' type="video/mp4" />
        </video>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

