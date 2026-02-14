import AccordionItem from "./AccordionItem";
import '../styles/FAQ.css'

export default function FAQ() {
  return (
    <section>
      <h2>FAQ</h2>
      <AccordionItem
        question="How do I buy a ticket?"
        answer="You can browse events and purchase tickets directly through ClickPass."
      />
      <AccordionItem
        question="Can I refund my ticket?"
        answer="Refund policies depend on the event organizer."
      />
      <AccordionItem
        question="How do organizers create events?"
        answer="Organizers can create and manage events through the admin panel."
      />
    </section>
  );
}