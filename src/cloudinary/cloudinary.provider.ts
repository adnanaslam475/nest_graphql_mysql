import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: 'mernappss',
      api_key: '251998675644624',
      api_secret: 'm_efpOgyyop9BSyrM9OZFYn4gOg',
    });
  },
};
