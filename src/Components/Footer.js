import React from "react";
import 'element-theme-default';

function Footer() {
    const onSelect = () => {}

    return ( 
      <div className="Footer">
      &copy; {new Date().getFullYear()} Copyright: InnovEcl 
    </div>
    );
}


export default Footer;