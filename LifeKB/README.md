# LifeKB - Your Personal Knowledge Base


This is an [Expo](https://expo.dev) project created for the LifeKB personal knowledge base app, built with Supabase for authentication and data storage.

## Expo App Skeleton

This project is created with Expo SDK 52 and uses Supabase for the backend.

### Features

- Email/password authentication
- Social authentication (placeholders)
- Tab-based navigation
- New Entry screen for capturing knowledge
- Search screen
- Settings screen

### Authentication

Instead of using email magic links (which can be challenging to test in the Expo environment), we've implemented:

1. **Email/Password Authentication**: Traditional signup and login with email and password
2. **Social Authentication**: Placeholders for Google and Apple sign-in (to be implemented)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Set up environment variables

   Create a `.env.local` file with your Supabase credentials:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Start the app

   ```bash
   npx expo start
   ```

## Project Structure

This project follows the Expo Router file-based routing structure:

- `app/_layout.tsx`: Root layout with authentication provider
- `app/(tabs)/_layout.tsx`: Tab navigation setup
- `app/(auth)/_layout.tsx`: Authentication screens
- `app/(tabs)/index.tsx`: Home screen
- `app/(tabs)/newentry/index.tsx`: New Entry screen
- `app/(tabs)/search/index.tsx`: Search screen 
- `app/(tabs)/settings/index.tsx`: Settings screen
- `contexts/AuthContext.tsx`: Authentication context provider
- `lib/supabase.ts`: Supabase client configuration
- `lib/secureStore.ts`: Secure storage adapter for auth persistence

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Supabase documentation](https://supabase.com/docs): Learn about Supabase authentication and data storage.
- [Expo Router documentation](https://docs.expo.dev/router/introduction): Learn about file-based routing in Expo.
