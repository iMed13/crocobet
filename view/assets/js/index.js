import Users from "./templates/users.js";
import User from "./templates/user.js";
import Posts from "./templates/posts.js";
import Error from "./templates/404.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const router = async () => {
    const routes = [
        {
            path: "/",
            view: Users
        },
        {
            path: "/users/:id/posts",
            view: Posts
        },
        {
            path: "/users/:id",
            view: User
        },
        {
            path: "/404",
            view: Error
        }
        
    ];

    // Check each route of router array and if some of this array matched activated route path return information(route and result)
    let match = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    
    }).find(potentialMatch => {
            return potentialMatch.result !== null
    })

    console.log(match)
    // If activated route does not exist in routes array, set default value to 'match'
    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
        //if route does not match redirect to 404 page
        window.location.href = '/404'
    }
    // Generate activated route params to render relevant html(from templates folder) in div of  index.html  with id '#app'.
    const view = new match.route.view(getParams(match));
    document.querySelector("#app").innerHTML = await view.renderHTML();
};

// Get params from matched or activated route
function getParams(match) {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

// Listen to route changes while the user loads the page or navigates the session history
document.addEventListener("DOMContentLoaded", router);
