// import { ApplicationConfig, isDevMode } from '@angular/core';
// import { provideRouter } from '@angular/router';
//
// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import {createReducer, provideState, provideStore} from '@ngrx/store';
// import { provideStoreDevtools } from '@ngrx/store-devtools';
// import {categoriesReducer} from "../store/categories/categories.reducer";
//
// // const test = createReducer({test: true})
 import {ApplicationConfig} from "@angular/core";

export const appConfig: ApplicationConfig = {
   providers: [
// //     provideRouter(routes),
// //     provideClientHydration(),
// //     provideAnimationsAsync(),
// //     provideHttpClient(withFetch()),
// //     provideStore(),
// //     provideState({ name: 'test', reducer: test}),
// //     provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
 ],
};
