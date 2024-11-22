import axios from "axios";
import { formatDateToNow } from "./formatDateToNow";
import { ImageData } from "../types/types";

const API_KEY = "5lHJ2OqWLWMw0_gWg9zCraP9kyB_obaX4JZ46iTNsW8";

const apiRequests = async (
  query: string,
  page: number
): Promise<{
  images: ImageData[];
  total: number;
}> => {
  const perPage = 12;

  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        client_id: API_KEY,
        per_page: perPage,
        page,
        orientation: "landscape",
      },
    });

    const images: ImageData[] = response.data.results.map((image: any) => ({
      id: image.id,
      description: image.alt_description || "No description",
      smallImage: image.urls.small,
      regularImage: image.urls.regular,
      likes: image.likes,
      dateOfCreate: formatDateToNow(image.created_at),
    }));
    const total = response.data.total;
    return { images, total };
  } catch (error) {
    throw error;
  }
};

export default apiRequests;
