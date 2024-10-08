import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {productsReducer} from "../store/products/products.reducer";
import {categoriesReducer} from "../store/categories/categories.reducer";
import {CategoriesEffects} from "../store/categories/categories.effects";
import {EffectsModule} from "@ngrx/effects";
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
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
    StoreModule.forRoot({products: productsReducer, categories: categoriesReducer, users: usersReducer}),
    EffectsModule.forRoot([CategoriesEffects, ProductsEffects, UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }),

  ],
  providers: [
    provideClientHydration(), provideHttpClient(withFetch()),

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
