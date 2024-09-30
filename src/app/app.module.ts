import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {provideState, provideStore, StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {productsReducer} from "../store/products/products.reducer";
import {categoriesReducer, scoreboardFeatureKey} from "../store/categories/categories.reducer";
import {CategoriesEffects} from "../store/categories/categories.effects";
import {EffectsModule, provideEffects} from "@ngrx/effects";
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CategoryComponent} from "./menu/pages/category/category.component";
import {ProductsEffects} from "../store/products/products.effects";
import {usersReducer} from "../store/users/users.reducer";
import {UserEffects} from "../store/users/users.effects";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({products: productsReducer, categories: categoriesReducer, users:usersReducer}),
    EffectsModule.forRoot([CategoriesEffects, ProductsEffects, UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),

  ],
  providers: [
    provideClientHydration(),  provideHttpClient(withFetch()),

  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
