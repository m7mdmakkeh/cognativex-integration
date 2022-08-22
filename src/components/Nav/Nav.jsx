import React from 'react';
import '../../css/App.css'
import './Nav.css'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';


const Nav = () => {
    
    return (
        <div className='mg-auto nav-container'>
            <ul>
                <CustomLink to="/integration"> Integration Docs </CustomLink>
                <CustomLink to="/integration/metadatachecker"> MetaData Checker </CustomLink>
                {/* <CustomLink to="/joinus"> Join Us </CustomLink> */}
                {/* <CustomLink to="/aboutus"> About Us </CustomLink> */}
                {/* <CustomLink to="/contactus"> Contact Us </CustomLink> */}
               
                {/* <span className="movingActiveLine"></span> */}
            </ul>
        </div>
    );
}

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});
    return(
      <li className={isActive ? "active"  :""}>
        <Link to={to} {... props}> 
          {children}
        </Link>
      </li>
    )
}

export default Nav;
