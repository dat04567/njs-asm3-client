const addHttpsIfNeeded = (url) => {
   if (!url.startsWith('https://')) {
      return `${process.env.REACT_APP_API_SERVER}/${url}`;
   }
   return url;
};

const imageService = {
   addHttpsIfNeeded,
};

export default imageService;
