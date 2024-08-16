const BASE_PHONE_NUMBER = '+261';

class PhoneNumberError extends Error {
  public errorMessage: string;
  constructor(message?: string) {
    super(message);
    this.errorMessage = message;
  }
}

export const validatePhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber.startsWith(BASE_PHONE_NUMBER)) {
    throw new PhoneNumberError(
      `Phone number must start with ${BASE_PHONE_NUMBER}`,
    );
  }
  if (phoneNumber.length < 13) {
    throw new PhoneNumberError(
      'Bad phone number length. Expected length is at least 13 characters.',
    );
  }
};

export function IsPhoneNumber(): PropertyDecorator {
  return function (
    target: NonNullable<unknown>,
    propertyKey: string | symbol,
  ): void {
    let value: string;

    const getter = () => value;

    const setter = (newVal: string) => {
      validatePhoneNumber(newVal);
      value = newVal;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
