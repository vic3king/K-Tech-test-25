import { IsString } from 'class-validator';

export interface Template {
  id: string;
  slug: string;
  title?: string;
  message: string;
}

export interface TemplateData {
  fullName?: string;
  catNames?: string[];
  totalPrice?: number;
  freeGift?: boolean;
}

export interface RenderedTemplate {
  title?: string;
  message: string;
}

export class CreateTemplateDto implements Partial<Template> {
  @IsString()
  id: string;

  @IsString()
  slug: string;

  @IsString()
  message: string;
}
