import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function FAQAccordion({ faq }) {
  return (
    <Accordion type="single" collapsible>
      {faq?.map(({ question, answer }, id) => (
        <AccordionItem value={question} key={id}>
          <AccordionTrigger>{question}?</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
