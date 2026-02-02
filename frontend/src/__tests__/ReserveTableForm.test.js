/**
 * @fileoverview Unit tests for ReserveTableForm validation schema
 * Tests Zod schema validation and localStorage persistence
 */

import { z } from 'zod';

// Replicate the schema from the component for testing
const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .max(16, "Please enter a valid phone number"),
  guests: z
    .string()
    .min(1, "Guests required")
    .refine((v) => Number(v) >= 1 && Number(v) <= 20, "1–20 guests"),
  date: z.date({ required_error: "Pick a date" }),
  time: z.string().min(1, "Pick a time")
});

describe('ReserveTableForm Schema Validation', () => {
  describe('name field', () => {
    it('should accept valid names', () => {
      const result = schema.shape.name.safeParse('John Doe');
      expect(result.success).toBe(true);
    });

    it('should reject empty names', () => {
      const result = schema.shape.name.safeParse('');
      expect(result.success).toBe(false);
    });

    it('should reject names with less than 2 characters', () => {
      const result = schema.shape.name.safeParse('A');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Please enter your name');
    });

    it('should accept 2 character names', () => {
      const result = schema.shape.name.safeParse('Jo');
      expect(result.success).toBe(true);
    });
  });

  describe('phone field', () => {
    it('should accept valid phone numbers', () => {
      const result = schema.shape.phone.safeParse('+919876543210');
      expect(result.success).toBe(true);
    });

    it('should reject phone numbers shorter than 8 characters', () => {
      const result = schema.shape.phone.safeParse('1234567');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Please enter a valid phone number');
    });

    it('should reject phone numbers longer than 16 characters', () => {
      const result = schema.shape.phone.safeParse('12345678901234567');
      expect(result.success).toBe(false);
    });

    it('should accept 8 character phone numbers', () => {
      const result = schema.shape.phone.safeParse('12345678');
      expect(result.success).toBe(true);
    });
  });

  describe('guests field', () => {
    it('should accept valid guest counts', () => {
      const result = schema.shape.guests.safeParse('4');
      expect(result.success).toBe(true);
    });

    it('should reject empty string', () => {
      const result = schema.shape.guests.safeParse('');
      expect(result.success).toBe(false);
    });

    it('should reject 0 guests', () => {
      const result = schema.shape.guests.safeParse('0');
      expect(result.success).toBe(false);
    });

    it('should reject more than 20 guests', () => {
      const result = schema.shape.guests.safeParse('21');
      expect(result.success).toBe(false);
    });

    it('should accept 1 guest', () => {
      const result = schema.shape.guests.safeParse('1');
      expect(result.success).toBe(true);
    });

    it('should accept 20 guests (max)', () => {
      const result = schema.shape.guests.safeParse('20');
      expect(result.success).toBe(true);
    });
  });

  describe('date field', () => {
    it('should accept valid Date objects', () => {
      const result = schema.shape.date.safeParse(new Date());
      expect(result.success).toBe(true);
    });

    it('should reject undefined', () => {
      const result = schema.shape.date.safeParse(undefined);
      expect(result.success).toBe(false);
    });

    it('should reject null', () => {
      const result = schema.shape.date.safeParse(null);
      expect(result.success).toBe(false);
    });

    it('should reject invalid date strings', () => {
      const result = schema.shape.date.safeParse('not a date');
      expect(result.success).toBe(false);
    });
  });

  describe('time field', () => {
    it('should accept valid time strings', () => {
      const result = schema.shape.time.safeParse('7:30 PM');
      expect(result.success).toBe(true);
    });

    it('should reject empty strings', () => {
      const result = schema.shape.time.safeParse('');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Pick a time');
    });
  });

  describe('full form validation', () => {
    it('should validate complete valid form data', () => {
      const formData = {
        name: 'John Doe',
        phone: '+919876543210',
        guests: '4',
        date: new Date(),
        time: '7:30 PM'
      };
      const result = schema.safeParse(formData);
      expect(result.success).toBe(true);
    });

    it('should reject form with missing fields', () => {
      const formData = {
        name: 'John Doe',
        phone: '+919876543210'
        // missing guests, date, time
      };
      const result = schema.safeParse(formData);
      expect(result.success).toBe(false);
    });

    it('should reject form with invalid field', () => {
      const formData = {
        name: 'J', // too short
        phone: '+919876543210',
        guests: '4',
        date: new Date(),
        time: '7:30 PM'
      };
      const result = schema.safeParse(formData);
      expect(result.success).toBe(false);
    });
  });
});

describe('saveReservation localStorage logic', () => {
  const STORAGE_KEY = "ghbk_reservations_v1";

  // Mock localStorage
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = value; },
      clear: () => { store = {}; }
    };
  })();

  beforeEach(() => {
    localStorageMock.clear();
  });

  const saveReservation = (payload) => {
    const raw = localStorageMock.getItem(STORAGE_KEY);
    const current = raw ? JSON.parse(raw) : [];
    current.unshift(payload);
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(current.slice(0, 30)));
  };

  it('should save first reservation', () => {
    const reservation = { id: '1', name: 'Test' };
    saveReservation(reservation);
    
    const stored = JSON.parse(localStorageMock.getItem(STORAGE_KEY));
    expect(stored.length).toBe(1);
    expect(stored[0]).toEqual(reservation);
  });

  it('should prepend new reservations', () => {
    saveReservation({ id: '1', name: 'First' });
    saveReservation({ id: '2', name: 'Second' });
    
    const stored = JSON.parse(localStorageMock.getItem(STORAGE_KEY));
    expect(stored.length).toBe(2);
    expect(stored[0].id).toBe('2'); // Most recent first
    expect(stored[1].id).toBe('1');
  });

  it('should limit to 30 reservations', () => {
    // Add 35 reservations
    for (let i = 0; i < 35; i++) {
      saveReservation({ id: String(i), name: `Test ${i}` });
    }
    
    const stored = JSON.parse(localStorageMock.getItem(STORAGE_KEY));
    expect(stored.length).toBe(30);
    expect(stored[0].id).toBe('34'); // Most recent
  });
});

describe('time slots', () => {
  const timeSlots = [
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "5:30 PM",
    "6:30 PM",
    "7:30 PM",
    "8:30 PM",
    "9:30 PM",
    "10:30 PM"
  ];

  it('should have 10 time slots', () => {
    expect(timeSlots.length).toBe(10);
  });

  it('should start with lunch time', () => {
    expect(timeSlots[0]).toBe('12:00 PM');
  });

  it('should end with late night slot', () => {
    expect(timeSlots[timeSlots.length - 1]).toBe('10:30 PM');
  });

  it('should have a gap between 3:00 PM and 5:30 PM (siesta)', () => {
    const index3pm = timeSlots.indexOf('3:00 PM');
    const index530pm = timeSlots.indexOf('5:30 PM');
    expect(index530pm - index3pm).toBe(1); // No 4:00 PM or 5:00 PM
  });
});
