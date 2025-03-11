import { Test, TestingModule } from '@nestjs/testing';
import { TemplateEngineService } from './template-engine.service';
import { TemplateData } from './templates.dto';

describe('TemplateEngineService', () => {
  let service: TemplateEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateEngineService],
    }).compile();

    service = module.get<TemplateEngineService>(TemplateEngineService);
  });

  describe('compileTemplate', () => {
    it('should compile a simple template with basic variables', () => {
      const template = {
        message: 'Hello <fullName>!',
      };
      const data: TemplateData = {
        fullName: 'John Doe',
      };

      const result = service.compileTemplate(template, data);
      expect(result).toEqual({
        message: 'Hello John Doe!',
      });
    });

    it('should compile template with title and message', () => {
      const template = {
        title: 'Welcome <firstName>',
        message: 'Hello <fullName>!',
      };
      const data: TemplateData = {
        fullName: 'John Doe',
      };

      const result = service.compileTemplate(template, data);
      expect(result).toEqual({
        title: 'Welcome John',
        message: 'Hello John Doe!',
      });
    });

    it('should format cat names correctly with no cats', () => {
      const template = {
        message: 'Your cats: <cat-names>',
      };
      const data: TemplateData = {
        catNames: [],
      };

      const result = service.compileTemplate(template, data);
      expect(result).toEqual({
        message: 'Your cats: ',
      });
    });

    it('should format single cat name correctly', () => {
      const template = {
        message: 'Your cat: <cat-names>',
      };
      const data: TemplateData = {
        catNames: ['Luna'],
      };

      const result = service.compileTemplate(template, data);
      expect(result).toEqual({
        message: 'Your cat: Luna',
      });
    });

    it('should format two cat names with "and"', () => {
      const template = {
        message: 'Your cats: <cat-names>',
      };
      const data: TemplateData = {
        catNames: ['Luna', 'Milo'],
      };

      const result = service.compileTemplate(template, data);
      expect(result).toEqual({
        message: 'Your cats: Luna and Milo',
      });
    });

    it('should format three or more cat names with commas and "and"', () => {
      const template = {
        message: 'Your cats: <cat-names>',
      };
      const data: TemplateData = {
        catNames: ['Luna', 'Milo', 'Felix'],
      };

      const result = service.compileTemplate(template, data);
      expect(result).toEqual({
        message: 'Your cats: Luna, Milo, and Felix',
      });
    });

    it('should format prices correctly in GBP', () => {
      const template = {
        message: 'Total price: <price>',
      };
      const data: TemplateData = {};

      const result = service.compileTemplate(template, data);
      expect(result).toEqual({
        message: 'Total price: £123.45',
      });
    });

    it('should handle undefined title gracefully', () => {
      const template = {
        message: 'Hello <fullName>!',
      };
      const data: TemplateData = {
        fullName: 'John Doe',
      };

      const result = service.compileTemplate(template, data);
      expect(result).toEqual({
        message: 'Hello John Doe!',
      });
      expect(result.title).toBeUndefined();
    });
  });
});
