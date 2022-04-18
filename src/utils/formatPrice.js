const formatPrice = (price) => {
  let formatedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format((price));

  return formatedPrice;
};

export { formatPrice };
