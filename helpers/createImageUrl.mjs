const createUrl = async (text) => {
  const encodedURL = encodeURIComponent(text);

  return encodedURL;
};

export default createUrl;
