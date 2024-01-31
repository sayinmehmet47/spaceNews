# Spaceflight News Application

This application is built with Angular and TypeScript. It fetches and displays articles about spaceflight from an API.

## Features

- Fetch and display a list of articles
- Load more articles
- Search articles by term

## Technologies Used

- Angular: A platform for building web applications
- TypeScript: A statically typed superset of JavaScript
- RxJS: A library for reactive programming using Observables
- Angular Forms: Used for handling form inputs and validation
- Angular HttpClient: Used for making HTTP requests

## Components

- `ArticleListComponent`: This is the main component of the application. It fetches and displays a list of articles. It also handles the search functionality.

## Services

- `SpaceflightService`: This service is responsible for fetching articles from the API.

## How it Works

When the `ArticleListComponent` is initialized, it fetches a list of articles from the API using the `SpaceflightService`. The articles are then displayed in the view.

The component also contains a form for searching articles. When the user types in the search box, the application waits for the user to stop typing for 300ms (to avoid making too many requests), then fetches and displays the articles that match the search term. This is achieved using RxJS's `debounceTime` and `switchMap` operators.

The user can also load more articles by clicking the "Load More" button. This fetches more articles from the API and adds them to the list.

The `searchForm` is a FormGroup instance that represents the search form. It has a single form control, 'search', which represents the search input field. The value changes of this form control are subscribed to, and the articles are fetched based on the current value of the 'search' form control.

## Best Practices

- **Immutability**: The `articles$` BehaviorSubject is used to store the articles. New articles are added to this list in an immutable way using the spread operator.
- **Reactive Forms**: The `searchForm` is a reactive form. It uses the form builder to create the form and the form control.
- **RxJS**: RxJS is used for handling asynchronous operations. The `debounceTime` operator is used to wait until the user stops typing before making a request. The `switchMap` operator is used to cancel previous requests if a new one is made. The `takeUntil` operator is used to automatically unsubscribe from observables when the component is destroyed.

## Running the Application

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `npm install`
3. Start the application: `ng serve`
4. Open your browser and navigate to `http://localhost:4200`

## Testing

You can run the unit tests with `ng test` and the end-to-end tests with `ng e2e`.

## Future Improvements

- Add routing to navigate between different components
- Improve error handling by showing a message to the user
- Unsubscribe from all observables to prevent memory leaks
- Use the `finalize` operator from RxJS to set the loading state
