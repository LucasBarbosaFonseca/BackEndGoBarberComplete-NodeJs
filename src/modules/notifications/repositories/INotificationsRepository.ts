import Notification from '../infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

export default interface INotificationsRepository {
  create(date: ICreateNotificationDTO): Promise<Notification>;
}