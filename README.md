# chicago-js-meetup-1024
https://www.meetup.com/js-chi/events/288524211

## Script

- What is expo?

- What is file-based navigation?
    - TODO: what plain react.js alternatives are there?
- Download Expo Go from your favorite App Store for Android or iOS, or play along from your browser:
    - TODO: link
- Review react-navigation-native starting point project (https://reactnavigation.org/docs/getting-started/)
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
- An extreme IRL example
- TODO: Convert react-native-navigation base project

- Recap
- The easy way: starting new with expo file-based router