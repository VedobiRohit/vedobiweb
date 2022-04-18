import {
  OPEN_SIDE_CART,
  CLOSE_SIDE_CART,
  TOGGLE_SIDE_CART,
  TOGGLE_SIDE_BAR,
  CLOSE_SIDEBAR,
  SHOW_DRAWER,
  CLOSE_DRAWER
} from './sidebar_types';

export const openSideCart = () => {
  return { type: OPEN_SIDE_CART };
};

export const closeSideCart = () => {
  return { type: CLOSE_SIDE_CART };
};

export const toggleSideCart = () => {
  return { type: TOGGLE_SIDE_CART };
};

export const toggleSidebar = (act) => {
  return { type: TOGGLE_SIDE_BAR ,payload:act };
};

export const closeSidebar = () => {
  return { type: CLOSE_SIDEBAR };
};

export const openDrawer = () => {
  return { type: SHOW_DRAWER };
};

export const closeDrawer = () => {
  return { type: CLOSE_DRAWER };
};
