import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import { TemplateData } from './templates.dto';
import { formatCats, formatPrice } from '@common/utility';

@Injectable()
export class TemplateEngineService {
  constructor() {
    // format cat names
    Handlebars.registerHelper('formatCats', formatCats);

    // format price
    Handlebars.registerHelper('formatPrice', formatPrice);
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
