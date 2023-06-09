import { stringInfo } from "../../app/Utils";
import {
  OtherStringUtils,
  calculateComplexity,
  toUppercaseWithCb,
} from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite", () => {
  describe("OtherStringUtils tests with spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test("Use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUppercase");
      sut.toUppercase("asa");
      expect(toUpperCaseSpy).toBeCalledWith("asa");
    });

    test("Use a spy to track calls to other module", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");
      expect(consoleLogSpy).toBeCalledWith("abc");
    });

    test("Use a spy to replace the implementation of a method", () => {
      jest.spyOn(sut as any, "callExternalService").mockImplementation(() => {
        console.log("calling mocked implementation!");
      });
      (sut as any).callExternalService();
    });
  });

  describe("Tracking callbacks with Jest mocks", () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("Calls callback for invalid argument - track calls", () => {
      const actual = toUppercaseWithCb("", callBackMock);

      expect(actual).toBeUndefined();

      expect(callBackMock).toBeCalledWith("Invalid argument!");

      expect(callBackMock).toBeCalledTimes(1);
    });

    it("Calls callback for valid argument - track calls", () => {
      const actual = toUppercaseWithCb("abc", callBackMock);

      expect(actual).toBe("ABC");

      expect(callBackMock).toBeCalledWith("called function with abc");

      expect(callBackMock).toBeCalledTimes(1);
    });
  });

  describe("Tracking callbacks", () => {
    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      cbArgs = [];
      timesCalled = 0;
    });

    it("Calls callback for invalid argument - track calls", () => {
      const actual = toUppercaseWithCb("", callBackMock);

      expect(actual).toBeUndefined();

      expect(cbArgs).toContain("Invalid argument!");

      expect(timesCalled).toBe(1);
    });

    it("Calls callback for valid argument - track calls", () => {
      const actual = toUppercaseWithCb("abc", callBackMock);

      expect(actual).toBe("ABC");

      expect(cbArgs).toContain("called function with abc");

      expect(timesCalled).toBe(1);
    });
  });

  it("ToUpperCase - calls callback for invalid argument", () => {
    const actual = toUppercaseWithCb("", () => {});

    expect(actual).toBeUndefined();
  });

  it("ToUpperCase - calls callback for valid argument", () => {
    const actual = toUppercaseWithCb("abc", () => {});

    expect(actual).toBe("ABC");
  });

  it("should calculates complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someInfo",
        field2: "otherInfo",
      },
      upperCase: "A",
      lowerCase: "b",
      characters: ["c"],
    } as stringInfo;

    const actual = calculateComplexity(someInfo);

    expect(actual).toBe(10);
  });
});
