import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { LoginComponent } from './login/login.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SearchGroupComponent } from './search-group/search-group.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    ChartsModule
  ],
  declarations: [
    LoginComponent,
    AnalyticsComponent,
    FeedbackComponent,
    SearchGroupComponent
  ]
})
export class ComponentsModule {}
