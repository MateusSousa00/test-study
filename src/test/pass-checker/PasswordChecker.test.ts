import {
  PasswordChecker,
  PasswordErrors,
} from "../../app/pass-checker/PasswordChecker";

describe("PasswordChecker test suite", () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it("Password with less than 8 chars is invalid", () => {
    const actual = sut.checkPassword("123457");
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });

  it("Password with more than 8 chars is ok", () => {
    const actual = sut.checkPassword("1234578Aa");
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it("Password with no upper case letter is invalid", () => {
    const actual = sut.checkPassword("1234abcd");
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it("Password with upper case letter is valid", () => {
    const actual = sut.checkPassword("1234abcD");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it("Password with no lower case letter is invalid", () => {
    const actual = sut.checkPassword("1234ABCD");
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it("Password with lower case letter is valid", () => {
    const actual = sut.checkPassword("1234aBCD");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it("Complex password is valid", () => {
    const actual = sut.checkPassword("1234aBCD");
    expect(actual.reasons).toHaveLength(0);
    expect(actual.valid).toBe(true);
  });

  it("Admin password with no number is invalid", () => {
    const actual = sut.checkAdminPassword("abcdABCD");
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
    expect(actual.valid).toBe(false);
  });

  it("Admin password with number is valid", () => {
    const actual = sut.checkAdminPassword("abcdABCD1");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
    expect(actual.valid).toBe(true);
  });
});
