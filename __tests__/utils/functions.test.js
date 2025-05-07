import {
  randomColor,
  dateFormatter,
  capitalizeString,
  modifyOptions,
  getNotificationDate,
} from "@/utils/functions";

describe("Utility Functions", () => {
  describe("randomColor", () => {
    it("returns a hex color string for light mode", () => {
      const color = randomColor(true);
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it("returns a hex color string for dark mode", () => {
      const color = randomColor(false);
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe("dateFormatter", () => {
    it("formats a date string correctly", () => {
      const date = new Date("2023-01-01T12:00:00");
      const formatted = dateFormatter(date);
      expect(typeof formatted).toBe("string");
    });

    it("handles string date input", () => {
      const dateStr = "2023-01-01T12:00:00";
      const formatted = dateFormatter(dateStr);
      expect(typeof formatted).toBe("string");
    });

    it("returns empty string for invalid date", () => {
      const formatted = dateFormatter("invalid-date");
      expect(formatted).toBe("");
    });
  });

  describe("capitalizeString", () => {
    it("capitalizes the first letter of a string", () => {
      expect(capitalizeString("hello")).toBe("Hello");
    });

    it("returns empty string for empty input", () => {
      expect(capitalizeString("")).toBe("");
    });

    it("handles already capitalized strings", () => {
      expect(capitalizeString("Hello")).toBe("Hello");
    });
  });

  describe("modifyOptions", () => {
    it("converts array of strings to array of objects", () => {
      const options = ["option1", "option2"];
      const modified = modifyOptions(options);

      expect(modified).toEqual([
        { label: "Option1", value: "option1" },
        { label: "Option2", value: "option2" },
      ]);
    });

    it("uses custom label when provided", () => {
      const options = ["option1", "option2"];
      const modified = modifyOptions(options, "custom");

      expect(modified).toEqual([
        { label: "Custom", value: "option1" },
        { label: "Custom", value: "option2" },
      ]);
    });
  });

  describe("getNotificationDate", () => {
    beforeAll(() => {
      // Freeze time so tests are consistent
      jest.useFakeTimers().setSystemTime(new Date("2023-01-01T09:00:00Z"));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("returns null when deadline or option is missing", () => {
      expect(getNotificationDate(null, "1 day")).toBeNull();
      expect(getNotificationDate("2023-01-01", null)).toBeNull();
    });

    it("calculates notification date 1 day before deadline", () => {
      const deadline = new Date("2023-01-02T12:00:00");
      const notification = getNotificationDate(deadline, "1 day");

      expect(notification.toISOString()).toBe("2023-01-01T12:00:00.000Z");
    });

    it("calculates notification date 1 week before deadline", () => {
      const deadline = new Date("2023-01-08T12:00:00");
      const notification = getNotificationDate(deadline, "1 week");

      expect(notification.toISOString()).toBe("2023-01-01T12:00:00.000Z");
    });

    it("calculates notification date 1 month before deadline", () => {
      const deadline = new Date("2023-02-01T12:00:00");
      const notification = getNotificationDate(deadline, "1 month");

      expect(notification.toISOString()).toBe("2023-01-01T12:00:00.000Z");
    });

    it("returns today's date if notification date is in the past", () => {
      // Mock current date
      const realDate = Date;
      global.Date = class extends Date {
        constructor(...args) {
          if (args.length === 0) {
            return new realDate("2023-01-15T12:00:00");
          }
          return new realDate(...args);
        }
      };

      const deadline = new Date("2023-01-16T12:00:00");
      const notification = getNotificationDate(deadline, "1 week");

      // Should return today (Jan 15) instead of Jan 9 (which would be in the past)
      expect(notification.getDate()).toBe(15);
      expect(notification.getMonth()).toBe(0);
      expect(notification.getFullYear()).toBe(2023);

      // Restore original Date
      global.Date = realDate;
    });
  });
});
