import { Publisher, Subjects, TicketUpdatedEvent } from '@allenzhanglib/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
