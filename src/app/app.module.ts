import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { TodayComponent } from './components/today/today.component';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { GuidelineComponent } from './components/guideline/guideline.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ArticlesComponent } from './components/articles/articles.component';
import { ToolsComponent } from './components/tools/tools.component';
import { AdminComponent } from './components/admin/admin.component';
import { ImagesPipe } from './pipes/images.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    SanitizerPipe,
    GuidelineComponent,
    FilterPipe,
    ArticlesComponent,
    ToolsComponent,
    AdminComponent,
    ImagesPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
