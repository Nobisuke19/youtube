import React, { useContext, createContext, useEffect, useState } from 'react'
import { fetchApiForYoutubeData } from '../utils/fetchApi';


export const Context = createContext();

export const AppContext = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('0')
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const fetchYoutubeData = async (params) => {
    setLoading(true);
    try {
      const res = await fetchApiForYoutubeData('videos', params);
      setVideoData(res.items)
      console.log(res.items);

    } catch (error) {
      console.error('Error fetching youtube Results', error);

    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
   if(selectedCategory){
    if (selectedCategory === 'Home') {
      fetchYoutubeData({
        part: 'snippet,contentDetails,statistics',
        regioncode: 'IN',
        maxResult: 10
      })
    } else {
      fetchYoutubeData({
        part: 'snippet,contentDetails,statistics',
        chart:'mostPopular',
        regioncode: 'IN',
        maxResult: 10,
        videoCategoryId: selectedCategory
      })
    }
   }
  }, [selectedCategory])

  return (
    <Context.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        setMobileMenu,
        mobileMenu,
        videoData,
        loading,
        setLoading
      }}>
        {children}
    </Context.Provider>

  )
}

export const useAppContext = () => {
  return useContext(Context)
}