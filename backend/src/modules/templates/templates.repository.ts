import { Injectable } from '@nestjs/common';
import { Template } from './templates.dto';
import { TEMPLATES } from '@common/constants/templates.constants';

@Injectable()
export class TemplatesRepository {
  private templates: Record<string, Template> = TEMPLATES;

  async findBySlug(slug: string): Promise<Template> {
    return this.templates[slug];
  }
}
