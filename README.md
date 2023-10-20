# chicago-js-meetup-1024
https://www.meetup.com/js-chi/events/288524211

## Script

### What is expo?
- What is file-based navigation? [Introduction to Expo Router](https://docs.expo.dev/routing/introduction/)
    - TODO: what plain react.js alternatives are there?
    
    _"It brings the best file-system routing concepts from the web to a universal application — allowing your routing to work across every platform. When a file is added to the app directory, the file automatically becomes a route in your navigation."_
    - **Native:** Built on top of our powerful React Navigation suite, Expo Router navigation is truly native and platform-optimized by default.
    - **Shareable:** Every screen in your app is automatically deep linkable. Making any route in your app shareable with links.
    - **Offline-first:** Apps are cached and run offline-first, with automatic updates when you publish a new version. Handles all incoming native URLs without a network connection or server.
    - **Universal:** Android, iOS, and web share a unified navigation structure, with the ability to drop-down to platform-specific APIs at the route level.
    - **Discoverable:** Expo Router enables build-time static rendering on web, and universal linking to native. Meaning your app content can be indexed by search engines.
    - You can use Expo Router in a "plain" React native App: Due to the deep connection between the router and the bundler, Expo Router is only available in Expo CLI projects, with Metro. But! you can use Expo CLI in any React Native project
- Download Expo Go from your favorite App Store for Android or iOS, or play along from your browser:
    - TODO: link
- Review react-navigation-native starting point project [Getting Started](https://reactnavigation.org/docs/getting-started/)
    - Similar libraries for React/Web solutions: https://reactrouter.com/
    ```javascript
    createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
            <Route path="contact" element={<Contact />} />
            <Route
                path="dashboard"
                element={<Dashboard />}
                loader={({ request }) =>
                fetch("/api/dashboard.json", {
                    signal: request.signal,
                })
                }
            />
            <Route element={<AuthLayout />}>
                <Route
                path="login"
                element={<Login />}
                loader={redirectIfUser}
                />
                <Route path="logout" action={logoutUser} />
            </Route>
            </Route>
        )
        );
    ```
- (Example: An IRL example)
    - Nearly 1000 lines of navigation code
    - Multiple navigators (stack, bottom tab)

### Convert `react-navigation/native` base project 
- Follows: [Manual Installation](https://docs.expo.dev/routing/installation/#manual-installation)
- Upgrade to Expo 49 (if you haven't already) `yarn add expo@^49.0.0 && npx expo install --fix`
- Add dependencies: `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler`
- Add entry point
    - Use the expo-router/entry file in the package.json. The initial client file is app/_layout.js.
    `package.json`
        ```json
        {
            "main": "expo-router/entry"
        }
        ```
- Edit project configuration
    - Add a deep linking scheme in your app config:
    `app.json`
        ```json
        {
            "scheme": "your-app-scheme"
        }
        ```
    - Add web support (optional)
    
        `npx expo install react-native-web react-dom`
    `app.json`
        ```json
        {
            "web": {
                "bundler": "metro"
            }
        }
        ```
- Modify babel.config.js
    - Add expo-router/babel plugin in the plugins array to your project's babel.config.js:
    `babel.config.js`
        ```javascript
            plugins: [
                // Required for expo-router
                'expo-router/babel',
            ],      
        ```
- `npx expo start --clear` --> explosion
    - `EXPO_ROUTER_APP_ROOT not defined``
If process.env.EXPO_ROUTER_APP_ROOT is not defined you'll see the following error:
```
Invalid call at line 11: process.env.EXPO_ROUTER_APP_ROOT First argument of require.context should be a string.
```

 - This can happen when:

    - The project is using an expo version lower than expo@^46.0.13. Version 46.0.13 enables context modules and injects process.env.EXPO_ROUTER_APP_ROOT into the process.

    - The babel plugin expo-router/babel is not being used in the project babel.config.js. You can try clearing the cache with: `npx expo start --clear`
- Add metro config
    ```
    // Learn more https://docs.expo.io/guides/customizing-metro
    const { getDefaultConfig } = require('expo/metro-config');

    /** @type {import('expo/metro-config').MetroConfig} */
    const config = getDefaultConfig(__dirname, {
    // [Web-only]: Enables CSS support in Metro.
    isCSSEnabled: true,
    });

    module.exports = config;
    ```

- Build the directory:
    - Add `/app`
    - Make `_layout.tsx` // this is the app "frame" that will be present on all pages
- Make a custom "not found" page, `[...missing].tsx`
    - Reload, now we get our custom "missing" page instead of the default
    ```javascript
    export default function NotFoundScreen() {
        return ()
    }
    ```
- Add `+html.tsx` shim
- Migrate Modal - this is a 1:1 copy because there is no navigation component
    - move `ModalScreen.tsx` and rename to `modal.tsx`
- Add `(tabs)` directory and `(tabs)/_layout.tsx` to define tab frame
- Add tabs
    - Copy `TabOneScreen.tsx` to `(tabs)/index.tsx`
    - Copy `TabTwoScreen.tsx` to `(tabs)/two.tsx`
- Update `Themed.tsx`, import `useColorScheme`
    - Fix `space-mono` reference in `StyledText.tsx`
- Remove old `App.tsx`
- Remove `/Screens`
- Let's talk navigation changes:
    - Navigation using `@react-navigation/native`:

    ```html
    <TouchableOpacity onPress={() => navigation.replace('Root')}>
        <Text style={styles.linkText}>Go to home screen!</Text>
    </TouchableOpacity>
    ```
    - Navigation using `expo-router`:

    ```html
    <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
    </Link>
    ```
- Let's add a new page
    - Add a button to link to a top-level route
    ```html
    <Link href="/other" asChild>
      <Pressable>
        <Text>Other</Text>
      </Pressable>
    </Link>
    ```
- Let's add a nested page --> settings
    - Add `/settings/_layout.tsx`
    ```javascript
    import { Stack } from 'expo-router/stack';

    export default function Layout() {
        return <Stack screenOptions={{ headerShown: true, headerTitle: 'Settings' }} />;
    }
    ```
    - Add `/settings/index.tsx` & link to alerts
    ```html
    <Link href="/settings/alerts" asChild>
        <Pressable>
            <Text>Alerts</Text>
        </Pressable>
    </Link>
    ```
    - Add `/settings/alerts.tsx`
    ```html
    <Link href="/other" asChild>
        <Pressable>
        <Text>Other</Text>
        </Pressable>
    </Link>
    ```

### Recap

#### What are the benefits of file-based routing?
Interesting facts from [FAQ](https://docs.expo.dev/router/reference/faq/) in **bold**
- **The file system is a well-known and well-understood concept. The simpler mental model makes it easier to educate new team members and scale your application.**
- The fastest way to onboard new users is by having them open a universal link that opens the app or website to the correct screen depending on if they have the app installed or not. This technique is so advanced that it's usually only available to large companies that can afford to make and maintain the parity between platforms. But with Expo's file-based routing, you can have this feature out of the box!
- **Refactoring is easier to do because you can move files around without having to update any imports or routing components.**
- Expo Router has the ability to statically type routes automatically. This ensures you can only link to valid routes and that you can't link to a route that doesn't exist. Typed Routes also improve refactoring as you'll get type errors if links are broken.
- Async Routes (bundle splitting) improve development speed, especially in larger projects. They also make upgrades easier as errors are isolated to a single route, meaning you can incrementally update or refactor your app page-by-page rather than all at once (traditional React Native).
- **Deep links always work, for every page. This makes it possible to share links to any content in the app, which is great for promoting your app, collecting bug reports, E2E testing, automating screenshots, and so on.**
- Expo Head uses automatic links to enable deep-native integration. Features like Quick Notes, Handoff, Siri context, and universal links only require configuration setup, no code changes. This enables perfect vertical integration with the entire ecosystem of smart devices that a user has, leading to the types of user experiences that are only possible with universal apps (web ⇄ native).
- Expo Router has the ability to statically render each page automatically on the web, enabling real SEO and full discoverability of your app's content. This is only possible because of the file-based convention.
- Expo CLI can infer a lot of information about your application when it follows a known convention. For example, we could implement automatic bundle splitting per route, or automatically generate a sitemap for your website. This is impossible when your app only has a single entry point.
- Re-engagement features like notifications and home screen widgets are easier to integrate as you can simply intercept the launch and deep link, with query parameters, anywhere in the app.
- Like on the web, analytics and error reporting can easily be configured to automatically include the route name, which is useful for debugging and understanding user behavior.

#### Why should I use Expo Router over React Navigation?
- Expo Router and React Navigation are both libraries from the Expo team. We built Expo Router on top of React Navigation to enable the benefits of file-based routing. Expo Router is a superset of React Navigation, meaning you can use any React Navigation components and APIs with Expo Router.

If file-based routing isn't right for your project, you can drop down to React Navigation and set up routes, types, and links manually.