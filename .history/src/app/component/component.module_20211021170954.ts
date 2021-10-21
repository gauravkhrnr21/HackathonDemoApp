import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { LoginComponent } from './login/login.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ChartsModule } from 'ng2-charts';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ManageInterestComponent } from './manage-interest/manage-interest.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEventComponent } from './add-event/add-event.component';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule,
    NgbModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    LoginComponent,
    FeedbackComponent,
    ChatRoomComponent,
    ManageInterestComponent,
    AddEventComponent
  ]
})
export class ComponentsModule {}
