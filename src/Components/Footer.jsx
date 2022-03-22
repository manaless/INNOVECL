import React from "react";
import 'element-theme-default';
import './style.css';

function Footer() {
    const onSelect = () => {}

    return ( 
      
      <div class="footer">
      &copy; {new Date().getFullYear()} Copyright: InnovEcl 
    </div>
    
    );
}


export default Footer;