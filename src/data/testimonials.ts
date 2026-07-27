export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

// TODO: Replace with real client testimonials
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "TODO: Client Name",
    role: "CEO",
    company: "TODO: Company",
    quote:
      "TODO: Add real testimonial quote from client.",
  },
  {
    id: "t2",
    name: "TODO: Client Name",
    role: "Founder",
    company: "TODO: Company",
    quote:
      "TODO: Add real testimonial quote from client.",
  },
  {
    id: "t3",
    name: "TODO: Client Name",
    role: "Product Manager",
    company: "TODO: Company",
    quote:
      "TODO: Add real testimonial quote from client.",
  },
];
