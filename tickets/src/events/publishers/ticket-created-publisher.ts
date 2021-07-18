import { Publisher, Subjects, TicketCreatedEvent } from '@allenzhanglib/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
