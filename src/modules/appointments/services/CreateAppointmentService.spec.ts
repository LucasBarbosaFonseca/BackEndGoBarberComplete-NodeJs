import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentService';

let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('shoud be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 20, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 4, 20, 13),
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 20, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '123123123',
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '123123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 20, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2021, 4, 20, 11),
      user_id: '123123',
      provider_id: '123123123',
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 20, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2021, 4, 20, 13),
      user_id: '123123',
      provider_id: '123123',
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 18, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2021, 4, 19, 7),
      user_id: '123123',
      provider_id: '123123456',
    })).rejects.toBeInstanceOf(AppError);

    await expect(createAppointment.execute({
      date: new Date(2021, 4, 19, 18),
      user_id: '123123',
      provider_id: '123123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});