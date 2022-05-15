import { Cloudinary } from "@cloudinary/url-gen";
const CLOUD_NAME = "cloudmedia49";
const cld = new Cloudinary({
  cloud: {
    cloudName: `${CLOUD_NAME}`,
  },
});

export { cld };
