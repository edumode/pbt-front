import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

//Components
import { TodayComponent } from './components/today/today.component';
import { GuidelineComponent } from './components/guideline/guideline.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ToolsComponent } from './components/tools/tools.component';
import { AdminComponent } from './components/admin/admin.component';

const appRoutes: Routes = [

    {path: '', component: TodayComponent},
    {path: 'home', component: TodayComponent},
    {path: 'guideline', component: GuidelineComponent},
    {path: 'articles', component: ArticlesComponent},
    {path: 'tools', component: ToolsComponent},
    {path: 'admin', component: AdminComponent},
    {path: '**', component: TodayComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);