import { Notification } from "./notification";

describe('Notification unit tests', () => {


  it('should create errors', () => {
    const notification = new Notification();

    const error = {
      message: 'error',
      context: 'employee'
    };
    
    notification.addErrors(error);

    expect(notification.messages('employee')).toBe('employee: error\n');

    const error2 = {
      message: 'error2',
      context: 'documentType'
    };

    notification.addErrors(error2);
    expect(notification.messages('employee')).toBe('employee: error\n');

    const error3 = {
      message: 'error3',
      context: 'employee'
    };

    notification.addErrors(error3);
    expect(notification.messages('employee')).toBe('employee: error\nemployee: error3\n');
  });

});