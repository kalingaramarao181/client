import axiosInstance from "./axiosInstance";

 export const uploadDocument = async (formData) => {
  const response = await axiosInstance.post(`/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getSignerDocuments = async (userId) => {
  const response = await axiosInstance.get(`/document-by-signer/${userId}`);
  return response.data;
}

export const getDocuments = async (userId) => {
  const response = await axiosInstance.get(`/my-documents/${userId}`);
  return response.data; 
};
