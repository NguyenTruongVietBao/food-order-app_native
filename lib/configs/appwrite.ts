import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,

  userCollectionId: '687726c700106c803f60',
  menuCollectionId: '687768460035f2a1d2a9',
  categoriesCollectionId: '687767e300165c577e52',
  customizationsCollectionId: '68776917001e4e7bab1a',
  menuCustomizationsCollectionId: '68776995002f2ed82210',
};

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);
