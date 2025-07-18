import { GetMenuParams } from '@/type';
import { Query } from 'react-native-appwrite';
import { appwriteConfig, databases } from './appwrite';

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];
    if (category) {
      queries.push(Query.equal('categories', category));
    }
    if (query) {
      queries.push(Query.search('name', query));
    }
    const menu = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    );
    return menu.documents;
  } catch (error) {
    throw new Error('Failed to get menu: ' + error);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );
    return categories.documents;
  } catch (error) {
    throw new Error('Failed to get categories: ' + error);
  }
};
