/**
 * @fileoverview Unit tests for mock.js data integrity
 * Tests that restaurant data is properly structured and valid
 */

import {
  siteConfig,
  media,
  signatureDishes,
  menuCategories,
  events,
  testimonials,
  faqs
} from '../mock';

describe('siteConfig', () => {
  describe('brand information', () => {
    it('should have a valid brand name', () => {
      expect(siteConfig.brandName).toBeDefined();
      expect(typeof siteConfig.brandName).toBe('string');
      expect(siteConfig.brandName.length).toBeGreaterThan(0);
    });

    it('should have city set to Goa', () => {
      expect(siteConfig.city).toBe('Goa');
    });

    it('should have a tagline', () => {
      expect(siteConfig.tagline).toBeDefined();
      expect(siteConfig.tagline.length).toBeGreaterThan(10);
    });
  });

  describe('contact information', () => {
    it('should have valid phone numbers', () => {
      expect(siteConfig.contact.phoneDisplay).toMatch(/\+91/);
      expect(siteConfig.contact.phoneTel).toMatch(/^\+91/);
    });

    it('should have valid WhatsApp link', () => {
      expect(siteConfig.contact.whatsappWaMe).toMatch(/^https:\/\/wa\.me\//);
    });

    it('should have address lines', () => {
      expect(siteConfig.contact.addressLine1).toBeDefined();
      expect(siteConfig.contact.addressLine2).toBeDefined();
    });

    it('should have operating hours', () => {
      expect(siteConfig.contact.hours).toBeInstanceOf(Array);
      expect(siteConfig.contact.hours.length).toBeGreaterThan(0);
      
      siteConfig.contact.hours.forEach(hour => {
        expect(hour).toHaveProperty('label');
        expect(hour).toHaveProperty('value');
      });
    });
  });

  describe('social links', () => {
    it('should have valid URLs for all social links', () => {
      expect(siteConfig.socials.instagramUrl).toMatch(/^https?:\/\//);
      expect(siteConfig.socials.googleReviewsUrl).toMatch(/^https?:\/\//);
      expect(siteConfig.socials.zomatoUrl).toMatch(/^https?:\/\//);
      expect(siteConfig.socials.swiggyUrl).toMatch(/^https?:\/\//);
    });
  });
});

describe('media', () => {
  it('should have a hero background image', () => {
    expect(media.heroBackground).toBeDefined();
    expect(media.heroBackground).toMatch(/\.(png|jpg|jpeg|webp)$/i);
  });

  it('should have local image paths (not external URLs)', () => {
    expect(media.heroBackground).toMatch(/^\/images\/restaurant\//);
  });

  it('should have gallery images with required properties', () => {
    expect(media.gallery).toBeInstanceOf(Array);
    expect(media.gallery.length).toBeGreaterThan(0);
    
    media.gallery.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('url');
      expect(item.url).toMatch(/^\/images\/restaurant\//);
    });
  });

  it('should have unique gallery IDs', () => {
    const ids = media.gallery.map(item => item.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });
});

describe('signatureDishes', () => {
  it('should have at least 5 signature dishes', () => {
    expect(signatureDishes.length).toBeGreaterThanOrEqual(5);
  });

  it('should have required properties for each dish', () => {
    signatureDishes.forEach(dish => {
      expect(dish).toHaveProperty('id');
      expect(dish).toHaveProperty('name');
      expect(dish).toHaveProperty('desc');
      expect(dish).toHaveProperty('price');
      expect(dish).toHaveProperty('imageUrl');
      expect(dish).toHaveProperty('pill');
    });
  });

  it('should have local image paths', () => {
    signatureDishes.forEach(dish => {
      expect(dish.imageUrl).toMatch(/^\/images\/restaurant\//);
    });
  });

  it('should have unique dish IDs', () => {
    const ids = signatureDishes.map(dish => dish.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });
});

describe('menuCategories', () => {
  it('should have multiple categories', () => {
    expect(menuCategories.length).toBeGreaterThan(2);
  });

  it('should have required properties for each category', () => {
    menuCategories.forEach(cat => {
      expect(cat).toHaveProperty('id');
      expect(cat).toHaveProperty('title');
      expect(cat).toHaveProperty('subtitle');
      expect(cat).toHaveProperty('items');
      expect(cat.items).toBeInstanceOf(Array);
    });
  });

  it('should have items with name and price', () => {
    menuCategories.forEach(cat => {
      cat.items.forEach(item => {
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('price');
        expect(typeof item.price).toBe('number');
      });
    });
  });

  it('should mark vegetarian items with veg property', () => {
    const vegItems = menuCategories.flatMap(cat => 
      cat.items.filter(item => item.veg === true)
    );
    expect(vegItems.length).toBeGreaterThan(0);
  });

  it('should have unique category IDs', () => {
    const ids = menuCategories.map(cat => cat.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });
});

describe('events', () => {
  it('should have at least one event', () => {
    expect(events.length).toBeGreaterThan(0);
  });

  it('should have required properties for each event', () => {
    events.forEach(event => {
      expect(event).toHaveProperty('id');
      expect(event).toHaveProperty('title');
      expect(event).toHaveProperty('desc');
      expect(event).toHaveProperty('when');
      expect(event).toHaveProperty('highlight');
    });
  });
});

describe('testimonials', () => {
  it('should have at least 3 testimonials', () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(3);
  });

  it('should have required properties for each testimonial', () => {
    testimonials.forEach(t => {
      expect(t).toHaveProperty('id');
      expect(t).toHaveProperty('name');
      expect(t).toHaveProperty('quote');
      expect(t).toHaveProperty('rating');
    });
  });

  it('should have ratings between 1 and 5', () => {
    testimonials.forEach(t => {
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    });
  });
});

describe('faqs', () => {
  it('should have at least 2 FAQs', () => {
    expect(faqs.length).toBeGreaterThanOrEqual(2);
  });

  it('should have question and answer for each FAQ', () => {
    faqs.forEach(faq => {
      expect(faq).toHaveProperty('id');
      expect(faq).toHaveProperty('q');
      expect(faq).toHaveProperty('a');
      expect(faq.q.length).toBeGreaterThan(5);
      expect(faq.a.length).toBeGreaterThan(10);
    });
  });
});
