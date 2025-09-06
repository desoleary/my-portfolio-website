export type ID = string & { readonly __brand: unique symbol };
export type ISODate = string & { readonly __brand: 'ISODate' };

export interface ProjectSummary {
  id: string;
  title: string;
  excerpt: string;
  updatedAt: ISODate;
}
