import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import { TemplateData } from './templates.dto';

@Injectable()
export class TemplateEngineService {
  constructor() {
    // Register custom helpers
    Handlebars.registerHelper('formatCats', (cats: string[]) => {
      if (!Array.isArray(cats)) return '';
      if (cats.length === 0) return '';
      if (cats.length === 1) return cats[0];
      if (cats.length === 2) return `${cats[0]} and ${cats[1]}`;
      return `${cats.slice(0, -1).join(', ')}, and ${cats[cats.length - 1]}`;
    });

    Handlebars.registerHelper('formatPrice', (price: number) => {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(price);
    });
  }

  private convertSyntax(template: string): string {
    return template
      .replace(/<cat-names>/g, '{{formatCats catNames}}')
      .replace(/<full-name>/g, '{{fullName}}')
      .replace(/<(\w+)>/g, '{{$1}}');
  }

  private compile(template: string, data: TemplateData): string {
    const handlebarTemplate = this.convertSyntax(template);
    const compiledTemplate = Handlebars.compile(handlebarTemplate);
    return compiledTemplate(data);
  }

  compileTemplate(
    template: { title?: string; message: string },
    data: TemplateData,
  ): { title?: string; message: string } {
    const result: { title?: string; message: string } = {
      message: this.compile(template.message, data),
    };

    if (template.title) {
      result.title = this.compile(template.title, data);
    }

    return result;
  }
}
