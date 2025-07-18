import { CreateUserParams, SignInParams } from '@/type';
import { ID, Query } from 'react-native-appwrite';
import { account, appwriteConfig, avatars, databases } from './appwrite';

export const signUp = async ({ name, email, password }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw new Error('Failed to create user');
    }

    // try {
    //   await account.deleteSession('current');
    // } catch (error) {
    //   console.error('Error deleting session', error);
    // }
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
    console.log(newUser);
    return newUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Error deleting session', error);
    }
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
    await account.deleteSession('current');
  } catch (error) {
    console.error('Error deleting session', error);
  }
};
export const getCurrentUser = async () => {
  try {
    const currentUser = await account.get();
    if (!currentUser) throw new Error('User not found');
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentUser.$id)]
    );
    if (!user) throw new Error('User not found');
    return user.documents[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
};
