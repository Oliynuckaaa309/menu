import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {productsReducer} from "../store/products/products.reducer";
import {categoriesReducer} from "../store/categories/categories.reducer";
import {CategoriesEffects} from "../store/categories/categories.effects";
import {EffectsModule, provideEffects} from "@ngrx/effects";
import {HttpClientModule} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

@NgModule({
  declarations: [],
  imports: [BrowserModule,
    AppComponent,
    CoreModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({products: productsReducer, categories: categoriesReducer}),
    // EffectsModule.forRoot(CategoriesEffects)//
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    })],
  providers: [],
  bootstrap: [],
})
export class AppModule {
}
