## Objective

Build a backend system that can support different features for an airline company. 
Our end-user is going to be someone who wants to book flights and query about flights so we need a robust system to give them the best experience possible.

## Requirements 

- User should be able to search for flights from one place to another.
    - Source and Destination 
    - Date of journey
    - Class of flight  [Not mandatory]
    - No. of seats to book
- Based on above we need to list down the flights based on Time and Price.
- Through Pagination, display the flights by displaying few first and then more.

- User should be able to book a flight if he is registered. 
- User should be able to cancel the flight booked.

- Tracking flight prices should be possible, the user should be notified about any price drops or any delays.

- User should be able to list their previous and upcoming flights.

- User should be able to download Boarding pass if they have done online check-in.

- Online check in mechanism should be supported
Notifications via email for completing online check-in before 3 hours of departure. 

- Notifications to users about any flight delay.

- Users should be able to review the flight journey if and only if they have booked a flight. 
    - Review mechanism should involve star rating along with a comment.
    - While listing any flight we should also display the review of the flight.

- User should be able to authenticate to our system using email and password.


## Non-Functional Requirements

- We can expect that more people will search for flights than book one.

- The system needs to be accurate.

- Expect that we will be having approx 1,00,000 total users, 5,00,000 bookings might come up in one quarter.

- So in one day we can expect 5000 bookings.

- System should be capable of scaling up to at least 3x the current estimated traffic.

- The system should handle real time updates to flight prices, before the user makes the final booking.

- Concurrency should be handled, using RDBMS should be the good solution.

- Traffic estimates - If we consider 30:1 as the search:booking ratio, then at max we expect 150000 search queries a day. 2 query/s