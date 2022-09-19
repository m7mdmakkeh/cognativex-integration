import React from 'react';
import '../../css/App.css'
import './Nav.css'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';


const Nav = () => {
    
    return (
        <div className='mg-auto nav-container'>
            <ul>
                <CustomLink to="/integration/select"> Select </CustomLink>
                <CustomLink to="/integration/controller"> Controller </CustomLink>
                <CustomLink to="/integration/multiSelect"> MultiSelect </CustomLink>
                <CustomLink to="/integration/SelectWPills"> SelectWPills </CustomLink>
                <CustomLink to="/integration/SegmentCard"> SegmentCard </CustomLink>
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
