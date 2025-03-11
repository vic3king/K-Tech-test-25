import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesRepository } from './templates.repository';
import { TemplateEngineService } from './template-engine.service';
import { RenderedTemplate, TemplateData } from './templates.dto';

describe('TemplatesService', () => {
  let service: TemplatesService;
  let repository: TemplatesRepository;
  let templateEngine: TemplateEngineService;

  const mockTemplatesRepository = {
    findBySlug: jest.fn(),
  };

  const mockTemplateEngineService = {
    compileTemplate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        {
          provide: TemplatesRepository,
          useValue: mockTemplatesRepository,
        },
        {
          provide: TemplateEngineService,
          useValue: mockTemplateEngineService,
        },
      ],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
    repository = module.get<TemplatesRepository>(TemplatesRepository);
    templateEngine = module.get<TemplateEngineService>(TemplateEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(templateEngine).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('renderTemplate', () => {
    const mockTemplateData: TemplateData = {
      fullName: 'John Doe',
      catNames: ['Whiskers', 'Fluffy'],
    };

    it('should successfully render a template with title', async () => {
      const mockTemplate = {
        title: 'Hello <full-name>',
        message: 'Welcome message for <cat-names>',
      };
      const mockRendered: RenderedTemplate = {
        title: 'Hello John Doe',
        message: 'Welcome message for Whiskers and Fluffy',
      };

      mockTemplatesRepository.findBySlug.mockResolvedValue(mockTemplate);
      mockTemplateEngineService.compileTemplate.mockReturnValue(mockRendered);

      const result = await service.renderTemplate('welcome', mockTemplateData);

      expect(result).toEqual(mockRendered);
      expect(repository.findBySlug).toHaveBeenCalledWith('welcome');
      expect(templateEngine.compileTemplate).toHaveBeenCalledWith(
        mockTemplate,
        mockTemplateData,
      );
    });

    it('should successfully render a template without title', async () => {
      const mockTemplate = {
        message: 'Welcome message for <cat-names>',
      };
      const mockRendered: RenderedTemplate = {
        message: 'Welcome message for Whiskers and Fluffy',
      };

      mockTemplatesRepository.findBySlug.mockResolvedValue(mockTemplate);
      mockTemplateEngineService.compileTemplate.mockReturnValue(mockRendered);

      const result = await service.renderTemplate('welcome', mockTemplateData);

      expect(result).toEqual(mockRendered);
    });

    it('should throw NotFoundException when template is not found', async () => {
      mockTemplatesRepository.findBySlug.mockResolvedValue(null);

      await expect(
        service.renderTemplate('non-existent', mockTemplateData),
      ).rejects.toThrow(NotFoundException);

      expect(repository.findBySlug).toHaveBeenCalledWith('non-existent');
      expect(templateEngine.compileTemplate).not.toHaveBeenCalled();
    });
  });
});
