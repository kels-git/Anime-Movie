import {useInfiniteQuery} from 'react-query';

const fetchAnimeList = async ({
  pageParam = 1,
  status = 'airing',
  status2 = 'complete',
  status3 = 'upcoming',
  perPage = 10,
}: {
  pageParam?: number;
  status?: string;
  status2?: string;
  status3?: string;
  perPage?: number;
} = {}) => {
  try {
    // we are now using Promise.all to fetch data for both statuses concurrently- cos
    // I found out that without include specific status append to the url api link, by default it gives me just api for status2
    // so in other for the returning api not to display just first status data--what i did was combine all data and create a shuffleArray
    //this will help me display differently or i can say randomly to d user.
    const [response1, response2, response3] = await Promise.all([
      fetch(
        `https://api.jikan.moe/v4/anime?order_by=popularity&page=${pageParam}&status=${status}`,
      ),
      fetch(
        `https://api.jikan.moe/v4/anime?order_by=popularity&page=${pageParam}&status=${status2}`,
      ),
      fetch(
        `https://api.jikan.moe/v4/anime?order_by=popularity&page=${pageParam}&status=${status3}`,
      ),
    ]);

    if (!response1.ok || !response2.ok || !response3.ok) {
      throw new Error('Failed to fetch anime data');
    }
    // Parse response data
    const data1 = await response1.json();
    const data2 = await response2.json();
    const data3 = await response3.json();

    // we then extract the anime data from each response
    const formattedData1 =
      data1?.data?.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        rating: anime.rating,
        score: anime.score,
        year: anime.year,
        status: anime.status,
        image_url: findImageUrl(anime.images),
      })) || [];

    const formattedData2 =
      data2?.data?.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        rating: anime.rating,
        score: anime.score,
        year: anime.year,
        status: anime.status,
        image_url: findImageUrl(anime.images),
      })) || [];
    const formattedData3 =
      data3.data?.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        rating: anime.rating,
        score: anime.score,
        year: anime.year,
        status: anime.status,
        image_url: findImageUrl(anime.images),
      })) || [];

    const combinedData = [
      ...formattedData1,
      ...formattedData2,
      ...formattedData3,
    ];

    // we then Shuffle the combined data randomly with the help function below before returning the sguffledData
    const shuffledData = shuffleArray(combinedData);

    return {
      nextPage: pageParam + 1,
      data: shuffledData,
      pagination: {
        last_visible_page: pageParam,
        has_next_page: true,
        count: combinedData.length,
        per_page: perPage,
      },
    };
  } catch (error) {
    console.error('Error fetching anime data:', error);
    throw new Error('Failed to fetch anime data');
  }
};

const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const findImageUrl = (images: any): string | undefined => {
  if (!images) {
    console.log('No images data provided:', images);
    return undefined;
  }

  if (images.jpg && typeof images.jpg === 'object' && images.jpg.image_url) {
    console.log('JPEG image found:', images.jpg.image_url);
    return images.jpg.image_url;
  }

  if (images.webp && typeof images.webp === 'object' && images.webp.image_url) {
    console.log('WebP image found:', images.webp.image_url);
    return images.webp.image_url;
  }

  console.log('No valid image URL found for images:', images);
  return images;
};

const useAnimeList = () => {
  return useInfiniteQuery(
    'animeList',
    ({pageParam = 1}) => fetchAnimeList({pageParam}),
    {
      // getNextPageParam: (lastPage) => lastPage?.nextPage,
      getNextPageParam: lastPage =>
        lastPage?.pagination?.has_next_page
          ? lastPage.pagination.last_visible_page + 1
          : null,
    },
  );
};

export default useAnimeList;
