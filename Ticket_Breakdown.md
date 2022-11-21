# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Summary: 
There are 3 db tables 

1. Facilities
2. Shifts
3. Agents

`getShiftsByFacility` returning all Shifts worked that quarter, including some metadata about the Agent assigned to each(Shifts might have a foriegn key for Agents table).

### Ticket 1

SUBJECT: Create relationship table between facility and agent

DESCRIPTION:

Create database table `facility_agents` to store information regarding each agent within a facility. The table represents a many-to-many relationship between facilities and agents.

Basic structure of facility_agents table: 
1. `custom_agent_id` - primary key
2. `agent_id` - fkey(Agents table)
3. `facility_id` -- fkey(Facilities table) 
4. `custom_agent_name` - Custom agent name

Story points: 1

### Ticket 2

SUBJECT: Create API endpoints for acility_agents

DEPENDENCY: Ticket 1

DESCRIPTION:

Write a function(`generateCustomAgent`) that generates unique uuid for an agent, when they get assigned to a Shift. Store the uniquely generated uuid to CustomAgents table.

Execution steps: 
1. When an agent gets assigned to a shift, the facility controller should call a method `generateCustomAgent`.
2. After the execution of method `generateCustomAgent`, it should return a unique tag/key/id/name for a particular agent.
3. Store the above info in `CustomAgents` table for future reference.
4. Also store `custom_agent_id` in Shifts table for reading while generating a report.

And also implement API endpoints for these functionalities:

- For a given facility, query all agents that have at least one shift. The response should include internal agent ID, agent name (plus any relevant information), and `custom_agent_id` if available. The response should be paginated.
- For a given facility and agent, set the `custom_agent_id`.
- For a given facility and agent, remove the `custom_agent_id`.
- For a given facility, set/remove multiple `custom_agent_id` entries.

Implement unit tests for these API endpoints.

Story points: 2

### Ticket 3

SUBJECT: Generate Report

DEPENDENCY: Ticket 1

DESCRIPTION:

1. To generate report, use `custom_agent_id` that is stored in `Shifts` table from above ticket.
2. Get the actual internal db id for `Agents` table.
3. Once we fetch all shifts with proper agents, then we can generate reports for given quarter.

Story points: 1