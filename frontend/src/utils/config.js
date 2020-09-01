const config = {
  GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
  NODE_BASE_URL: process.env.REACT_APP_NODE_BASE_URL || 'http://localhost:4000/api/v1',
  MAP_LATITUDE: process.env.REACT_APP_MAP_LATITUDE || 33.748997,
  MAP_LONGITUDE: process.env.REACT_APP_MAP_LONGITUDE || -84.387985,
  APP_BASE_URL: process.env.REACT_APP_BASE_URL || 'http://localhost:3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  COMMENTS_LIMIT: process.env.COMMENTS_LIMIT || 10,
}

export default config
