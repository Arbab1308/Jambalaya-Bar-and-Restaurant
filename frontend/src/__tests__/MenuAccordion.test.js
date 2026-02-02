/**
 * @fileoverview Unit tests for MenuAccordion component
 * Tests the formatINR utility and filter logic
 */

// Test the formatINR utility function isolated
describe('formatINR utility', () => {
  // We need to extract this for testing
  const formatINR = (value) => {
    if (!value) return "Market / Ask";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  };

  it('should format positive numbers in INR', () => {
    expect(formatINR(100)).toBe('₹100');
    expect(formatINR(1000)).toBe('₹1,000');
    expect(formatINR(10000)).toBe('₹10,000');
  });

  it('should return "Market / Ask" for zero', () => {
    expect(formatINR(0)).toBe('Market / Ask');
  });

  it('should return "Market / Ask" for null/undefined', () => {
    expect(formatINR(null)).toBe('Market / Ask');
    expect(formatINR(undefined)).toBe('Market / Ask');
  });

  it('should format large numbers with Indian locale grouping', () => {
    expect(formatINR(100000)).toBe('₹1,00,000');
    expect(formatINR(1000000)).toBe('₹10,00,000');
  });
});

describe('MenuAccordion filter logic', () => {
  // Simulating the filter logic from the component
  const filterCategories = (categories, query) => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;

    return categories
      .map((c) => {
        const items = c.items.filter((i) => i.name.toLowerCase().includes(q));
        return { ...c, items };
      })
      .filter((c) => c.items.length > 0);
  };

  const mockCategories = [
    {
      id: 'starters',
      title: 'Starters',
      items: [
        { name: 'Paneer Pakoras', price: 540, veg: true },
        { name: 'Chicken Wings', price: 380 },
        { name: 'Fish Fingers', price: 420 }
      ]
    },
    {
      id: 'pizzas',
      title: 'Pizzas',
      items: [
        { name: 'Margherita', price: 340, veg: true },
        { name: 'Chicken Tikka Pizza', price: 410 }
      ]
    }
  ];

  it('should return all categories when query is empty', () => {
    const result = filterCategories(mockCategories, '');
    expect(result).toEqual(mockCategories);
  });

  it('should return all categories when query is only whitespace', () => {
    const result = filterCategories(mockCategories, '   ');
    expect(result).toEqual(mockCategories);
  });

  it('should filter items by partial name match (case insensitive)', () => {
    const result = filterCategories(mockCategories, 'chicken');
    expect(result.length).toBe(2);
    expect(result[0].items).toContainEqual({ name: 'Chicken Wings', price: 380 });
    expect(result[1].items).toContainEqual({ name: 'Chicken Tikka Pizza', price: 410 });
  });

  it('should filter items by exact match', () => {
    const result = filterCategories(mockCategories, 'paneer pakoras');
    expect(result.length).toBe(1);
    expect(result[0].items.length).toBe(1);
    expect(result[0].items[0].name).toBe('Paneer Pakoras');
  });

  it('should return empty array when no matches found', () => {
    const result = filterCategories(mockCategories, 'sushi');
    expect(result).toEqual([]);
  });

  it('should filter out categories with no matching items', () => {
    const result = filterCategories(mockCategories, 'margherita');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('pizzas');
  });

  it('should handle uppercase queries', () => {
    const result = filterCategories(mockCategories, 'FISH');
    expect(result.length).toBe(1);
    expect(result[0].items[0].name).toBe('Fish Fingers');
  });
});

describe('Menu item count calculation', () => {
  const calculateTotalItems = (categories) => 
    categories.reduce((acc, c) => acc + c.items.length, 0);

  it('should count all items across categories', () => {
    const categories = [
      { id: 'a', items: [{}, {}, {}] },
      { id: 'b', items: [{}, {}] }
    ];
    expect(calculateTotalItems(categories)).toBe(5);
  });

  it('should return 0 for empty categories', () => {
    expect(calculateTotalItems([])).toBe(0);
  });

  it('should handle categories with no items', () => {
    const categories = [
      { id: 'a', items: [] },
      { id: 'b', items: [{}] }
    ];
    expect(calculateTotalItems(categories)).toBe(1);
  });
});
