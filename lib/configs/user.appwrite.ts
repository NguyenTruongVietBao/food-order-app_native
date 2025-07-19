import { CreateUserParams, SignInParams } from '@/type';
import { ID, Query } from 'react-native-appwrite';
import { account, appwriteConfig, avatars, databases } from './appwrite';

export const signUp = async ({ name, email, password }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw new Error('Failed to create user');
    }
    await signIn({ email, password });

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        name,
        email,
        avatar: avatars.getInitialsURL(name),
      }
    );
    return newUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const newSession = await account.createEmailPasswordSession(
      email,
      password
    );
    if (!newSession) {
      throw new Error('Failed to sign in');
    }
    return newSession;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const signOut = async () => {
  try {
    const deleteSess = await account.deleteSession('current');
    return deleteSess;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    console.log(currentAccount);
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
};
