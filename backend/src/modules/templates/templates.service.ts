import { Injectable, NotFoundException } from '@nestjs/common';
import { TemplatesRepository } from './templates.repository';
import { TemplateEngineService } from './template-engine.service';
import { RenderedTemplate, TemplateData } from './templates.dto';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly templatesRepository: TemplatesRepository,
    private readonly templateEngine: TemplateEngineService,
  ) {}

  async renderTemplate(
    slug: string,
    data: TemplateData,
  ): Promise<RenderedTemplate> {
    const template = await this.templatesRepository.findBySlug(slug);

    if (!template) {
      throw new NotFoundException(`Template with slug "${slug}" not found`);
    }

    const { message, title } = this.templateEngine.compileTemplate(
      template,
      data,
    );

    const renderedTemplate: RenderedTemplate = {
      message,
      title,
    };

    return renderedTemplate;
  }
}
