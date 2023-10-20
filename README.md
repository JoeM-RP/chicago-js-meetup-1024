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
    `package.json`
        ```json
        {
            "resolutions": {
                "metro": "0.76.0",
                "metro-resolver": "0.76.0"
            }
        }        
        ```
- 

### Recap
- The easy way: starting new with expo file-based router