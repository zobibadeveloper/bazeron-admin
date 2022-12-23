const getProductLink = (key, id) => {
  if (key === "n" || key === 2) {
    return `https://bazeron.com/product-detail/184569${id}-n`;
  }
};

const getApiLink = (key, prettyUrl = false) => {
  if (key === "n" || key === 2) {
    return `https://www.needion.com/ilanlar/${prettyUrl}`;
  }
};

export { getProductLink, getApiLink };
