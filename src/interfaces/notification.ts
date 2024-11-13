import {NotificationEnum} from '../enums/notification';
import {UserRole} from '../enums/role';

export interface Notification {
  _id: string;
  userId: string;
  role: UserRole;
  title: string;
  message: string;
  type: NotificationEnum;
  createdAt: Date;
  read: boolean;
  extraData?: Record<string, unknown>;
}
