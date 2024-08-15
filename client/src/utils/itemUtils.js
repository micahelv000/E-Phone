import axiosInstance from "./axiosConfig";
import axios from "axios";

export const fetchData = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const handleInputChange = (slug, field, value, setItemDetails, setIsChanged) => {
  if (value < 0) value = 0;
  setItemDetails((prevState) => ({
    ...prevState,
    [slug]: {
      ...prevState[slug],
      [field]: value,
    },
  }));
  setIsChanged(true);
};

export const handleSync = async (items, itemDetails, initialItemDetails, setIsChanged) => {
  const changedItems = items.filter(item => {
    const { slug } = item;
    return itemDetails[slug]?.stock !== initialItemDetails[slug]?.stock || itemDetails[slug]?.price !== initialItemDetails[slug]?.price;
  });

  for (const item of changedItems) {
    const { slug } = item;
    const { stock, price } = itemDetails[slug];

    try {
      const response = await axios.get(`https://phone-specs-api.vercel.app/${slug}`);
      const data = response.data.data;
      const displaySpec = data.specifications.find((spec) => spec.title === "Display");
      let screenSize = null;
      if (displaySpec) {
        const sizeSpec = displaySpec.specs.find((spec) => spec.key === "Size");
        if (sizeSpec && Array.isArray(sizeSpec.val) && sizeSpec.val.length > 0) {
          screenSize = sizeSpec.val[0].match(/\d+(\.\d+)?/)[0];
        }
      }

      const updatedDetails = {
        stock,
        price,
        brand: data.brand,
        os: data.os,
        image: data.thumbnail,
        screenSize: screenSize,
        phone_name: data.phone_name,
      };

      const updateResponse = await axiosInstance.put(`/update-item/${slug}`, updatedDetails);
      console.log("Item updated:", updateResponse.data);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }
  setIsChanged(false);
};