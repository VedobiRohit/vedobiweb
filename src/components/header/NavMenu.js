import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllCategories,
  fetchCategory,
} from "../../redux/products/products_actions";

export const NavMenu = () => {
  const categories = useSelector((state) => state.products.allCategories);
  const { sidebarOpen } = useSelector((state) => state.products);
  const [toggle] = useState(false);
  const [elem, setElem] = useState("");

  
  const menuRef = useRef(null);
  const dispatch = useDispatch();



  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchAllCategories());
      dispatch(fetchCategory());
    }
  }, [dispatch, categories]);

  const handleSubmenu = () => {
    if (elem) {
      elem.style.display = "none";
      setElem("");
    //   dispatch(toggleSidebar(false));
    }
  };

  const createSubMenu = (catUrl, subMenu) => {
    return subMenu.map((subMenuData) => (
      <li key={subMenuData?.sub_id}>
        <Link
          onClick={handleSubmenu}
          to={`/collections/${subMenuData?.cat_url}/${subMenuData?.subcat_url}`}
        >
          {subMenuData?.sub_name}
        </Link>
      </li>
    ));
  };

  useEffect(() => {
    if (elem && sidebarOpen) {
      // elem.style.position = 'relative';
      elem.style.display = "block";
      // elem.style.transform = 'rotateX(0deg)';
      // elem.style.visibility = 'visible';
      // menuRef.current.scrollIntoView({ behavior: 'smooth' })
    } else if (elem && !sidebarOpen) {
      // elem.style.position = 'absolute';
      elem.style.display = "block";
      elem.style.visibility = "visible";
    }
  }, [elem, sidebarOpen, toggle]);

  const handleMenu = (e) => {
    if (e) {
      const subMenu = e?.target?.children[1];
      if (elem) {
        if (subMenu === elem) {
          elem.style.display = "none";
          setElem("");
        } else {
          elem.style.display = "none";
          setElem(subMenu);
        }
      } else {
        setElem(subMenu);
      }
    }
  };
  const handleOnMouseOver = (e) => {
    const subMenu = e?.target?.children[1];
    if (!sidebarOpen && subMenu) {
      if (elem === subMenu) {
        // setToggle(!toggle)
      } else {
        setElem(subMenu);
      }
    }
  };

  const createMenu = (menuData) => {
    return (
      <li key={menuData?.cat_id}>
        {menuData?.submenu.length > 0 ? (
          <span onClick={handleMenu} onMouseOver={handleOnMouseOver}>
            {menuData?.cat_name}
            <i className="fa fa-angle-down" />
            <ul className="submenu">
              {createSubMenu(menuData?.cat_url, menuData?.submenu)}
            </ul>
          </span>
        ) : (
          <>
            <Link to={`/collections/${menuData?.cat_url}`}>
              {menuData?.cat_name}
            </Link>
          </>
        )}
      </li>
    );
  };

  return (
    <div className="main-menu">
      <nav>
        <ul>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li style={{ width: 0, height: 0, visibility: "hidden" }}>
            <div style={{ width: 0, height: 0 }} ref={menuRef} />
          </li>
          {categories?.MainMenu?.map(createMenu)}
          <li>
            <Link to="/blogs/ayurveda-book">Ayurveda Care</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

