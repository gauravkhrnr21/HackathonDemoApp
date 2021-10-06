import { Routes } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { SearchGroupComponent } from './search-group/search-group.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'groupsearch',
        component: SearchGroupComponent,
        data: {
          title: 'Seacrh Interest',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: '' },
            { title: 'Search Interest' }
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
