const path = require('path');
const fs = require('fs');
const { ThemeConsumer } = require('react-bootstrap/esm/ThemeProvider');

class Ticket {
    constructor (number, desk) {
        this .number = number;
        this.desk = desk;
    }
}

class TicketControl {
    constructor () {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        this.init;
    }

    get toJson () {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4,
        }
    }

    init () {
        const { today, tickets, last, last4 } = require('../db/data.json');

        if (today === this.today) {
            this.tickets = tickets;
            this.last = last;
            this.last4 = last4;
        } else {
            this.saveDb();
        }
    }

    saveDb () {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson()));
    }

    next () {
        this.last += 1;
        const ticket = new Ticket(this.last,  null);
        this.tickets.push(ticket);

        this.saveDb();
        return 'Ticket' + ticket.number;
    }

    attendTicket (desk) {
        if (this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.desk = desk;

        this.last4.unshift(ticket);

        if (this.last4 > 4) {
            this.last4.splice(-1,1);
        }

        this.saveDb();

        return ticket;
    }
}

module.exports = TicketControl;