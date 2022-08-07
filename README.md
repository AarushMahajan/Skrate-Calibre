# Skrate-Calibre
<br>

This app is about authentication and authorisation of person to create, view, delete and update tickets based on his role["admin", "employee"]
<br>
Only admin can delete the ticket.
<br>
Registe user can see their tickets

<br>

● You are expected to create an API with a set of endpoints for a ticketing system
backend, as explained further.
<br>
● A User Registration Endpoint (/users/new), has to be a POST request, and accepts
“username” and “role” as Body Parameter and returns an Auth Token.
<br>
○ username - shall be unique
<br>
○ role - [admin, employee]
<br>
○ Auth Token - shall be required as Bearer Token for all other endpoints, otherwise
requests will return Unauthorised
<br>
● A Ticket Raise Endpoint (/tickets/new), has to be a POST request, and accepts “title”
and “description” as Body Parameter and returns an ID.
<br>
○ title - need not be unique
<br>
○ Ticket can only be raised when Auth Token passed is of Admin
<br>
○ schema of ticket:
{
id (auto-generated)(unique)
title: string
description: string
status: (initialised to 'open') (can be set to 'close')
priority: (can be set to ‘low’, ‘medium’ & ‘high’) (default: ‘low’)
assignedTo: any employee username
createdAt: (auto-generated) time
}
<br>
● A GET endpoint (/tickets/[param]) which can accept various params in url as query to
return specific ticket objects
<br>
○ /tickets/all will return all tickets
<br>
○ /tickets/?status=open/close returns tickets according to status
<br>
○ /tickets/?title= searches for the particular title
<br>
○ /tickets/?priority=low/medium/high returns ticket according to priority
<br>
● A Ticket closing endpoint (/tickets/markAsClosed), has to be a POST request, and
accepts ticketID as body param.

<br>
○ Auth Token of the user assigned to the ticket can only close the request or
the admin, any other token should return unauthorised.

<br>
○ Ticket cannot be closed if another higher priority ticket has been assigned
to the same user, returning error ‘A higher priority task remains to be closed’
and also returns all tasks of higher priority

<br>
● A Ticket deletion endpoint (/tickets/delete), has to be a POST request, and accepts
ticketID as body param. (Only Admin can delete tickets)

<br>


To install node module run npm i
<br>
To start the project run node server.js
<br>


Heroku deployment link :- https://skrate-calibre-backend-nodejs.herokuapp.com/
