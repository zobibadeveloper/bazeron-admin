const getProductLink = (key, id) => {
  if (key === "n" || key === 2) {
    return `/product-detail/184569${id}-n`;
  } else {
    return `/product-detail/184569${id}-n`;
  }
};

const getApiLink = (key, id, prettyUrl = false) => {
  if (key === "n" || key === 2) {
    return `https://api.n11.com/ws/ProductService.wsdl`;
  } else {
    return `https://api.n11.com/ws/ProductService.wsdl`;
  }
};

export { getProductLink, getApiLink };
