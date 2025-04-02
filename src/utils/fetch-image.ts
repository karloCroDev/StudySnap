export const fetchImage = async (
  imageUrl: string,
  setImage: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();
    const imageObjectURL = URL.createObjectURL(blob);
    setImage(imageObjectURL);
  } catch (error) {
    console.error('Error fetching image:', error);
  }
};