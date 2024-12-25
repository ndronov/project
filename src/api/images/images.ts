import { ApiResponse, StaticImage, post } from '@/api';

export async function uploadImageApi(image: File): Promise<ApiResponse<StaticImage>> {
  try {
    const formData = new FormData();

    formData.append('image', image);

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    const { data } = await post<StaticImage>(`/v1/images`, formData, { headers });

    return { success: true, data };
  } catch {
    return { success: false };
  }
}
