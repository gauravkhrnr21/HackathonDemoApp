import { Routes } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManageInterestComponent } from './manage-interest/manage-interest.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manageinterst',
        component: ManageInterestComponent,
        data: {
          title: 'Manage Interest',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: '' },
            { title: 'Manage Interest' }
          ]
        }
      },
      {
        path: 'chatroom',
        component: ChatRoomComponent,
        data: {
          title: 'Chat Room',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: '' },
            { title: 'Chat Room' }
          ]
        }
      },
      {
        path: 'event',
        component: AddEventComponent,
        data: {
          title: 'Add Event',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: '' },
            { title: 'Add Event' }
          ]
        }
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        data: {
          title: 'Feedbacks',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: '' },
            { title: 'Feedbacks' }
          ]
        }
      }
    ]
  }
];
