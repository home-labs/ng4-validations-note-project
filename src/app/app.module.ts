import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HorizontalMenuComponent } from './core/components/horizontal-menu/component';

import { ListExampleModule } from './components/examples/index';


@NgModule({
    imports: [
        AppRoutingModule
        , ListExampleModule
    ],
    declarations: [
        AppComponent
        , HorizontalMenuComponent
    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
